---
title: "Installing Psycopg2 in Macos"
date: 2022-07-29T08:45:15+08:00
draft: false
description: ""
tags:
  - ""
categories:
  - ""
---


## TL;DR

```console
env LDFLAGS="-I/usr/local/opt/openssl/include -L/usr/local/opt/openssl/lib" pip install psycopg2

# OR

env LDFLAGS="-I/usr/local/opt/openssl@3/include -L/usr/local/opt/openssl@3/lib" pip install psycopg2

# OR

# https://github.com/brianmario/mysql2/issues/795#issuecomment-337006164
env LIBRARY_PATH="/usr/local/opt/openssl@3/lib" pip install psycopg2 --no-cache
```


Source: https://stackoverflow.com/questions/26288042/error-installing-psycopg2-library-not-found-for-lssl/39244687#39244687

## Not long


The reason is that probably it might work faster in my machine if it was installed using the not
binary version
