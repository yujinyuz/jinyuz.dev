---
title: "Django: Display raw SQL of a queryset"
date: "2020-05-18 17:16:17"
draft: false
tags:
  - "django"
  - "python"
aliases:
  - "/posts/snippets/Django:-Display-raw-SQL-of-a-queryset"
---

Often, I forget how to display the raw SQL of a queryset in Django.
This is a quick and easy example of how to do it

```python
from django.contrib.auth.models import User

qs = User.objects.all()
print(qs.query)
SELECT "auth_user"."id", "auth_user"."password", "auth_user"."last_login", "auth_user"."is_superuser", "auth_user"."username", "auth_user"."first_name", "auth_user"."last_name", "auth_user"."email", "auth_user"."is_staff", "auth_user"."is_active", "auth_user"."date_joined" FROM "auth_user"

```

