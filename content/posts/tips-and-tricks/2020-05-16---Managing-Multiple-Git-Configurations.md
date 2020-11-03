---
title: "Managing Multiple Git Configurations"
date: "2020-05-16 21:30:40"
template: "post"
draft: false
slug: "Managing-Multiple-Git-Configurations"
category: "Tips and Tricks"
tags:
  - "git"
  - "config"
  - "dotfiles"
description: "Learn how to manage multiple git configurations"
---

Suppose that you have a full time job at Amazon, and you want to separate
your git commit emails from Amazon and your personal projects.

Setting up `~/.gitconfig`

```shell
$ touch ~/.gitconfig
```

For our personal projects, we will use the `~/.gitconfig` file with the following
content:

```shell
[user]
  name = James Banned
  email = james.banned@gmail.com
[includeIf "gitdir:~/Work/"]
  path = ~/.gitconfig.work
```

The `includeIf` basically means that include this config if I'm inside
the `~/Work/` directory.


Now, let's create the `~/.gitconfig.work` so `git` would read that config every
time we are working on our work related projects

```shell
$ touch ~/.gitconfig.work
```

Copy the following to the newly created file:
```shell
[user]
  email = james.banned@amazon.com
```

Now, this will use `james.banned@amazon.com` email when doing a

```shell
$ pwd
/Users/me/Work/amazon
$ git commit -m "Update README.md"
[master 5213482] Update README.md
 1 file changed, 2 insertions(+)
```

Result:

```shell

$ git log

commit 52134828eab8b1dbb79ff5987aca2cdc373222e8 (HEAD -> master, origin/master)
Author: James Banned <james.banned@amazon.com>
Date:   Sat May 16 19:34:43 2020 +0800

    Update README.md
```

Also, take note, we didn't specify the `name` key here since `git` will use the values
specified in `~/.gitconfig` which, in this case, is `James Banned`.

Of course, we can add other configurations aside from `email` such as `signingkey`,
custom aliases, and anything you valid that you can put inside a git config file.
