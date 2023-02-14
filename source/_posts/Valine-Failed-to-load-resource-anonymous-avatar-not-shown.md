---
title: 'Valine: Failed to load resource && anonymous avatar not shown'
date: 2023-02-07 18:34:38
tags: [Error, Valine, Comment]
categories: [Blog]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302072153686.jpg
warning: true
---

Recently, I found valine has an error showing `Failed to load resource: net::ERR_NAME_NOT_RESOLVED`. And the anonymous user avatar is also not shown.

<!--more-->

## Failed to load resource

After seeing the console, I found that I'm requesting the URL `https://us.leancloud.cn`. Because I used the national version of leancloud, but the `valine.min.js` uses *cn* as suffix. 

### Modify comment file

In order to change that, I need to specify the `serverURLs` when initiating the `Valine` object.

```jade
window.valine = new Valine({
    el:'#vcomment',
    notify:notify,
    verify:verify,
    appId:'#{theme.valine.appId}',
    appKey:'#{theme.valine.appKey}',
    placeholder:'#{theme.valine.placeholder}',
    avatar:'#{theme.valine.avatar}',
    guest_info:guest_info,
    pageSize:'#{theme.valine.pageSize}',
    lang: '#{theme.valine.lang}',
    serverURLs: '#{theme.valine.serverURLs}',
})
```

Add `serverURLs: '#{theme.valine.serverURLs}',` to the end.

Usually, this code is locate in `layout/includes/third-party/comment/valine.pug` or `layout/includes/comment/valine.pug`

### Comment out cdn

Also, there is an error using `https://cdn1.lncld.net/static/js/3.0.4/av-min.js`, and its usually in the same file as the `new Valine()` code.

### Modify `_config.yml`

```yml
valine:
  on: true
  appId: ******* # App ID
  appKey: ***** # App Key
  verify: true # 验证码
  notify: true # 评论回复邮箱提醒
  avatar: 'mp' # 匿名者头像选项 https://valine.js.org/avatar.html
  placeholder: Leave your email address so you can get reply from me!
  lang: en
  guest_info: nick,mail,link
  pageSize: 10
  serverURLs: *********
```

Go to LeanCloud page and find your app.

Then go to *settings* and then *App keys*, and find *Server URLs: REST API Server URL*

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302072128726.png)

Copy this URL to the config file

This url is in the format of **https:// + first 8 characters of appId +  .api.lncldglobal.com**

## Anonymous avatar

Now the comment functions works, but the avatar still doesn't appear properly.

After checking the console, I saw there was a 404 error of *Gravatar*.

In some cases, the [gravatar.loli.net](https://gravatar.loli.net/) is not able to use, so we can change into [sdn.geekzu.org](https://sdn.geekzu.org)

1. First opens the Valine.min.js file your theme is using. I'm using `https://unpkg.com/valine/dist/Valine.min.js`, I used to use `https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js`
2. copy open it and copy the code out.
3. find `T={cdn:"https://gravatar.loli.net/avatar/` this in the code
4. replace them with `T={cdn:"https://sdn.geekzu.org/avatar/"`

In order not to lose the speed of loading page, we put the change into a cdn. I'm using GitHub and jsDeliver.

1. First commit the file into a  GitHub repository
2. copy the link of your file, to  this [jsDeliver page](https://www.jsdelivr.com/github)
3. copy the new link to replace the old cdn url.

And refresh the site, now the avatar works normally.

## References

[Valine 无法评论的解决方案](https://www.itaru.xyz/blogs/28b3acdd.html)

[valine评论系统不能使用](https://blog.csdn.net/weixin_45742830/article/details/106465336)

[解决Valine无法加载头像的方法](https://muspace.top/posts/28963/)