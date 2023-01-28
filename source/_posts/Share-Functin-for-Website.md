---
title: Share Functin for Website
date: 2020-08-07 05:22:13
tags: [Install, Plugin]
categories: Blog
postImage: https://s1.ax1x.com/2020/08/07/afpASA.jpg
description: I want to add a share function to my blog. So that readers can share my articles easily. I use a plugin Share.js. Even though this project has been not maintained for long, it’s still can be used.
---

I want to add a share function to my blog. So that readers can share my articles easily. I use a plugin `Share.js`. Even though this project has been not maintained for long, it's still can be used.


## Install

1. 使用 [npm](https://npmjs.com/)

   ```
   npm install social-share.js
   ```

2. 使用 [cdnjs](https://cdnjs.com/libraries/social-share.js)，引入 `share.min.css` 与 `social-share.min.js` 两个链接.

3. 手动下载或者 git clone 本项目。

At first, I choose the easiest way to use npm to install. However, I ran into some bugs that the icons of the brand recurring many times. So I thinks maybe is that the npm version is not the newest. 

So, I cloned the project.

## Usage

Here I'm just going to introduce how to use it on hexo blog.

### HTML

First, in your html file, you need to specify a class called `social-share` . 

```html
<div class="social-share"></div>
```

### JS

Copy the files `social-share.js` and `qrcode.js` in directory `share.js/src/js` to your program directory. 

And then include them in the html file you just created.

```html
<script src="/js/social-share.js"></script>
<script src="/js/qrcode.js"></script>
```

You should change your `src` to your own file directory.

### CSS

Copy `share.min.css` to your work directory. And include it.

```html
<link rel="stylesheet" href="../dist/css/share.min.css">
```

### Configuration

If you want to specify your icons and share functions. you can use js code to configurate it.

```html
<script>
    var $config = {
        title               : 'Share Functin for Website',
        description         : '123',
        sites               : ['qzone', 'qq', 'weibo','wechat', 'douban']
        wechatQrcodeTitle   : "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
    };

    socialShare('.social-share', $config);    
<script>
```

There are many options to let you configurate:

```
url                 : '', // 网址，默认使用 window.location.href
source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
origin              : '', // 分享 @ 相关 twitter 账号
description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
image               : '', // 图片, 默认取网页中第一个img标签
sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
```

Or you can simply write it in html as you create it:

```html
<div class="share-component" data-disabled="google,twitter,facebook" data-description="Share.js - 一键分享到微博，QQ空间，腾讯微博，人人，豆瓣"></div>
```

For more usage, visits https://github.com/overtrue/share.js.

### Theme Last

If you are using my theme, you can just configurate the switch in `_config.yml`.

## Note

When you test the share function for qq friend or qqzone, you should use 127.0.0.1 instead of localhost. Or you will get an error while sharing because QQ blocks localhost by default.