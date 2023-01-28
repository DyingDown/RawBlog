---
title: How to add rating star to Blog
date: 2020-08-11 02:12:46
tags: [Install, Function]
categories: Blog
postImage: https://s1.ax1x.com/2020/08/11/aLZfjH.jpg
description: Get a star function to your blog or webpage so that reader can give feedbacks to your article.
---

## Widget Pack

We use [Widget Pack](https://widgetpack.com/) to get the function. It's an powerful widget that has many function. Here we will just use it's rating function because I thinks valine is more beautiful......

## Preview

Here is a preview of the function. The color of the stars can be customized.

![Rating preview](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzA4LzExL2FMZTZxcy5wbmc?x-oss-process=image/format,png)

## Preparation

First Sign Up for an account.
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzA4LzExL2FMbmRnUy5wbmc?x-oss-process=image/format,png)
Follow it's steps. It will let you fill your website address.

After some steps, you will get your ID here:
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzA4LzExL2FMUUJSMC5wbmc?x-oss-process=image/format,png)
Click here, you can set how can reader vote for your article.
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzA4LzExL2FPWTlEeC5wbmc?x-oss-process=image/format,png)
Select the drop down box to turn on anonymous rating.
![aOt9zj.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzA4LzExL2FPdDl6ai5wbmc?x-oss-process=image/format,png)
And there you can change color of stars and number of stars.
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzA4LzExL2FPdEV3Vi5wbmc?x-oss-process=image/format,png)
Then click `SAVE SETTING`.

## Add Function

Create a new file called `startRating.html` or `.pug`

```pug
<center>
<div id="wpac-rating"></div>
</center>
script(type="text/javascript").
    wpac_init = window.wpac_init || [];
    wpac_init.push({widget: 'Rating', id: #{theme.star.id}, color: "#{theme.star.color}"});
    (function() {
        if ('WIDGETPACK_LOADED' in window) return;
        WIDGETPACK_LOADED = true;
        var mc = document.createElement('script');
        mc.type = 'text/javascript';
        mc.async = true;
        mc.src = 'https://embed.widgetpack.com/widget.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mc, s.nextSibling);
    })();
```

**But, if you are using it on your website, you can just copy the code he gives you.**

Then find the file `post.pug`. Find the bottom of the article and include the file `starRating.pug`.

```pug
if theme.star.on
    include ... .pug
```

After that, find your theme `_config.yml` and type these:

```yml
# Rating star function 打星功能
star:
  on: true
  id: 26703 # app id 用户id
  color: fadb14 # color of stars in Hexadecimal 星星的颜色
```

Save and preview.