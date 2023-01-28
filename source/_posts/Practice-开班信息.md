---
title: Practice 开班信息
date: 2020-04-10 02:33:04
tags: Project
categories: Web Study
postImage: https://s1.ax1x.com/2020/04/26/Jc1cLR.jpg
---

Practice how to use Photoshop to measure the heights of a given picture and write the picture using HTML and CSS.

<!--MORE-->

![img](https://s1.ax1x.com/2020/04/10/GIxnsA.png)

This is how the picture looks like but it’s not the actual size since I can’t get the original picture. So this is only a reference about the style and structure.

## Build Structure

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        /* clear default style */
        
        * {
            margin: 0;
            padding: 0;
        }
        /* unify fonts in the page */
        
        body {
            font: 12px/1 "Microsoft Yahei UI"
        }
    </style>
</head>

<body>
    <!-- outer div that contains the all content-->
    <div class="outer">

        <!-- head of 开班信息 -->
        <div class="title"></div>

        <!-- content of 开班信息 -->
        <div class="content"></div>
    </div>
</body>

</html>
```

## .outer

We can get the height and width of the Picture using PS and then set a style of the `.outer` to make it looks more comfortable.

```css
.outer { 
    width: 300px;
    height: 473px;
    background-color: #fba;
    margin: 50px auto;
}
```

## .title

We can also see from the picture using PS that the title of the picture has margin that is `2px` and color is `#019e8b`.

Its height is `36px`

```html
 <!-- head of 开班信息 -->
<div class="title">
    <h3>近期开班</h3>
    <a href="#">16年面授开班计划</a>
</div>
/* set the style of title */
.title {
    border-top: 2px solid #019e8b;
    height: 36px;
    background-color: #f5f5f5;
    /* set vertical align to center */
    line-height: 36px;
    padding: 0px 22px 0px 16px;
}

/* set the hyper reference in title */
.title a {
    float: right;
    color: red;
}

/* or you can also change the order of h3 and a in html */
.title h3 {
    float: left;
    font: 16px/36px "Microsoft Yahei";
}
```

## .content

We can see from the picture that the content has a all-direction border and color is `#deddd9`

```html
<!-- content of 开班信息 -->
<div class="content">
    <h3><a herf="#">JavaEE+云计算-全程就业班</a></h3>
    <ul>
        <li>
            <a class="right-item" href="#"><span class="time">预约报名</span></a>
            <a href="#">开班时间：<span class="time">2016-04-27</span></a>
        </li>
        <li>
            <a class="right-item" href="#"><span class="time">无座，名额爆满</span></a>
            <a href="#">开班时间：<span class="time">2016-04-07</span></a>
        </li>
        <li>
            <a class="right-item" href="#">开班盛况</a>
            <a href="#">开班时间：2016-03-15</a>
        </li>
        <li>
            <a class="right-item" href="#">开班盛况</a>
            <a href="#">开班时间：2016-02-25</a>
        </li>
        <li>
            <a class="right-item" href="#">开班盛况</a>
            <a href="#">开班时间：2016-12-26</a>
        </li>
    </ul>
    <h3><a herf="#">Android+人工智能-全程就业班</a></h3>
    <ul>
        <li>
            <a class="right-item" href="#"><span class="time">预约报名</span></a>
            <a href="#">开班时间：<span class="time">2016-04-10</span></a>
        </li>
        <li>
            <a class="right-item" href="#">开班盛况</a>
            <a href="#">开班时间：2016-03-17</a>
        </li>
        <li>
            <a class="right-item" href="#">开班盛况</a>
            <a href="#">开班时间：2016-02-20</a>
        </li>
        <li>
            <a class="right-item" href="#">开班盛况</a>
            <a href="#">开班时间：2016-12-23</a>
        </li>
    </ul>
    <h3><a herf="#">前端+HTML5-全程就业班</a></h3>
    <ul class="no-border">
        <li>
            <a class="right-item" href="#"><span class="time">预约报名</span></a>
            <a href="#">开班时间：<span class="time">2016-05-10</span></a>
        </li>
        <li>
            <a class="right-item" href="#">开班盛况</a>
            <a href="#">开班时间：2016-03-16</a>
        </li>
    </ul>
</div>
/* set style for content */
        
.content {
    border: 1px solid #deddd9;
    padding: 0 28px 0 22px;
}
/*set style for hyper reference in content */

.content a {
    color: black;
    text-decoration: none;
}
/* set style of ul */

.content ul {
    list-style: none;
    border-bottom: 1px dashed #deddd9;
}
/* set style for each red element */

.content .time {
    color: red;
    font-weight: bold;
}

.content .right-item {
    float: right;
}

.content h3 {
    margin-top: 14px;
    margin-bottom: 16px;
}

.content li {
    margin-bottom: 15px
}

.content .no-border {
    border: none;
}
</style>
```

**NOTE:** In IE6, even the item before the float item is a in-line element, it still won’t be in the same line as the upper element. So we need to set the upper element float or change their orders.

At last change the background of `.outer` into white.

## Summary

```html
css<!DOCTYPE html>
<html lang="en">

<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        /* clear default style */
        
        * {
            margin: 0;
            padding: 0;
        }
        /* unify fonts in the page */
        
        body {
            font: 12px/1 "Microsoft Yahei"
        }
        /* set style for the outer div */
        
        .outer {
            width: 300px;
            height: 470px;
            background-color: white;
            margin: 50px auto;
        }
        /* set the style of title */
        
        .title {
            border-top: 2px solid #019e8b;
            height: 36px;
            background-color: #f5f5f5;
            /* set vertical align to center */
            line-height: 36px;
            padding: 0px 22px 0px 16px;
        }
        /* set the hyper reference in title */
        
        .title a {
            float: right;
            color: red;
        }
        
        .content a:hover {
            color: red;
            text-decoration: underline;
        }
        /* or you can also change the order of h3 and a in html */
        
        .title h3 {
            float: left;
            font: 16px/36px "Microsoft Yahei";
        }
        /* set style for content */
        
        .content {
            border: 1px solid #deddd9;
            padding: 0 28px 0 22px;
        }
        /*set style for hyper reference in content */
        
        .content a {
            color: black;
            text-decoration: none;
        }
        /* set style of ul */
        
        .content ul {
            list-style: none;
            border-bottom: 1px dashed #deddd9;
        }
        /* set style for each red element */
        
        .content .time {
            color: red;
            font-weight: bold;
        }
        
        .content .right-item {
            float: right;
        }
        
        .content h3 {
            margin-top: 14px;
            margin-bottom: 16px;
        }
        
        .content li {
            margin-bottom: 15px
        }
        
        .content .no-border {
            border: none;
        }
    </style>
</head>

<body>
    <!-- outer div that contains the all content-->
    <div class="outer">

        <!-- head of 开班信息 -->
        <div class="title">
            <h3>近期开班</h3>
            <a href="#">16年面授开班计划</a>
        </div>

        <!-- content of 开班信息 -->
        <div class="content">
            <h3><a herf="#">JavaEE+云计算-全程就业班</a></h3>
            <ul>
                <li>
                    <a class="right-item" href="#"><span class="time">预约报名</span></a>
                    <a href="#">开班时间：<span class="time">2016-04-27</span></a>
                </li>
                <li>
                    <a class="right-item" href="#"><span class="time">无座，名额爆满</span></a>
                    <a href="#">开班时间：<span class="time">2016-04-07</span></a>
                </li>
                <li>
                    <a class="right-item" href="#">开班盛况</a>
                    <a href="#">开班时间：2016-03-15</a>
                </li>
                <li>
                    <a class="right-item" href="#">开班盛况</a>
                    <a href="#">开班时间：2016-02-25</a>
                </li>
                <li>
                    <a class="right-item" href="#">开班盛况</a>
                    <a href="#">开班时间：2016-12-26</a>
                </li>
            </ul>
            <h3><a herf="#">Android+人工智能-全程就业班</a></h3>
            <ul>
                <li>
                    <a class="right-item" href="#"><span class="time">预约报名</span></a>
                    <a href="#">开班时间：<span class="time">2016-04-10</span></a>
                </li>
                <li>
                    <a class="right-item" href="#">开班盛况</a>
                    <a href="#">开班时间：2016-03-17</a>
                </li>
                <li>
                    <a class="right-item" href="#">开班盛况</a>
                    <a href="#">开班时间：2016-02-20</a>
                </li>
                <li>
                    <a class="right-item" href="#">开班盛况</a>
                    <a href="#">开班时间：2016-12-23</a>
                </li>
            </ul>
            <h3><a herf="#">前端+HTML5-全程就业班</a></h3>
            <ul class="no-border">
                <li>
                    <a class="right-item" href="#"><span class="time">预约报名</span></a>
                    <a href="#">开班时间：<span class="time">2016-05-10</span></a>
                </li>
                <li>
                    <a class="right-item" href="#">开班盛况</a>
                    <a href="#">开班时间：2016-03-16</a>
                </li>
            </ul>
        </div>
    </div>
</body>

</html>
```

![](https://s1.ax1x.com/2020/04/10/Gosy6A.png)