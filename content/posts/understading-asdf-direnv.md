---
title: "Understading Asdf Direnv"
date: 2022-06-05T20:29:52+08:00
draft: false
description: ""
tags:
  - ""
categories:
  - ""
---


## TL;DR

Because I'm using tmux, shell gets ran every time.

config.fish is loaded first

asdf-direnv loads the .envrc

.envrc contains `use asdf` and then executes it

$PATH is updated because of `use asdf`

The problem is that if I activate a python virtualenv, it gets added to the $PATH

```console

# virtualfish auto_activation enabled
virtualenv/path/to/python
asdf/direnv/loaded/bins/golang
asdf/direnv/loaded/bins/python
```

If I open a split pane via tmux, the $PATH will look like

```console
# virtualfish auto_activation enabled
asdf/direnv/loaded/bins/golang
asdf/direnv/loaded/bins/python
virtualenv/path/to/python
```

virtualenv path gets placed at the bottom


Fix is to add this to `~/.config/direnv/direnvrc`

```bash
add_venv_to_path() {
    if [[ ! -z "${TMUX}" && ! -z "${VIRTUAL_ENV}" ]]; then
        PATH_add "$VIRTUAL_ENV"/bin
    fi
}
```

and then inside your `~/.envrc`

```
use asdf
add_venv_to_path
```


This has caused me a lot of headache and I probably wouldn't be able to get back the lost time I
spent figuring out how to fix this.


References
- https://github.com/direnv/direnv/wiki/Tmux
- https://github.com/direnv/direnv/wiki/Restrict-the-effects-of-direnv-load
- https://github.com/direnv/direnv/issues/106
- https://www.mackorone.com/2020/02/23/tmux-and-venv.html
- https://github.com/direnv/direnv/issues/145
- https://github.com/direnv/direnv/issues/213
- https://github.com/direnv/direnv/issues/383
- https://github.com/direnv/direnv/issues/777
- https://github.com/direnv/direnv/issues/614
