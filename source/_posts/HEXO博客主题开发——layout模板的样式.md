---
title: HEXO博客主题开发——layout模板的样式
date: 2020-12-19 06:38:36
tags: [Hexo, hexo-theme-last]
categories: HEXO Theme
postImage: https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831220248.jpg
---

## 浏览框架结构

上一次已经生成了博客的基本框架，现在可以显示一个基本的博客了。我们先阅读一下给我们生成的框架大都是什么作用。

我的文件结构差不多是这样：

```
├── layout # 布局文件夹
│   ├── archive.pug # 归档页
│   ├── category.pug # 分类页
│   ├── includes # 复用的公共页
│   │   ├── layout.pug # 页面布局
│   │   └── recent-posts.pug # Home页面
│   ├── index.pug # 主页
│   ├── page.pug # 页面详情页
│   ├── post.pug # 文章详情页
│   └── tag.pug # 标签页
├── _config.yml # 主题的配置文件
└── source # 资源文件夹
    ├── css # CSS
    │   └── last.styl
    ├── favicon.ico # 站点图标
    └── js # JS
        └── last.js
```

## 增加footer.pug

写一个footer.pug来专门存放页面底部的内容。

在`includes`下面新建文件，因为这个footer是要复用的.