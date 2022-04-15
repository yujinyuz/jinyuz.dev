---
title: "How to Checkout to a Github Pull Request"
date: "2020-11-29 20:58:44"
tags:
  - "git"
  - "github"
  - "testing"
aliases:
  - "/posts/tips-and-tricks/How-to-checkout-to-a-pull-request-in-GitHub"
---

There was a pull request on GitHub and it contains a feature I wanted to test.
I didn't know how to test it locally. Should I just copy the changes to my local
since the changes weren't that big? But what if it was?

Luckily, I found some answers by googling and decided to write it up for future reference.

Git provides a command for it and here is the sample syntax

```shell
$ git fetch <remote> pull/:id/head:<branch>
```

Here is an example demo:

```shell
$ git remote -v
origin  git@github.com:yujinyuz/somerepository.git (fetch)
origin  git@github.com:yujinyuz/somerepository.git (push)
upstream        git@github.com:someuser/somerepository.git (fetch)
upstream        git@github.com:someuser/somerepository.git (push)

$ git fetch upstream pull/123/head:testing-pr
remote: Enumerating objects: 15, done.
remote: Counting objects: 100% (15/15), done.
remote: Total 17 (delta 15), reused 15 (delta 15), pack-reused 2
Unpacking objects: 100% (17/17), 1.78 KiB | 58.00 KiB/s, done.
From github.com:someuser/somerepository
 * [new ref]         refs/pull/123/head -> testing-pr

$ git checkout testing-pr
```

- The value I used for `<remote>` is `upstream` because that's where the pull request resides
- It will create a branch named `testing-pr` locally so this doesn't have to be the exact name of the author's branch.

And you can now test the pull request locally. That's it and I hope it helps!

