---
title: Hexo To-Do List unable to render properly
date: 2023-12-16 20:48:34
tags: [Hexo Plugin, Error, To-Do List, Render]
categories: [Hexo, Blog]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202401022146031.jpg
warning: true
isCarousel: false
---

Hexo is unable to render the to-do list using the hexo-renderer-marked. In order to solve this, Add the following code to the plugin code.

<!--more-->

Add the code to  `/node_modules/hexo-renderer-kramed/lib/renderer.js` under your blog root dir.

```javascript
// Support To-Do List
Renderer.prototype.listitem = function(text) {
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text.replace(/^\s*\[ \]\s*/, '<input type="checkbox"></input> ').replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked></input> ');
    return '<li style="list-style: none">' + text + '</li>\n';
  } else {
    return '<li>' + text + '</li>\n';
  }
};
```

