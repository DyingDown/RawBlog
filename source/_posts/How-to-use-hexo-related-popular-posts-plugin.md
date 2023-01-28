---
title: How to use hexo related popular posts plugin
date: 2020-08-07 01:13:24
tags: [Install, Hexo Plugin]
categories: Blog
postImage: https://s1.ax1x.com/2020/08/07/aRqmBd.jpg
description: This article records my experience of using the hexo related popular posts plugin. And how to modify the plugin to make it suitable for my theme.
---

## Install

The most convenient way is to use npm to install.

```
npm install hexo-related-popular-posts --save
```

Or you can click here to download zip. https://github.com/tea3/hexo-related-popular-posts

## Usage

First, add the following `popular_posts( {} , post )` helper tag in template file for article.

If you are using PUG, you can use it this way:

```
div!= popular_posts( {} , post )
```

If you are using EJS, you can use it this way:

```
<%-
  popular_posts( {} , post )
%>
```

Since I don’t know the grammar of swig you can search it yourself or refer the code in Next Theme

### Switch

|      option      |                   description                   |          default           |
| :--------------: | :---------------------------------------------: | :------------------------: |
|     maxCount     |             Maximum count of a list             |            `5`             |
|     ulClass      |              Class name of element              |     `'popular-posts'`      |
|   PPMixingRate   | Mixing ratio of popular posts and related posts | `0.0`(=Related posts only) |
|      isDate      |                visible the date                 |          `false`           |
|     isImage      |                visible the image                |          `false`           |
|    isExcerpt     |               visible the excerpt               |          `false`           |
| PPCategoryFilter |     Option to fix category on Popular Posts     |        `undefined`         |
|   PPTagFilter    |       Option to fix tag on Popular Posts        |        `undefined`         |

To use these switches, you can type them in `{}`

```
popular_posts( {maxCount = 5, ulClass="popular-posts", dsDate = true} , post )
```

However, if you are using my hexo theme, you just need to set up the `_config.yml` in the theme directory.

## Problem

When I’m using this plugin, I ran into an error say:

```
Unhandled rejection TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received null
```

Here are the solution. https://dyingdown.github.io/2020/08/07/The-path-argument-must-be-of-type-string-Hexo/

## Custom

The reason why I need to custom the plugin code is that I want it to show pictures when my isImage tag is on. And I want it to looks beautiful and neat. So I need to set up a default picture for the article.

![Preview of the style of related article](https://s1.ax1x.com/2020/08/07/aWrKc8.png)

These pictures are default pictures.

So, to make the style more beautiful, flow these steps.

1. Find the folder `hexo-related-popular-posts` in `node_modules`

2. Open `lib/collector.js`

3. Go to line 54 and insert a line of code:

   ```javascript
   eyeCatchImage = "https://s1.ax1x.com/2020/04/25/J6iz9K.jpg"
   ```

   The value after the `=` is the link of your image. You can change it to your own favorite picture. I upload my image to a imgchr so I got the url.

4. Annotate lines from 55 to 63. Like this:

   ```javascript
   eyeCatchImage = "https://s1.ax1x.com/2020/04/25/J6iz9K.jpg"
   // let $ = cheerio.load(post.content)
   // if( $("img") && $("img").length > 0){
   //     $("img").each(function(i){
   //       if( i == 0 ){
   //         let imgsrc = $(this).attr("src")
   //         eyeCatchImage = imgsrc
   //       }
   //     })
   // }
   ```

All done. Refresh your sever.