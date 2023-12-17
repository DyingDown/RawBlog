---
title: Valine 邮件回复 E-mail reply
date: 2020-05-08 06:55:13
tags: Valine
categories: Blog
postImage: https://s1.ax1x.com/2020/05/08/Yu8Jvd.jpg
warning: true
---

Valine is a comment system for blog or something else. It uses leancloud to store the message. And the tougher valine has a function that can reply the comment by email and locate to a certain page.

<!--more-->

## Configurate your valine

I assume that you all have valine on your blog. If not, search how to use it yourself.

This is my theme’s valine. I wrote the theme myself, for yours ,you can look it up online.

```pug
if theme.valine.on
  #vcomment()
  script(src='https://cdn1.lncld.net/static/js/3.0.4/av-min.js')
  script(src='https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js')
  script.
    var notify = '#{ theme.valine.notify }' == true ? true : false;
    var verify = '#{ theme.valine.verify }' == true ? true : false;
    var GUEST_INFO = ['nick','mail','link'];
    var guest_info = '#{ theme.valine.guest_info }'.split(',').filter(function(item){
      return GUEST_INFO.indexOf(item) > -1
    });
    guest_info = guest_info.length == 0 ? GUEST_INFO :guest_info;
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
      lang: '#{theme.valine.lang}'
    })
```

## LeanCloud Setup

First, start a new application, and get the AppID and AppKey and so on.

Then Fill your blog website url in the underline space.

![YuYUbR.png](https://s1.ax1x.com/2020/05/08/YuYUbR.png)

Third, fill the repository follow the steps.

The repository is `https://github.com/panjunwen/Valine-Admin.git`

![YM0CLT.png](https://s1.ax1x.com/2020/05/09/YM0CLT.png)

![YM0nQx.png](https://s1.ax1x.com/2020/05/09/YM0nQx.png)

![YM0h0U.png](https://s1.ax1x.com/2020/05/09/YM0h0U.png)

Forth, add some variables.

![YMDkG9.png](https://s1.ax1x.com/2020/05/09/YMDkG9.png)

|       变量       |                   示例                    |                             说明                             |
| :--------------: | :---------------------------------------: | :----------------------------------------------------------: |
|    SITE_NAME     |                  Deserts                  |                        [必填]博客名称                        |
|     SITE_URL     | [https://deserts.io](https://deserts.io/) |                        [必填]首页地址                        |
| **SMTP_SERVICE** |                    QQ                     | [新版支持]邮件服务提供商，支持 QQ、163、126、Gmail 以及 [更多](https://nodemailer.com/smtp/well-known/#supported-services) |
|    SMTP_USER     |   [xxxxxx@qq.com](mailto:xxxxxx@qq.com)   |                      [必填]SMTP登录用户                      |
|    SMTP_PASS     |               ccxxxxxxxxch                |         [必填]SMTP登录密码（QQ邮箱需要获取独立密码）         |
|   SENDER_NAME    |                  Deserts                  |                         [必填]发件人                         |
|   SENDER_EMAIL   |   [xxxxxx@qq.com](mailto:xxxxxx@qq.com)   |                        [必填]发件邮箱                        |
|    ADMIN_URL     |          https://xxx.leanapp.cn/          |             [建议]Web主机二级域名，用于自动唤醒              |
|  BLOGGER_EMAIL   | [xxxxx@gmail.com](mailto:xxxxx@gmail.com) |         [可选]博主通知收件地址，默认使用SENDER_EMAIL         |
|   AKISMET_KEY    |               xxxxxxxxxxxx                | [可选]Akismet Key 用于垃圾评论检测，设为MANUAL_REVIEW开启人工审核，留空不使用反垃圾 |
|    SMTP_HOST     |           smpt-mail.outlook.com           |             [必填]SMTP服务器，需自己查询相关邮箱             |

|     Variable     |                    Example                    |                         Explanation                          |
| :--------------: | :-------------------------------------------: | :----------------------------------------------------------: |
|    SITE_NAME     |                    Deserts                    |                       [Must]Blog name                        |
|     SITE_URL     |   [https://deserts.io](https://deserts.io/)   |                 [Must] URL of your home page                 |
| **SMTP_SERVICE** |                  Outlook365                   | Mail service provider: QQ、163、126、Gmail and [More](https://nodemailer.com/smtp/well-known/#supported-services) |
|    SMTP_USER     |     [xxxxxx@qq.com](mailto:xxxxxx@qq.com)     |                       [Must]SMTP User                        |
|    SMTP_PASS     |                 ccxxxxxxxxch                  | [Must]SMTP Password（QQ Needs other password look up yourself） |
|   SENDER_NAME    |                    Deserts                    |                         [Must]发件人                         |
|   SENDER_EMAIL   |     [xxxxxx@qq.com](mailto:xxxxxx@qq.com)     |                        [Must]发件邮箱                        |
|    ADMIN_URL     |            https://xxx.leanapp.cn/            |            [Suggest]Web主机二级域名，用于自动唤醒            |
|  BLOGGER_EMAIL   | [xxxxx@outlook.com](mailto:xxxxx@outlook.com) |       [Optional]博主通知收件地址，默认使用SENDER_EMAIL       |
|   AKISMET_KEY    |                 xxxxxxxxxxxx                  | [Optional]Akismet Key use to detect junk comment，if it’s set to MANUAL_REVIEW then open manual review |
|    SMTP_HOST     |             smpt-mail.outlook.com             | [Must]SMTP Host, you need to look up for your email yourself |

**About SMPT_HOST of outlook, I will tell you how to set it.**

open your email in a browser.

![YMcKCF.png](https://s1.ax1x.com/2020/05/09/YMcKCF.png)

![YMRLPf.png](https://s1.ax1x.com/2020/05/09/YMRLPf.png)

![img](https://s1.ax1x.com/2020/05/09/YMWMIx.png)

**SMTP_HOST is smpt-mail.outlook.com** not smpt.office365.com

SMTP_SERVER is Outlook365

After you fill the variables, deploy your settings.

![YMfplD.png](https://s1.ax1x.com/2020/05/09/YMfplD.png)

Then, click restart to restart the application.

![YMhhxU.png](https://s1.ax1x.com/2020/05/09/YMhhxU.png)

Till now, the function can work.