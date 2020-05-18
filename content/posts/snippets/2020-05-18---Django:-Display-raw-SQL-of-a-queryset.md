---
title: "Django: Display raw SQL of a queryset"
date: "2020-05-18 17:16:17"
template: "post"
draft: false
slug: "Django:-Display-raw-SQL-of-a-queryset"
category: "snippets"
tags:
  - "django"
  - "python"
description: "A snippet of how to display the raw SQL of a queryset"
---

Often, I forget how to display the raw SQL of a queryset in Django.
This is a quick and easy example of how to do it

```python
from django.contrib.auth.models import User

qs = User.objects.all()
print(qs.query)
```
