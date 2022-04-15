---
title: "Using Find and Executing a Command"
date: "2020-11-16 21:43:29"
draft: false
tags:
  - "bash"
  - "shell"
  - "django"
aliases:
  - "/posts/snippets/Using-find-and-execute-a-command"
---

I mostly work on django projects and as a dev who likes shortcuts,
I wanted to have an alias of `pm` for `python manage.py`.

I could've just added

```shell
alias pm="python manage.py"
```

inside of my config but I was working on different projects where `manage.py` was located in different folders.
Typical projects have it located under root while some projects have it under `src/manage.py`.

What I needed was a way to find where the `manage.py` was located and use that so I can do

```shell
$ pm runserver # OR
$ pm shell # OR
$ pm <command>
```

Here's my first attempt:

```shell
$ find . -type f -name "manage.py" -exec python {} \; -quit
```

What this does is `find` under the current directory `.` a type of file `-type f` with a name of `manage.py` `-name "manage.py"`.
And then, for the file you found execute a command `-exec` The `{}` is the current file name returned by `find` command.

In our case it's gonna be:

```shell
$ python ./src/manage.py
```

The `-quit` is optional in most cases of using the `find exec` command since it it exits immediately after the first match.

But there's a problem with that approach. If we just do:

```shell
$ alias pm="find . -type f -name "manage.py" -exec python {} \; -quit"
$ pm runserver
```

We get:

```shell
$ find: runserver: unknown primary or operator
```

In order to fix that, we have to wrap it inside a function so that it could take arguments:

```shell
$ alias pm='f(){ find . -type f -name "manage.py" -exec python {} "$@" \; -quit; unset -f f; }; f'
```

The `$@` stands for all other arguments you passed. You can add that inside of your `.bashrc` or `.zshrc`.

If you are using `fish` like me, I have this file inside my `~/.config/fish/functions/pm.fish`

```shell
function pm --description "Find and execute manage.py"
    command find . -type f -name "manage.py" -exec python {} $argv \; -quit
end
```

Now it works fine!

```shell
$ pm runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (2 silenced).
November 16, 2020 - 06:16:50
Django version 2.2.17, using settings 'myproject.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
