---
title: 导航条练习 Navigation Bar
date: 2020-04-09 05:08:12
tags: Project
categories: Web Study
postImage: https://s1.ax1x.com/2020/04/26/Jc12e1.png
---

This is an easy Navigation bar with no so many functions. When you hover on one item, the background change and all the items are able to click. And here is a preview of the navigation bar.

<!--more-->

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzA0LzA5L0c0Y0ZBTy5wbmc?x-oss-process=image/format,png)

## HTML Frame

First, we write a frame of html.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Navigation bar</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
</body>

</html>
```

## Content

Usually, the items of navigation bar are unordered list, you can use div but its not suggested.

So we create the list.

```html
<body>
    <ul id="nav">
        <li><a href="#">首页</a></li>
        <li><a href="#">新闻</a></li>
        <li><a href="#">联系</a></li>
        <li><a href="#">关于</a></li>
    </ul>
</body>
```

## CSS style

The content is simple, and it's displayed in a row in browser. If we want to get the format, we need  to give styles to the content.

### *

```css
* {
    margin: 0;
    padding: 0;
}
```

We use this to erase the original style given by the browser.

### #nave

```css
#nav {
    /* clear the circle shape before list */
    list-style: none;
    /* set a background color for the ul */
    background-color: skyblue;
    /* In IE6, if you set a width to it, then it's height won't crash */
    width: 1000px;
    /* use auto to make it display in the center of browser */
    margin: 50px auto;
    /* solve for the height crash problem */
    overflow: hidden;
}
```

### #nav li

```css
#nav li {
    /* let the item display in one line */
    float: left;
    /* set the width for each item, since we have four items, width is 1/4 */
    width: 25%;
}
```

If we want the hole area clickable, we need to set width to `<a>`. However, since we use float, `<a>` is disengaged in document flow so its parent has no width.  So we need to set the the width to li and make width of `<a>`  100%.

### #nav a

```css
#nav a {
	/* make it not inline item */
    display: block;
    /* its parent is li which we already set the width*/
    width: 100%;
    /* display in the center */
    text-align: center;
    /* set height of the bar */
    padding: 5px 0px;
    /* get rid of the underline */
    text-decoration: none;
    color: white;
    font-weight: bold;
}
```

### \#nav a:hover

When the mouse is over, the block changed into a different color. We use Pseudo class.

```css
#nav a:hover {
    background-color: brown;
}
```

## Summary

Merge the code into a whole thing.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Navigation bar</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/style.css" rel="stylesheet">
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }
        
        #nav {
            list-style: none;
            background-color: skyblue;
            /* In IE6, if you set a width to it, then it's height won't crash */
            width: 1000px;
            margin: 50px auto;
            /* solve for the height crash problem */
            overflow: hidden;
        }
        
        #nav li {
            float: left;
            width: 25%;
        }
        
        #nav a {
            display: block;
            width: 100%;
            text-align: center;
            padding: 5px 0px;
            text-decoration: none;
            color: white;
            font-weight: bold;
        }
        
        #nav a:hover {
            background-color: brown;
        }
    </style>
</head>

<body>
    <ul id="nav">
        <li><a href="#">首页</a></li>
        <li><a href="#">新闻</a></li>
        <li><a href="#">联系</a></li>
        <li><a href="#">关于</a></li>
    </ul>
</body>

</html>
```

Now, we finished the simple navigation bar.