---
title: "Using Poetry"
date: 2022-05-31T19:01:32+08:00
draft: false
description: ""
tags:
---

I thought poetry would disrupt my workflow because it will automatically create its own virtualenv
and I wouldn't be able to leverage `virtualfish` auto_activate feature.

It turns out that if the virtualenv is already activated, poetry will not attempt to create a new
virtualenv and will instead install it to the currently activated virtualenv
