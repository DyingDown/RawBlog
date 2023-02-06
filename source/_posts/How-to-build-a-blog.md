---
title: How to build a blog
date: 2019-08-13 09:49:05
categories: Blog
tags: [Hexo, Install]
warning: true
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051638833.png
---

After all these days of staying up late, I finally build up my own blog by asking a big boss and searching online. The followings are some detailed contents of how I actually built it.

<!--more-->

## 1 Preparation

### 1.1 GitHub

You need to have a GitHub ID so that’s where you can host your blog. Click here to [Sign up](https://github.com/) for GitHub or [Log in](https://github.com/login).

Then click the new button on the left to create a new repository.

![img](https://s2.ax1x.com/2019/08/13/mPnm1s.png)

Then comes to this page.

![img](https://s2.ax1x.com/2019/08/13/mPnF78.png)

**NOTICE**: The format of your repository name is yourGitHubName.github.io This is also your website address. Make sure to select **Public NOT Private**.

Then click create repository button. The repo is successfully created!

### 1.2 Environment

#### 1.2.1 Node.js

First install [Node.js](https://nodejs.org/en/). Click to install.

![img](https://s2.ax1x.com/2019/08/13/mPnepj.png)

I chose the left which is recommended for most users.

#### 1.2.2 Cmder

Then install [Cmder](https://cmder.net/). Click to install.

![img](https://s2.ax1x.com/2019/08/13/mPnEtg.png)

It’s recommended to click the small blue link. *~58MB 7z*

#### 1.2.3 yarn

Third is to install [yarn](https://yarnpkg.com/zh-Hans/). Click to install.

#### 1.2.4 Hexo

The last thing is to install **Hexo**.

Open the Cmer.exe that you have just installed.

![img](https://s2.ax1x.com/2019/08/13/mPnAAS.png)

Return to the previous directory. Keep return to the file you want to settle your blog

```
λ cd..
```

Set the Source

```
λ yarn global add cnpm --registry=https://registry.npm.taobao.org
```

Then install hexo

```
λ yarn add hexo-cli
```

## 2 Settings

### 2.1 Initial Blog

Find your folder or place to contain blog and open it with Cmder.

Input the flowing command

```
λ hexo init blog
```

The word after **init** is your folder name which you can name it arbitrary.

After initial your hexo, there will be a automatically generated passage hello-word.md. Run the command to see what it looks like.

```
λ hexo g
```

hexo g is short for hexo generate which is to generate your blog

```
λ hexo s
```

hexo s is short for hexo server which is to open the sever. After it is done, you can open http://localhost:4000/ to see what is it looks like.

![img](https://s2.ax1x.com/2019/08/13/mPnncn.jpg)

### 2.2 Add SHH

Back to the Cmder window, press Ctrl+C to exist the server. Then type in

```
λ ssh-keygen -t rsa -C "the email address of GitHub"
```

After some Enter, you get the message:

>  
>
> Your public key has been saved in /c/Users/user/.ssh/id_rsa.pub.

Find the file and open it, copy all the content in it and past it in http://github.com/settings/ssh.

![img](https://s2.ax1x.com/2019/08/13/mPnQBV.png)

![img](https://s2.ax1x.com/2019/08/13/mPnVhQ.png)

Title is arbitrary.

### 2.3 Configurate your Blog

Open the file _config.yml under the directory of your blog.

![img](https://s2.ax1x.com/2019/08/13/mPnMn0.png)

![img](https://s2.ax1x.com/2019/08/13/mPni0f.png)

Edit the things in your own favor. Remember there is a **space** after the colon or it will be a syntax error. And the repo is your website address.

After all is done, back to the cmder window and generate using **hexo g**. Then type

```
λ hexo d
```

d stands for deploy that is to send your local settings to the repo. During deploying, it will come out a login block, just login your GitHub is OK.

**Note: ** If you see this `ERROR Deployer not found: git` , you should install `hexo-deployer-git`.

## 3 Publish new article

### 3.1 Typora

To publish articles, hexo uses markdown. You can search on the website to see what exactly is markdown. And here is [basic sytax of markdown](https://www.markdownguide.org/basic-syntax).

I recommended to use [typora](https://typora.io/#windows) to write markdown. Click to download.

Type in your cmder window to generate a new md file.

```
hexo new article-name
```

Write your article in markdown and **hexo s** to preview it and **hexo g** and then **hexo d**.

## Congratulations!

Now you’ve built your blog and have your first post. Isn’t it easy and fun?

In the next passage I’m going to talk about how to change theme of your blog.