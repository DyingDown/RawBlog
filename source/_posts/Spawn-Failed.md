---
title: Spawn Failed
date: 2020-01-19 08:37:35
tags: error
categories: Blog
---

Recently, I've met a problem like this when I deploying my blog. hexo d gets error.

<!--more-->

```
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
Error: Spawn failed
    at ChildProcess.<anonymous> (D:\Study\Blog\node_modules\hexo-util\lib\spawn.js:52:19)
    at ChildProcess.emit (events.js:198:13)
    at ChildProcess.cp.emit (D:\Study\Blog\node_modules\cross-spawn\lib\enoent.js:40:29)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:248:12)
```

When this occurs, usually you just need to deploy it again in good internet condition. This is just your internet doesn't work well, at least for me always.