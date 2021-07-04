---
title: "Make your django project newbie contributor friendly with pre-commit"
date: "2021-07-04 22:53:17"
template: "post"
draft: false
slug: "Make-your-django-project-newbie-contributor-friendly-with-pre-commit"
category: "tips-and-tricks"
tags:
  - "django"
  - "python"
description: "Learn how to setup and integrate pre-commit in your Django project"
---

It's really worth investing time configuring your project and make it easy for other developers to contribute.

One way of enabling this is a clean, organized, and well-formatted code.

This is really helpful especially for first time developers or contributors as it makes pull request reviews less painful (e.g. trailing white space, unorganized imports, debug statements)

We can easily prevent this by using a tool called `pre-commit`. Let's get started!


## Installation

### Installing pre-commit

Just pick one installation method

* Install using their official installer if you're on any unix based distribution [website](https://pre-commit.com/#install)

  ```
  $ curl https://pre-commit.com/install-local.py | python -
  ```

* Install with `pip` OR just add `pre-commit` to your `requirements.txt` or `requirements-dev.txt`.

  ```
  $ pip install pre-commit
  ```


### Installing Django (optional)

*If you already have an existing repository, you can skip this step.*

This isn't gonna be a Django tutorial so we'll just do the bare minimum setup

```bash
$ mkdir mysite
$ python -m venv venv # Create a virtualenv called `venv`
$ source venv/bin/activate
$ pip install Django
$ django-admin startproject .
```

Let's initialize it as a git repository since `pre-commit` only works with git repositories.

```bash
$ git init .
$ echo "venv" >> .gitignore
$ git add .
$ git commit -m "Initial setup"
```


## Configuring pre-commit

Now, on your root directory, let's create file called `.pre-commit-config.yaml`. `pre-commit` looks for this file so it knows what kind of `hooks` to run when we are committing.

```bash
$ touch .pre-commit-config.yaml
```

Copy and paste this inside the newly created file

```yaml
repos:
  - repo: 'https://github.com/pre-commit/pre-commit-hooks'
    rev: v3.4.0
    hooks:
      - id: trailing-whitespace
      - id: check-yaml
      - id: check-merge-conflict
      - id: debug-statements
      - id: check-added-large-files
      - id: requirements-txt-fixer
  - repo: local
    hooks:
      - id: django-check
        name: Check django project for potential problems
        entry: sh -c 'python manage.py check'
        types:
          - python
        pass_filenames: false
        language: system
      - id: django-check-migrations
        name: Check django project for missing migrations.
        entry: sh -c 'python manage.py makemigrations --check --dry-run'
        files: models.py
        types:
          - python
        pass_filenames: false
        language: system
  - repo: 'https://gitlab.com/pycqa/flake8'
    rev: 3.9.0
    hooks:
      - id: flake8
  - repo: 'https://github.com/pycqa/isort'
    rev: 5.8.0
    hooks:
      - id: isort
  - repo: 'https://github.com/python/black'
    rev: 20.8b1
    hooks:
      - id: black
  ```

It might look overwhelming but you just need to focus on 2 things here: the `repo` and `hooks`.
If you read it carefully, the hooks are kinda self-explanatory. These hooks gets run in order every time you commit. Let's see it in action.

Let's install the hooks and add `.pre-commit-config.yaml` to git:

```
$ pre-commit install
pre-commit installed at .git/hooks/pre-commit
$ git add .pre-commit-config.yaml
$ git commit -m "Add pre-commit config"
[INFO] Initializing environment for https://github.com/pre-commit/pre-commit-hooks.
[INFO] Initializing environment for https://gitlab.com/pycqa/flake8.
[INFO] Initializing environment for https://github.com/pycqa/isort.
[INFO] Initializing environment for https://github.com/python/black.
[INFO] Installing environment for https://github.com/pre-commit/pre-commit-hooks.
[INFO] Once installed this environment will be reused.
[INFO] This may take a few minutes...
[INFO] Installing environment for https://gitlab.com/pycqa/flake8.
[INFO] Once installed this environment will be reused.
[INFO] This may take a few minutes...
[INFO] Installing environment for https://github.com/pycqa/isort.
[INFO] Once installed this environment will be reused.
[INFO] This may take a few minutes...
[INFO] Installing environment for https://github.com/python/black.
[INFO] Once installed this environment will be reused.
[INFO] This may take a few minutes...
Trim Trailing Whitespace.................................................Passed
Check Yaml...............................................................Passed
Check for merge conflicts................................................Passed
Debug Statements (Python)............................(no files to check)Skipped
Check for added large files..............................................Passed
Fix requirements.txt.................................(no files to check)Skipped
Check django project for potential problems..........(no files to check)Skipped
Check django project for missing migrations..........(no files to check)Skipped
flake8...............................................(no files to check)Skipped
isort................................................(no files to check)Skipped
black................................................(no files to check)Skipped
```

Notice that `pre-commit` says `no files to check`. It only checks for files included in our commit and skips the `hooks` that aren't applicable.

You might be asking, what if we just wanted to run `pre-commit` without actually committing. Well, that's actually possible especially for existing repositories. We can run `pre-commit` against all files by passing the `--all-files` argument

```
$ pre-commit run --all-files
Trim Trailing Whitespace.................................................Passed
Check Yaml...........................................(no files to check)Skipped
Check for merge conflicts................................................Passed
Debug Statements (Python)................................................Passed
Check for added large files..............................................Passed
Fix requirements.txt.................................(no files to check)Skipped
Check django project for potential problems..............................Passed
Check django project for missing migrations..........(no files to check)Skipped
flake8...................................................................Passed
isort....................................................................Passed
black....................................................................Failed
- hook id: black
- files were modified by this hook

reformatted /Users/trafalgar/Sources/github.com/yujinyuz/mysite/mysite/asgi.py
reformatted /Users/trafalgar/Sources/github.com/yujinyuz/mysite/manage.py
reformatted /Users/trafalgar/Sources/github.com/yujinyuz/mysite/mysite/urls.py
reformatted /Users/trafalgar/Sources/github.com/yujinyuz/mysite/mysite/wsgi.py
reformatted /Users/trafalgar/Sources/github.com/yujinyuz/mysite/mysite/settings.py
All done! ✨ 🍰 ✨
5 files reformatted, 1 file left unchanged.
```

If you notice, our `black` formatter has failed. This is because it performed changes to our files. And if you run the previous command again, everything should now pass

```
$ pre-commit run --all-files
Trim Trailing Whitespace.................................................Passed
Check Yaml...........................................(no files to check)Skipped
Check for merge conflicts................................................Passed
Debug Statements (Python)................................................Passed
Check for added large files..............................................Passed
Fix requirements.txt.................................(no files to check)Skipped
Check django project for potential problems..............................Passed
Check django project for missing migrations..........(no files to check)Skipped
flake8...................................................................Passed
isort....................................................................Passed
black....................................................................Passed
```

Aaaaand that's it! You can now add the files and commit them to have a better and cleaner repository.

```
$ git add .
$ git commit -m "Lint files"
Trim Trailing Whitespace.................................................Passed
Check Yaml...........................................(no files to check)Skipped
Check for merge conflicts................................................Passed
Debug Statements (Python)................................................Passed
Check for added large files..............................................Passed
Fix requirements.txt.................................(no files to check)Skipped
Check django project for potential problems..............................Passed
Check django project for missing migrations..........(no files to check)Skipped
flake8...................................................................Passed
isort....................................................................Passed
black....................................................................Passed
[main 725df70] Lint files
 5 files changed, 41 insertions(+), 41 deletions(-)
```


## Configuring your formatters (isort, flake8, and black)

It's always common to have an agreed set of rules when working with a team. Since our `pre-commit` config is using isort, flake8, and black, we might want to add configurations to them such as maximum line length, import ordering, etc.

Let's create a file called `setup.cfg`. This gets picked up by our formatters and uses the settings when formatting our code:

```bash
$ touch setup.cfg
```

And paste the following:

```
[flake8]
ignore = W503,E501,E226,E702,E731
max-line-length = 88
exclude = migrations

[isort]
profile = black
multi_line_output = 3
force_grid_wrap = 0
use_parentheses = True
ensure_newline_before_comments = True
line_length = 88
known_django = django
sections = FUTURE,STDLIB,DJANGO,THIRDPARTY,FIRSTPARTY,LOCALFOLDER
skip = wsgi.py,setup.py
```

This is the config that I use. You can change it to whatever floats your boat.

## Conclusion

pre-commit has been a great tool and helped me reduce time reviewing and nitpicking unformatted code and focus on the important things.

Hope you find this helpful. Have a great day!
