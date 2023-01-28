---
title: POLO360 Practice
date: 2020-04-11 05:17:11
tags: Project
categories: Web Study
postImage: https://s1.ax1x.com/2020/04/26/Jc1rz4.jpg
---

This is static page practice and the length is strictly measured using PS and is fixed. It does not support responsive layout and all the pictures are got from psd file using Photoshop. The bottom has a download the psd file.

## Preview

Here is preview of my practice.

![img](https://s1.ax1x.com/2020/04/11/GHJM9I.png)

## Code

### Directory

```
.
├── Polo-360
├── css
│   ├── page-index.css
│   └── reset.css
├── img
│   ├── 1.gif
│   ├── 2.gif
│   ├── 3.gif
│   ├── banner
│   │   ├── banner.png
│   │   ├── dot-selected.png
│   │   ├── dot.png
│   │   └── shadow.png
│   ├── btn2.png
│   ├── content
│   │   ├── break.png
│   │   ├── content1.png
│   │   ├── content2.png
│   │   ├── content3.png
│   │   ├── img-bg.png
│   │   └── learnMore.png
│   ├── fb.png
│   ├── input.png
│   ├── ins.png
│   ├── line.png
│   ├── logo.png
│   ├── rss.png
│   ├── textarea.png
│   ├── top-background.png
│   ├── tw.png
│   └── yt.png
├── index.html
└── previw.png
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>POLO360 Practice</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/page-index.css">
</head>

<body>
    <!-- create head div-->
    <!-- header start -->
    <div class="header w">

        <!-- create a navigation -->
        <ul class="nav">
            <li>
                <a href="#">HOME</a>
                <p>Back to home</p>
            </li>
            <li>
                <a href="#">PRODUCTS</a>
                <p>What we have for you</p>
            </li>
            <li>
                <a href="#">SERVICES</a>
                <p>Things we do</p>
            </li>
            <li>
                <a href="#">BLOG</a>
                <p>Follow our updates</p>
            </li>
            <li>
                <a href="#">CONTACT</a>
                <p>Ways to reach us</p>
            </li>
        </ul>

        <!-- set logo -->
        <div class="logo">
            <a href="#" title="Polo360">
                <img src="img/logo.png" alt="Logo of POLO360">
            </a>
        </div>
    </div>
    <!-- header end -->

    <!-- banner start -->
    <div class="banner w">
        <img src="img/banner/banner.png" alt="banner">

        <!-- create navigation dot -->
        <div class="pointer">
            <a href="#"></a>
            <a href="#" class="selected"></a>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
        </div>
    </div>
    <!-- banner end -->

    <!-- content start -->
    <div class="content w clearfix">
        <h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </h1>

        <!-- div content -->
        <div class="pl">
            <h2>Perfect Logic</h2>
            <p class="subTitle">All you want your website to do.</p>
            <div class="imgDiv">
                <img src="img/content/content1.png" alt="content1">
            </div>
            <p class="contents">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt </p>
            <a href="#" class="learnMore">Learn More</a>
        </div>
        <div class="cs">
            <h2>Complete Solution</h2>
            <p class="subTitle">All you want your website to do.</p>
            <div class="imgDiv">
                <img src="img/content/content2.png" alt="content2">
            </div>
            <p class="contents">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciun tdolore magnam aliquam quaerat voluptatem.</p>
            <a href="#" class="learnMore">Learn More</a>
        </div>
        <div class="uc">
            <h2>Uber Culture</h2>
            <p class="subTitle">All you want your website to do.</p>
            <div class="imgDiv">
                <img src="img/content/content3.png" alt="content3">
            </div>
            <p class="contents">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciun tdolore magnam aliquam quaerat voluptatem.</p>
            <a href="#" class="learnMore">Learn More</a>
        </div>
    </div>
    <!-- content end -->

    <!-- contact start -->
    <div class="contact w clearfix">
        <div class="sc">
            <h2>Social Connection</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium</p>
            <div class="ico">
                <a href="#" class="icon"><img src="img/rss.png" alt="rss"></a>
                <a href="#" class="icon"><img src="img/fb.png" alt="facebook"></a>
                <a href="#" class="icon"><img src="img/ins.png" alt="linkedin"></a>
                <a href="#" class="icon"><img src="img/yt.png" alt="YouTube"></a>
                <a href="#" class="icon"><img src="img/tw.png" alt="twiter"></a>
            </div>
            <h2 class='nl'>Newsletter</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium</p>
            <form action="#">
                <input type="text" class="txt" placeholder="your email address">
                <button class="btn">Subscribe</button>
            </form>
        </div>
        <!-- center of contact colum -->
        <div class="co">
            <h2>Contact</h2>
            <form action="#">
                <input type="text" class="txt" placeholder="your name">
                <input type="text" class="txt" placeholder="your email address">
                <textarea class="tarea" placeholder="message"></textarea>
                <button class="btn">Send it</button>
            </form>
        </div>
        <div class="nu">
            <h2>News Updates</h2>
            <p>
                <img src="img/1.gif" alt="browser"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
                <img src="img/2.gif" alt="browser"> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <p>
                <img src="img/3.gif" alt="browser"> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.
            </p>
            <form action="#">
                <button class="btn">Visite out Blog</button>
            </form>
        </div>
    </div>
    <!-- contact end -->

    <!-- footer start -->
    <div class="footer">
        <div class="w">
            <p class="copyright">Copyright 2010. Studio VIVROCKS. All Rights Reserved.</p>
            <p>Site Powered by Wordpress. Design and Developed by VIVROCKS.</p>
            <p><a href="#">Home</a> | <a href="#">About</a> | <a href="#">Products</a> | <a href="#">Services</a> | <a href="#">Contact</a></p>
            <p><a href="">Privacy Policy</a> | <a href="">Terms of use</a></p>
        </div>
    </div>
    <!-- footer end -->
</body>

</html>
```

### page-index.css

```css
body {
    background-image: url(../img/top-background.png);
    background-repeat: repeat-x;
}

.clearfix::after,
.clearfix::before {
    content: "";
    display: table;
    clear: both;
}


/* fix the height and center position of element */

.w {
    width: 940px;
    margin: 0 auto;
}

.header {
    /* background-color: forestgreen; */
    padding-top: 37px;
    padding-bottom: 46px;
}

.logo {
    margin-left: 15px;
}

.nav {
    float: right;
    margin-top: 22px;
}

.nav li {
    float: left;
    padding: 0 10px 8px;
    border-left: #e6e6e6 dotted 1px;
}

.nav a {
    font: bold 14px Georgia;
    color: #666;
    text-decoration: none;
}

.nav a:hover {
    color: #a1a1a1;
    text-decoration: underline;
}

.nav p {
    font: 11px Tahoma;
    color: #b7b7b7;
}

.banner {
    height: 355px;
    background-image: url(../img/banner/shadow.png);
    background-repeat: no-repeat;
    background-position: bottom center;
    position: relative;
}

.pointer {
    position: absolute;
    top: 314px;
    left: 15px;
}

.pointer a {
    float: left;
    width: 17px;
    height: 17px;
    background-image: url(../img/banner/dot.png);
    margin-left: 4px;
}

.pointer a:hover,
.pointer .selected {
    background-image: url(../img/banner/dot-selected.png);
}

.content h1 {
    text-align: center;
    font: bold 24px Georgia;
    color: black;
    padding: 7px 0 20px 0;
    background-image: url(../img/content/break.png);
    background-repeat: no-repeat;
    background-position: bottom center;
    margin-bottom: 38px;
}


/* three div content in the center */

.content .pl,
.content .cs,
.content .uc,
.contact .sc,
.contact .co,
.contact .nu {
    float: left;
    width: 300px;
}

.content .cs,
.contact .co {
    margin: 0 20px;
}

.content h2 {
    color: #11719e;
    font: bold 21px Georgia;
}

.content .subTitle {
    color: #8c8c8c;
    font: 12px Georgia;
}

.imgDiv {
    background-image: url(../img/content/img-bg.png);
    background-repeat: no-repeat;
    /* background-position:  */
    margin: 16px 0 10px 0;
    text-align: center;
    padding-top: 12px;
}

.contents {
    color: #3e3e3e;
    font: 13px Helvetica;
    height: 92px;
}

.content .learnMore {
    display: block;
    width: 163px;
    height: 40px;
    background-image: url(../img/content/learnMore.png);
    background-repeat: no-repeat;
    color: #016999;
    font: 12px/40px Helvetica;
    text-decoration: none;
    text-indent: 1em;
    margin-bottom: 38px;
}

.contact {
    background-image: url(../img/content/break.png);
    background-repeat: no-repeat;
    background-position: top center;
}

.contact .txt {
    width: 276px;
    height: 33px;
    background-image: url(../img/input.png);
    background-repeat: no-repeat;
    _background-attachment: fixed;
    border: none;
    padding: 0;
    margin: 0px 0px 16px 0px;
    padding: 0 10px;
    line-height: 33px;
}

.contact .tarea {
    width: 276px;
    height: 114px;
    background-image: url(../img/textarea.png);
    background-repeat: no-repeat;
    _background-attachment: fixed;
    border: none;
    resize: none;
    padding: 10px;
    margin: 0;
    overflow: auto;
}

.contact .btn {
    width: 163px;
    height: 32px;
    background-image: url(../img/btn2.png);
    background-repeat: no-repeat;
    border: none;
    padding: 0;
    margin: 0;
    margin-top: 11px;
    margin-bottom: 23px;
    color: white;
    font: 13px georgia;
    text-align: left;
    text-indent: 1em;
    cursor: pointer;
}

.contact h2 {
    color: #444;
    font: 18px/1 georgia;
    border-bottom: 1px dashed #e3e3e3;
    padding: 44px 0 10px 0;
    margin-bottom: 15px;
}

.sc p {
    color: #444;
    font: 12px/1 Helvetica;
}

.sc .ico {
    margin-top: 8px;
    font-size: 0;
}

.sc a {
    margin-right: 6px;
}

.sc .nl {
    font: bold 18px/1 "Gill Sans MT";
    padding: 30px 0 10px;
    /* margin-bottom: 7px; */
}

.sc .txt {
    margin-bottom: 1px;
    margin-top: 15px;
    _margin-top: 16px;
}

.nu img {
    float: left;
    margin-right: 8px;
}

.nu p {
    color: #444;
    font: 12px/1 Helvetica;
    height: 58px;
    _height: 60px;
    border-bottom: 1px dashed #e3e3e3;
    margin-bottom: 14px;
    padding-bottom: 9px;
}


/* For IE6 */

.nu .btn {
    _margin-left: -1em;
}

.nu p:last-of-type {
    margin-bottom: 0px;
}

.footer {
    height: 173px;
    background: #333;
    border-top: #4c4c4c 10px solid;
}

.footer a,
.footer p {
    color: #999;
    font: 11px Helvetica;
    text-decoration: none;
}

.footer a:hover {
    color: #cccaca;
    text-decoration: underline;
}

.footer .copyright {
    float: right;
    /* using one bug to solve double edge of IE6 */
    display: inline;
}

.footer .w {
    padding-top: 18px;
}

.footer p {
    padding-left: 20px;
    padding-right: 23px;
    margin-bottom: 6px;
}
```

### reset.css

```css
/* v2.0 | 20110126
  http://meyerweb.com/eric/tools/css/reset/ 
  License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

## Download

https://www.hongkiat.com/blog/freebie-release-web-template-in-photoshop-psd-polo360/