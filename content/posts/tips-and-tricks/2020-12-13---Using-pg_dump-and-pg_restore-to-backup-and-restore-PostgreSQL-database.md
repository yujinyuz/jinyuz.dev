---
title: "Using pg_dump and pg_restore to backup and restore PostgreSQL database"
date: "2020-12-13 21:47:26"
template: "post"
draft: false
slug: "Using-pg_dump-and-pg_restore-to-backup-and-restore-PostgreSQL-database"
category: "tips and tricks"
tags:
  - "shell"
  - "postgresql"
  - "database"
description: "Learn how to backup and restore your PostgreSQL database in a better way"
---

So, I was trying to reproduce some issues and bugs that only happened in production.
I needed an exact copy of the production database and run it locally.

Here's how I did it using `pg_dump` and `pg_restore`.

```shell
$ pg_dump -U postgres -Fc -Z 9 -j 8 production.dump -d postgres

```

Here's the breakdown for the arguments:

- `U` means username. It's used to connect to your postgres database. In this case, my username is `postgres`.
- `F` means format. It's usually combined with `c` that means **c**ustom
- `Z` means compress. It can have values from 0 to 9. 0 being no compression and 9 being the maximum compression.
      It's supposed to make the dump file smaller. I used 9 here because I know that my database doesn't contain much data and I want its size to be small as possible.
      You might be asking why not use 9 all the time? The answer to that is it takes a while to restore compressed dumps. So if you want to restore it faster, use a lower value.
- `j` means jobs. It's the number of jobs that we want to run. You can think of it as how many persons are going to dump your databse. More jobs means faster dump.
- `d` means database. It's the name of the database you want to dump. The name of the database I also want to dump is `postgres`.


After that, I copied it from my remote ssh machine to my local machine

```shell
$ scp yujinyuz@myremotesite:/usr/share/nginx/repo/production.dump ~/Downloads/
```

And then restored it locally:
```shell
$ pg_restore -U postgres -Fc -j 8 production.dump -d postgres -c
```

Notice that most of the arguments are almost the same except for the new `-c`.

- `c` means clean. It will drop database objects before creating them. So, if I have existing tables in my local, it would just drop them and recreate it so I would have the exact copy of my production database.


That's it! Hope that also helps you, too!
