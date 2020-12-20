---
title: "Using Case..When in Django"
date: "2020-12-20 21:01:25"
template: "post"
draft: false
slug: "Using-Case..When-in-Django"
category: "tips-and-tricks"
tags:
  - "database"
  - "django"
  - "python"
description: "Learn how I used Case..When in Django"
---

I was working on a multi-tenant project and encountered a bug when using Django's `GenericForeignKey` with `django-tenants`.
It was using the public schema's `contenttype_id` instead of the tenant schema's `contenttype_id`.

So, if I have a model of `Comment`, my `django_content_type` table would have something like

`public.django_content_type`

| id      | app_label    | model   |
| ------- | ------------ | ------- |
|     15  |     comments | comment |

`tenant.django_content_type`

| id      | app_label    | model   |
| ------- | ------------ | ------- |
|     19  |     comments | comment |

There shouldn't be a problem here since `django-tenants` should handle this because it chooses the `id` of the tenant
first and then only use the `public` as a fall back value. But for some reason, it was sometimes using the public id
so comments aren't appearing at all!

In order to fix this, I opted to remove `django_content_type` table from all of my tenants and should only use the
public's `django_content_type` values.

What I had to do was to update the contents inside my models that were using `GenericForeignKey`s, which in my case is the `comments` table.

Here's the model:

```python
# comments/models.py

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)
    path = models.CharField(max_length=350)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    flagged = models.BooleanField(default=False)

    target_content_type = models.ForeignKey(ContentType, null=True, blank=True, on_delete=models.SET_NULL)
    target_object_id = models.PositiveIntegerField(null=True, blank=True)
    target_object = GenericForeignKey("target_content_type", "target_object_id")
```

I need to update the `target_content_type` so that it uses the public id which is `15` instead of `19`.

What I needed to do was:

1. Determine which target ids need to be updated. For example, a `comment` can be in an `Announcement` or in a `Post`.
   So, we'd have to determine the `content_type_id` for `Announcement` and `Post` in the tenant's schema and update its value so it uses the one in public.
2. Update the values using `Case..When`.
3. Drop the `tenant.django_content_type` table so it would always use `public.django_content_type`.

For number 1, I had to do a `GROUP BY` to determine which id's I need to update then get its equivalent in the public schema.

For number 2, I had to use the `Case..When` syntax. So, for example `when` the `target_content_type_id` is `19`, `then` update its value to `15`.
`when` the `target_content_type_id` is `20`, `then` update its value to `12`.

I think I need not explain number 3 since it only `drops` the table.

I created a management command for this so it can be easily executed in production. Here's the code:

```python
from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand
from django.db import connection
from django.db.models import Case, F, Value, When

from django_tenants.utils import schema_context

from tenant.models import Tenant


def group_by_sql(schema, table, column):
    sql = f"""
        SELECT {column} FROM {schema}.{table}
        GROUP BY {column}
    """
    print(sql)
    return sql


class Command(BaseCommand):

    help = "One time management command execution to update tenant's content_type_ids"

    def handle(self, *args, **options):

        has_gfk_models = [
            {
                'app_label': 'comments',
                'model': 'comment',
                'col': 'target_content_type_id'
            },
            {
                'app_label': 'notifications',
                'model': 'notification',
                'col': 'target_content_type_id'
            },
            {
                'app_label': 'notifications',
                'model': 'notification',
                'col': 'action_content_type_id',
            },
            {
                'app_label': 'prerequisites',
                'model': 'prereq',
                'col': 'parent_content_type_id',
            },
        ]

        for tenant in Tenant.objects.exclude(schema_name='public'):
            for has_gfk_model in has_gfk_models:
                app_label, model, col = has_gfk_model.values()

                # Number 1
                with connection.cursor() as cursor:
                    cursor.execute(group_by_sql(
                        schema=tenant.schema_name,
                        table=f"{app_label}_{model}",
                        column=col))

                    # Remove null ids
                    tenant_target_content_type_ids = [_id[0] for _id in cursor.fetchall() if _id[0]]
                    # print(tenant_target_content_type_ids)

                    # tenant content_type_id : public content_type_id
                    ct_ids_map = {}
                    for ct_id in tenant_target_content_type_ids:
                        # Get what kind of model the given ID is
                        with schema_context(tenant.schema_name):
                            ct_tenant_app = ContentType.objects.get(id=ct_id)
                        # ... then fetch its equivalent in the public tenant
                        try:
                            ct_public = ContentType.objects.get(app_label=ct_tenant_app.app_label, model=ct_tenant_app.model)
                            ct_ids_map[ct_id] = ct_public.id
                        except ContentType.DoesNotExist:
                            # Just skip the apps that aren't installed anymore
                            print(f'{ct_tenant_app} has been removed from settings.APPS')
                            continue

                    # Number 2
                    Model = apps.get_model(app_label, model)
                    with schema_context(tenant.schema_name):
                        # Using CASE..WHEN is much faster compared to bulk_update in this case
                        # https://docs.djangoproject.com/en/dev/ref/models/conditional-expressions/#conditional-update
                        whens = []

                        for tenant_ct_id, public_ct_id in ct_ids_map.items():
                            # Build query
                            # when target_content_type_id is 19 then update it to 15
                            # When(target_content_type_id={tenant_ct_id}, then=Value({public_ct_id}))
                            when = {
                                col: tenant_ct_id,
                                'then': Value(public_ct_id),
                            }
                            whens.append(When(**when))

                        # If we are currently updating comments, the query would look something like
                        # Comment.objects.update(
                        #   target_content_type_id=Case(
                        #       When(target_content_type_id=17, then=Value(25)),
                        #       When(...),
                        #       default=F(target_content_type_id)))
                        # )
                        case_when = {
                            # When statements should be wrapped in a `Case` so we need to unpack the list `*whens`
                            col: Case(*whens, default=F(col)),
                        }

                        # Filter out the queryset so we don't bother updating other target ids
                        # The `default` is useless in this case because we are only updating the ids that are needed
                        # so it's safe to remove the `default=F(col)`.
                        qs = Model.objects.filter(**{f'{col}__in': ct_ids_map.keys()})
                        qs.update(**case_when)
                        print(connection.queries)

            # Drop the table so it only uses public.django_content_type
            drop_contenttype_table = f"DROP TABLE IF EXISTS {tenant.schema_name}.django_content_type CASCADE"
            with connection.cursor() as cursor:
                cursor.execute(drop_contenttype_table)
```

The code above could still be improved but it did the job for me.
Also, here's a link to a GitHub gist: https://gist.github.com/yujinyuz/d257d3ce978deb0bc7a1fecbd3f8d101
