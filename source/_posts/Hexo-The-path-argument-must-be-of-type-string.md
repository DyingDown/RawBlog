---
title: Hexo The "path" argument must be of type string
date: 2020-08-07 00:38:43
tags: [Hexo Plugin, Error, Recommend Article]
categories: Blog
postImage: https://s1.ax1x.com/2020/08/07/aRvbN9.jpg
description: While installing and using the Hexo Plugin [hexo-related-popular-posts], I ran Into a problem. I got an error after Hexo s. The followings are the details
---

## Problem

While installing and using the Hexo Plugin **[hexo-related-popular-posts](https://github.com/tea3/hexo-related-popular-posts)**, I ran Into a problem. I got an error after Hexo s. The followings are the details:

<!--more-->

```bash
Unhandled rejection TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received null
    at validateString (internal/validators.js:117:11)
    at Object.join (path.js:375:7)
    at getElm (D:\Study\Blog\node_modules\hexo-related-popular-posts\lib\list-json.js:371:28)
    at Object.module.exports.getList (D:\Study\Blog\node_modules\hexo-related-popular-posts\lib\list-json.js:383:23)
    at module.exports (D:\Study\Blog\node_modules\hexo-related-popular-posts\lib\helper.js:3:33)
    at Object.<anonymous> (D:\Study\Blog\node_modules\hexo-related-popular-posts\index.js:174:35)
    at eval (eval at wrap (D:\Study\Blog\node_modules\pug-runtime\wrap.js:6:10), <anonymous>:577:46)
    at template (eval at wrap (D:\Study\Blog\node_modules\pug-runtime\wrap.js:6:10), <anonymous>:1228:72)
    at Theme._View.View._compiled (D:\Study\Blog\node_modules\hexo\lib\theme\view.js:123:48)
    at Theme._View.View.View.render (D:\Study\Blog\node_modules\hexo\lib\theme\view.js:29:15)
    at D:\Study\Blog\node_modules\hexo\lib\hexo\index.js:349:21
    at tryCatcher (D:\Study\Blog\node_modules\bluebird\js\release\util.js:16:23)
    at D:\Study\Blog\node_modules\bluebird\js\release\method.js:15:34
    at RouteStream._read (D:\Study\Blog\node_modules\hexo\lib\hexo\router.js:123:3)
    at RouteStream.Readable.read (_stream_readable.js:459:10)
    at resume_ (_stream_readable.js:948:12)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
```

## Solution

I’ve searched online and every body says: To fix this issue simply upgrade **react-scripts** package (check latest version with `npm info react-scripts version`):

However, this doesn’t work for me.

Finally, I found that just delete the file `db.json` in your root blog directory, everything goes normal.

## Perplexity

I still don’t know why to do this. And I also need to delete the files every time I use `hexo s` or `hexo g`. I need to write `rm -rf db.json && hexo g` every time from now.

If anyone know why to do this and how to simply make hexo not to generate the `db.json` file, please tell me.

## How to use hexo-related-popular-posts

I’ve wrote an article on how to use the plugin in hexo blog. Check here: https://dyingdown.github.io/2020/08/07/How-to-use-hexo-related-popular-posts/