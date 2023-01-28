---
title: Make previous windows blog available on Linux
date: 2020-01-29 13:40:46
tags: build
categories: [Blog, Linux]
postImage: https://s1.ax1x.com/2020/04/26/JcNu6O.jpg
---

While using windows, I have already had a blog and using hexo system. And my blog is on my **mechanical hard disk**. I want it to be accessible while using Linux.

There are two steps to make it.

<!--more-->

## Mount the disk

Click to see [what is mount and how to mount](https://dyingdown.github.io/2020/01/29/Mount-mechanical-hard-disk-on-Linux/).

Basically, you can use your previous command to operate your blog. However, I still has problem. Even I’ve already installed hexo-cli, it still and understand the hexo command. So needs another thing. npx

## Install npm

open the terminal and type

```
yay npm
```

And then for each hexo command, you add npx at before. For example:

```
npm hexo d
```

You also need to add new ssh key to your repository.

Type the following command.

```
ssh-keygen -t rsa -C "the email address of GitHub"
```

After some Enter, you get the message:

>  Your public key has been saved in /c/Users/user/.ssh/id_rsa.pub.

Find the file and open it, copy all the content in it and past it in http://github.com/settings/ssh.

you can use gedit to open it

```
gedit id_rsa.pub
```

![img](https://s2.ax1x.com/2019/08/13/mPnQBV.png)

![img](https://s2.ax1x.com/2019/08/13/mPnVhQ.png)

Title is arbitrary.

All done.