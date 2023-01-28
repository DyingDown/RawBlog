---
title: >-
  Hexo Node.js 14 Accessing non-existent property of module exports inside
  circular dependency解决
date: 2021-11-25 16:15:07
tags: [Hexo, error, Node.js]
categories: Blog
postImage: https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post202111260033678.png
---

## 问题

```
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
(node:11276) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11276) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:11276) Warning: Accessing non-existent property 'filename' of module exports inside circular dependency
(node:11276) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(node:11276) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:11276) Warning: Accessing non-existent property 'filename' of module exports inside circular dependency
```

## 解决

问题由于stylus导致，所以修改stylus的版本

在`package.json`文件中添加这个

```json
"resolutions": {
    "stylus": "^0.54.8"
  },
```

然后执行`npm install` 或者`yarn install`

此操作相当于指定了stylus的版本。