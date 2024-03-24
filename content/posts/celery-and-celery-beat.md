---
title: "Celery and Celery Beat"
date: 2022-07-13T09:26:02+08:00
draft: false
description: ""
tags:
  - "python"
---

# TL;DR

Run both with one command in development. Not recommended for production


`DJANGO_SETTINGS_MODULE=project.settings celery -A arkis worker -l info --beat`

