---
title: How to encrypt your post
date: 2020-08-11 14:34:33
tags: [Install, Hexo Plugin, Encryption]
categories: Blog
postImage: https://s1.ax1x.com/2020/08/11/aXJNo8.jpg
description: Sometimes we want to write something that we don't want all the web users to read. And the way we add password at <head> is no safe. So we can use hexo plugin hexo-blog-encrypt to set password for our post.
---

Sometimes we want to write something that we don't want all the web users to read. And the way we add password at  &lt;head> is no safe. So we can use hexo plugin `hexo-blog-encrypt` to set password for our post.

## Install

Use npm to install.

```bash
npm install hexo-blog-encrypt
```

Use yarn to install

```bash
yarn add hexo-blog-encrypt
```

## Settings

In your root `_config.yml` file, add these:

```yml
# encrypt plugin
encrypt:
  enable: true
  default_abstract: 这是一篇加密文章，内容可能是个人日常吐槽或者特殊技术分享。如果你确实想看，请与我联系。非亲友团勿扰。
  default_message: 输入密码，查看文章。
```

Default abstract is the default description of your post. And default message is the default message that shows before the input frame.
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzA4LzExL2FYWUoxSi5wbmc?x-oss-process=image/format,png)
Or, you can set it in every post.

```md
keywords: 博客文章密码
password: 123456
message: 密码：123456
abstract: xxxxxx
```