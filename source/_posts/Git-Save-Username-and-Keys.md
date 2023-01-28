---
title: Git Save Username and Keys
date: 2020-08-07 14:57:57
tags: Usage
categories: Git
postImage: https://s1.ax1x.com/2020/08/07/ahx1ln.jpg
---

Every time I use git to commit to my repository, I need to type my username and keys. So how can I get rid of it?

<!--more-->

First, type these: 

```bash
git config --global user.email "your git email"
git config --global user.user "your git username"
```

Then type these:

```bash
git config --global credential.helper store
```

store means save the keys and username forever until you manually delete them.

If you want it to save just for a certain time, you can type:

```bash
git config --global credential.helper cache
```

cache means 15mins.

```bash
git config credential.helper 'cache --timeout=3600'
```

This means 2 hours.