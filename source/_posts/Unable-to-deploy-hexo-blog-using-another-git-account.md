---
title: Unable to deploy hexo blog using another git account
date: 2023-04-16 20:51:54
tags: [Git, deploy, GitHub, ssh]
categories: [Hexo, Error]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202304162144155.png
warning: true
---

I've ran into a problem recently while deploying my HEXO blog to GitHub.

<!--more-->

## Problem Description

First, I have two GitHub account, and I want to push one blog folder to one account and another folder to another account.

But somehow, I can't deploy it because it use my number 1 account for number two folder. 

I've already add ssh-key to the second GitHub account.

### Tried methods

- change the local git account

  ```bash
  git config --local user.name "hexo-theme-last"
  git config --local user.email "xxx@xxx.com"
  ```

- change the global git account

  ```bash
  git config --global user.name "hexo-theme-last"
  git config --global user.email "xxx@xxx.com"
  ```

- Set the email and user in `_config.yml` file in blog root directory.

  ```yml
  deploy:
    type: git
    repo: git@github.com:hexo-theme-last/hexo-theme-last.github.io.git
    branch: master
    name: hexo-theme-last
    email: 2061026079@qq.com
  ```

- deploy with pamaraters

  ```bash
  hexo d -u hexo-theme-last -e xxx@xx.com
  ```

The weird things is that no matter how I change, it will still use my first account to deploy.

And then I test the ssh connection, create a `config` file in `.ssh` directory

```
Host github2
HostName github.com
User git
IdentityFile /home/o_oyao/.ssh/id_rsa_last

Host o_oyao
HostName github.com
User git
IdentityFile /home/o_oyao/.ssh/id_rsa
```

And then I run this command, it works well.

```bash
$ ssh -T github2
Hi hexo-theme-last! You've successfully authenticated, but GitHub does not provide shell access.
```

But if I run this, it will use the first account ssh as default.

```bash
$ ssh -T git@github.com
Hi DyingDown! You've successfully authenticated, but GitHub does not provide shell access.
```

## Solution

Because I want to test whether is only hexo using old account or git using old account, I pushed the original code to the second GitHub account(hexo-theme-last).

Then I realize it need a `personal access token`

Finally, I solve this problem by using `personal access token` in hexo `_config.yml` file.

```yaml
deploy:
  type: git
  repo: https://my-personal-access-token/github.com/hexo-theme-last/hexo-theme-last.github.io.git
  branch: master
  name: hexo-theme-last
  email: xxx@xx.com
```