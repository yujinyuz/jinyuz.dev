---
title: "Using Case..When in Django"
date: "2020-12-20 21:01:25"
category: "tips-and-tricks"
tags:
  - "database"
  - "django"
  - "python"
aliases:
  - "/posts/tips-and-tricks/Using-Case..When-in-Django"
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

{{< gist yujinyuz d257d3ce978deb0bc7a1fecbd3f8d101 >}}


The code could still be improved but it did the job for me.
