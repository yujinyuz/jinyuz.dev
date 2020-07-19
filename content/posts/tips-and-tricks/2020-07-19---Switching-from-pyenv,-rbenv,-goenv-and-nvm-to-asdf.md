---
title: "Switching from pyenv, rbenv, goenv and nvm to asdf"
date: "2020-07-19 19:57:19"
template: "post"
draft: false
slug: "Switching-from-pyenv,-rbenv,-goenv-and-nvm-to-asdf"
category: "Tips and Tricks"
tags:
  - "config"
  - "dotfiles"
description: "Learn how to switch from different version manager to a more generic version manager"
---

So, there was a time when I was only developing applications using `Python`. And so I found out about virtual environments.
And then after a couple of months, I discovered `pyenv`.

It also came to a time I had to work on multiple projects that uses different versions of `nodejs` and searched something similar
so I installed `nvm`.

Then, I was required to work on a `Ruby` project so I installed `rbenv`.

And since `golang` was one of the new shiny objects that kinda got my interest, I went on and installed `goenv`.

Everything was fine until I kinda felt my `config.fish` file got bloated and somehow `nvm` was kinda slowing down my shell startup.

I did do some optimizations such as lazy loading `nvm` and used a `fish` plugin called [fish-nvm](https://github.com/FabioAntunes/fish-nvm).

And then one day, I found out about [asdf-vm](https://google.com).

At first, I was quite hesitant to install it since it would kinda disrupt my work flow with python projects since I heavily use `pyenv virtualenv <version> <name>`.

But I did feel that the benefits of using `asdf-vm` outweighs the cons so I went ahead and proceeded.

# Installation

```shell
$ git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.8
```

`asdf` has a pretty good documentation to be honest. Despite `brew` being my go to package manager, I chose `git` as my installation method.
My reason is that `asdf` requires me to add this line in my `config.fish`

```shell
source (brew --prefix asdf)/asdf.fish
```
and the `brew --prefix adsf` is just too slow compared to just having this

```shell
source $HOME/.asdf/asdf.fish
```

Next, for the auto completions just run this command in your terminal:

```shell
$ mkdir -p ~/.config/fish/completions; and cp ~/.asdf/completions/asdf.fish ~/.config/fish/completions
```

Restart your shell so that PATH changes take effect!

You can checkout a more detailed documentation here: https://asdf-vm.com/#/core-manage-asdf-vm?id=install


Before, my `config.fish` looked something like this:

```shell
# pyenv
set -gx PYENV_ROOT $HOME/.pyenv
set -gx PYTHON_BUILD_ARIA2_OPTS "-x 10 -k 1M" # Use aria2c when downloading
contains $PYENV_ROOT/bin $fish_user_paths; or set -Ua fish_user_paths $PYENV_ROOT/bin
status --is-interactive; and pyenv init - | source
status --is-interactive; and pyenv virtualenv-init - | source

# goenv
set -gx GOENV_GOPATH_PREFIX $HOME/.go
status --is-interactive; and goenv init - | source

# rbenv
status --is-interactive; and rbenv init - | source

# Set nvm aliases and add to path
set -gx nvm_alias_output $HOME/.node_aliases
contains $nvm_alias_output $fish_user_paths; or set -Ua fish_user_paths $nvm_alias_output
```

After

```shell
# pyenv (asdf still uses pyenv under the hood)
set -gx PYTHON_BUILD_ARIA2_OPTS "-x 10 -k 1M" # Use aria2c when downloading

# asdf
source $HOME/.asdf/asdf.fish
```

# Installing pyenv, rbenv, goenv, and nvm replacements

Again, most of the things I put here just came from the documentation: https://asdf-vm.com/#/core-manage-plugins?id=add

## pyenv replacement

```shell
$ asdf plugin add python
$ asdf install python latest:3 # At the moment of writing this, it installed 3.8.4
$ asdf global python 3.8.4 # This sets python 3.8.4 as our default python version
```

## rbenv replacement

```shell
$ asdf plugin add ruby
$ asdf install ruby latest # We can omit the version number. Currently installs 2.7.1
$ asdf global ruby 2.7.1
```

## goenv replacement

```shell
$ asdf plugin add golang
$ asdf install golang latest # 1.14.6
$ asdf global golang 1.14.6
```
## nvm replacement

```shell
$ asdf plugin add nodejs
$ asdf install nodejs 12.18.2
$ asdf global nodejs 12.18.2
```

Using `asdf global` creates a file under your HOME directory called `.tool-versions`

```shell
$ cat ~/.tool-versions
python 3.8.4
ruby 2.7.1
golang 1.14.6
nodejs 12.18.2
```

This lets `asdf` know which versions to use. And of course, in contrast to `global`,
there is also the `local` keyword that creates another `.tool-versions`.
This is useful when projects require different version.

```shell
$ cd ~/project1
$ asdf local python 3.7.5
$ python --version # Uses the python version specified in .tool-versions
3.7.5
$ cd ~/project2
$ python --version # Uses the python version specified in ~/.tool-versions
3.8.4
```

`asdf` has a lot of plugins available. You can check them out here: https://github.com/asdf-vm/asdf-plugins

# Extras

In order to accommodate my work flow when I was still using `pyenv virtualenv`,
I created a function that behaves quite similar to `pyenv virtualenv`.

```shell
$ touch ~/.config/fish/functions/venv.fish
```

And paste the following:

```shell
function venv --argument-names 'python_version' --description 'Create virtualenv named the same as current directory'
  set -l python_bin

  if not test -n "$python_version"
    # Use default python version set by asdf
    set python_bin ($HOME/.asdf/bin/asdf which python)
  else
    set python_bin $ASDF_DIR/installs/python/$python_version/bin/python
  end

  set -l venv_name (basename $PWD | tr . -)

  echo
  if not test -e $python_bin
    echo "Python version `$python_version` is not installed."
    return 1
  end

  echo Creating virtualenv `$venv_name`
  $python_bin -m venv $HOME/.virtualenvs/$venv_name
  source $HOME/.virtualenvs/$venv_name/bin/activate.fish
end

```


Whenever I'm inside a python project, I just need to type `venv` or `venv <python_version>`
and it will automatically create a virtualenv under `~/.virtualenvs` using the current directory name.

In order to automatically activate the virtualenv when `cd`ing to a project, do the following:

```shell
$ touch ~/.config/fish/conf.d/__auto_venv.fish
```

And paste the following:

```shell
function __auto_venv --on-variable PWD --description "Automatically activate python venv"
  set -l venv_name (basename $PWD | tr . -)

  if test -d $HOME/.virtualenvs/$venv_name
    source $HOME/.virtualenvs/$venv_name/bin/activate.fish
  end
end
```

Cool! Not only did I reduce the lines in my `config.fish`, I could also notice a decreased startup time which is a good thing!

You can also check out my dotfiles in my GitHub repository: https://github.com/yujinyuz/dotfiles

I hope this article helped you! You can leave a comment below and I'll try to answer them as fast as I can.

Thanks for reading! 🎉
