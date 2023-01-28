---
title: HTML Tags
date: 2020-02-10 12:30:25
tags: Knowledge points
categories: HTML
postImage: https://s1.ax1x.com/2020/04/26/Jc1oSe.jpg
---

Some of the most often used tags of HTML. And it's also a record of learning process. 

<!--more-->

# Title

```html
<h1> Title </h1>
<h2> Title </h2>
...
<h7> Title </h7>
```

# Horizontal Line

```html
<hr>
```

# Comments

```html
<!-- here are the comments -->
```

# Passage

```html
<p> This a passage </p>
```

# New Line

```html
<br>
```

# Format

Bold

```html
<b> This is bold </b>
```

Italic

```html
<i> This is italic </i>
```

Computer readable

```html
<code> print("this is code\n"); </code>
```

Superscript and Subscript

```html
H<sub>2</sub>O
10<sup>5</sup>
```

# Link

```html
<a href="url">link text</a>
```

# Head

```html
<head>
    <title> title of the doc </title>
    <!-- this is the default link of this page -->
    <base href="url" target="_blank">
    <!-- the relationship with outer resource -->
    <link rel="filename" type="text/css" href="dir">
    <!-- the styles of this page -->
    <style type="text/css">
        h {
            color: pink
        }
    </style>
    <!-- basic element of this page -->
    <meta name="keywords" content="o_oyao, blog">
    <meta name="description" content="The blog of o_oyao">
    <mata name="author" content="o_oyao">
    <meta http-equiv="refresh" content="60">
    <meta charset="UTF-8">
</head>
```

# Image

```html
<img src="url" alt="description of the picture" width="10" height="10">
```

Image map with clickable area

```html
<img src="" width="145" height="126" alt="" usemap="#name_of">

<map name="name_of">
  <area shape="rect" coords="x1,y1,x2,y2" href="" alt="">
  <area shape="circle" coords="x,y,radius" href="" alt="">
</map>
```

# Table

```html
<table border="1">
    <tr>
        <th>Time/Weeks</th>
        <th>Monday</th>
        ...
        <th>Sunday</th>
    </tr>
    <tr>
        <td>6:00~6:30</td>
        <td>Brush teeth</td>
        ...
        <td>Sleeps</td>
    </tr>
</table>
```

# Lists

Unordered list

```html
<ul>
    <li>o_oyao's blog is great</li>
    <li>o_oyao's article is easy to understand</li>
    <li>o_oyao's content is usable</li>
</ul>
```

Ordered list

```html
<ol>
    <li>Open o_oyao's blog</li>
    <li>Click one article</li>
    <li>Leave a comment below</li>
</ol>
```

Customize list

```html
<dl>
    <dt>o_oyao's blog</dt>
    <dd>- Awesome and great</dd>
    <dt>o_oyao's content</dt>
    <dd>- Easy and fun</dd>
</dl>
```

# Block

```html
<div>
    <!-- tags that starts a new line itself -->
    <h2></h2>
    <p></p>
    <ul></ul>
    <table></table>
</div>
<spam>
    <!-- tags that won't starts a new line -->
    <b></b>,<td></td>,<a></a>,<img>
</spam>
```

# Form

```html
<form name="input" action="xx.php" method="get">
    name: <input type="text" name="username"> <br>
    password: <input type="password" name="pwd">
    <!-- radio buttons -->
    <input type="radio" name="blog" value="o_oyao's blog is awesome"> <br>
    <input type="radio" name="blog" value="o_oyao's blog is fantastic">
    <!-- checkboxed -->
	<input type="checkbox" name="content" value="I like this blog">
    <input type="checkbox" name="content" value="I'll follow this blog">
    <!-- Submit Button -->
    <input type="submit" value="Submit">
</form>
```

# Frame

```html
<iframe src="url" width="" height="" frameborer="0"></iframe>
```

Using `iframe` to show target page

```html
<iframe src="url" name="blog"></iframe>
<p>
    <a href="https://dyingdown.github.io" target="blog">o_oyao's Blog</a>
</p>
```

# Color

Color values are represented by hexadecimal red, green, and blue (RGB).

The lowest value of each color is 0 (hexadecimal 00) and the highest value is 255 (hexadecimal FF).

The hexadecimal value is written as # followed by three or six hexadecimal characters.

The three-digit representation is: #RGB, and the 6-digit representation is: #RRGGBB.

# Script

```html
<script></script>
<!-- for client that has no surport of js -->
<noscript>Does not surport JavaScript!</noscript>
```