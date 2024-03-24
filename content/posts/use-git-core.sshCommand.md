---
title: "Using git core.sshCommand"
date: 2022-05-29T20:30:45+08:00
draft: false
description: ""
tags:
  - ""
---

I think it's overall better than my previous post for managing multiple git users since we are just
creating a new .gitconfig file

It turns out, I need to add `ssh -i identity_file_ed5 -F /dev/null` so it won't load the default
~/.ssh/config file
