---
title: PicGo+GitHub+Typora for Blog
date: 2021-08-31 12:54:40
tags: [GitHub, PicGo, Typora]
categories: Image Host
postImage: https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831215411.jpg
isCarousel: false
---

Recently, while trying to accelerate my blog load speed, I also want to get all my pictures a cdn. Also I’m tired of uploading the picture every time I want to quote a picture in my post, So I found a  softeware **PicGo**.

<!--more-->

## Preparations

I’m using *Typora* to edit markdown files.

And downloading *PicGo* is also needed. [click here to download V2.2.2](https://github.com/Molunerfinn/PicGo/releases/tag/v2.2.2)

Then you need to have a *GitHub Repository* to store your images.

## Setups

First, find *GitHub 图床* in *PicGo*.

![image-20210831212725254](https://img-blog.csdnimg.cn/img_convert/6fb9009aa610f43a041eeaacb877bd0c.png)

1. “设定仓库名”（set repository name)

   the format is `GitHub_Username/repo_name`. Be sure to write username because I forgot to write it and I can’t upload the picture which confused me a long time.

2. “设定分支名”（set branch name）

   usually is `main` or `master`

3. “设定Token”（set token）

   First you need to generate a token for PicGo.

   Setting -> Developer settings -> Personal access tokens -> generate a new token

   <img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831213039.png" alt="image-20210831213039197" style="zoom: 67%;display:inline;" />  <img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831213129.png" alt="image-20210831213129878" style="zoom:50%;display:inline;" /> <img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831213256.png" alt="image-20210831213256531" style="zoom:80%;display:inline" />

   Fill *Note* and select *Expiration*.

   Then select scopes, according to the docs of PicGo, it only need to select repo

   <img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831213611.png" alt="image-20210831213611449" style="zoom: 73%;" />

   Then go to the bottom `Generate Token`.

   The token will be shown like this.

   <img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831213816.png" alt="image-20210831213816079" style="zoom:67%;" />

   copy the token to PicGo. 

   **Note that you can save the token to a file because once you refresh the page, you can not see the content of token again.**

4. “指定存储路径”（set storage path）

   Set the folder in your repo.

5. “设定自定义域名”（set custom domain）

   In this situation, since I want to use *jsDelivr* to make my image faster and I don’t want to type `https://cdn.jsdelivr.net/gh/github_Username/repo_Name` every time, I can fill this to the blank.

Then, you need to set for typora.

![image-20210831214853064](https://img-blog.csdnimg.cn/img_convert/c378b6fb0908e405587e1e97ccf83051.png)

The configuration is this.

After all the settings, press the button `验证图片上传选项`to test whether all the functions can work.

At last, next time you copy a image into typora, it will automatically upload your picture to your “image hosing service” and returns an url that with the jsDelivr prefix.

## Some errors

First one is that there is a file with the same name already exists in the repo. In this case, you can select <img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831214316.png" alt="image-20210831214316812" style="zoom:50%;display:inline" /> this to rename your file using timestamp.

Other errors may be that you wrote your username or repo name wrong.

For more errors, you can check <img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831214514.png" alt="image-20210831214514413" style="zoom:50%;display:inline" />this to see the log file.

## For blog

In order to be easy, I did not create a new repository for images, I just want it to store in the Blog repo. So when I preview my posts in localhost, it works fine and the pictures all can be shown.

But a day later,when I tried to open my blog, I found that the pictures can’t load. I check the link and the picture can’t be opened. Then I went to see the repo and the pictures are just gone!!!

That’s because when I deploy my blog, I push all the things to the repo to cover the repo, because I didn’t have the pictures in my local files, the files covers the old repo, then the images are disappeared. And even the commits of PicGo disappeared. 

At last, I still have to create a new repo for images.