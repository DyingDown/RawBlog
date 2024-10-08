---
title: How to center dropdown sub-menu to parent using CSS
date: 2024-10-08 17:57:19
tags: [Dropdown, Sub-menu, CSS, Stylus, Center-Align]
categories: CSS
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410081928607.png
description: I want the center of the dropdown menu aligns with the center of the parent menu item. Using css (stylus). But the width of the dropdown menu is not fixed, the width of the submenu items is dynamic, meaning it can change based on the content inside.
warning: false
isCarousel: false

---

## Problem Description

I want the center of the dropdown menu aligns with the center of the parent menu item. Using css (stylus). But the width of the dropdown menu is not fixed, the width of the submenu items is dynamic, meaning it can change based on the content inside.

But now it looks like this:

![preview of current styles](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410081930790.png)

![another preview of current style](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410081932820.png)

It should look like this:

![what it should look like](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410081932911.png)

The structure of my html is as follows:

```html
<ul id="nav">
    <div class="menu-items">
        <li class="item-name"><a class="name-a" href="/" one-link-mark="yes"><i class="fas fa-home"></i> Home</a></li>
        <li class="item-name"><a class="name-a" href="/null" one-link-mark="yes"><i class="fas fa-list"></i> Lab</a>
            <ul class="submenu-items">
                <li class="subitem-name"><a href="/art" one-link-mark="yes"><i class="fas fa-palette"></i> This is a long name</a></li>
                <li class="subitem-name"><a href="/" one-link-mark="yes"><i class="fas fa-chart-bar"></i>
                        ThisIsALongName</a></li>
            </ul>
        </li>
        <li class="item-name"><a class="name-a" href="/archives" one-link-mark="yes"><i class="fas fa-archive"></i> Archives</a></li>
        <li class="item-name"><a class="name-a" href="/tags" one-link-mark="yes"><i class="fas fa-tag"></i> Tag</a></li>
    </div>
</ul>
```

And the css is the following:

```stylus
.menu #nav
    overflow: visible
.menu #nav .menu-items .item-name:hover > .submenu-items
    display inline-block;
.submenu-items
    position: absolute
    display none;
    left: 0
    top: 66px;
    background-color: $headerSubBg;
    padding: 5px 15px;
    border-radius: 10px;
    -webkit-animation fadeInUp .3s .1s ease both;
    -moz-animation fadeInUp .3s .1s ease both
    z-index: 2   
    white-space: nowrap
    width: max-content
    .subitem-name
        width 100% !important
        padding: 10px 0 !important
        display: block
        margin: 0 !important
        line-height: 20px !important
        a
            line-height 25px !important
        &:hover a
            color: $headerHv !important

body.post > #menu-outer .submenu-items
    background-color: $headerPostBg
    border: solid lightgray 1px
    -webkit-box-shadow: 1px 0 5px rgb(175 175 175);
    box-shadow: 1px 0 5px rgb(175 175 175);

.submenu-items::before
    content: ""
    position absolute
    width: 0
    height: 0
    border: 15px solid transparent
    border-bottom-color: $headerSubBg
    left: 0
    right: 0
    top: -28px
    margin: auto
    z-index 100
body.post > #menu-outer .submenu-items::before
    border-bottom-color: $headerPostBg
    z-index: 0
body.post > #menu-outer .submenu-items::after
    content: ""
    position absolute
    width: 0
    height: 0
    border: 15px solid transparent
    border-bottom-color: lightgray
    left: 0
    right: 0
    top: -29px
    margin: auto
    z-index -10
    transform-style: preserve-3d;
    transform:translateZ(-10px);
```

## Solution

### Normal Solution

```stylus
.item-name {
    position: relative;
}
.submenu-items {
    // ......
    position: absolute
    left: 50%;
    transform: translateX(-50%);
    // ...
}
```

This is the solution I found. However, the `transform` is not working at all. I'm not sure why.

 I've checked the developer tool console, the style is showed correctly and is not crossed by other styles. So,  I comment each styles assigned to the `.submenu-items`, to see if transform is effected by other styles.

Finally I found this of what I wrote:

```stylus
 @-webkit-keyframes fadeInUp 
    0%
    	opacity:0;
        -webkit-transform:translateY(10px)
    100%
        opacity:1;
        -webkit-transform:translateY(0)
```

**So the animation with the transfrom can not be used with the transform together.**

### Final solution for me

``` stylus
 @-webkit-keyframes fadeInUp 
    0%
        opacity:0;
        -webkit-transform:translateY(10px)  translateX(-50%)
    100%
        opacity:1;
        -webkit-transform:translateY(0) translateX(-50%)
```

Add these to my animation and keep other things same.