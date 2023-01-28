---
title: CSS Opacity 透明度解析
date: 2020-04-10 06:05:25
tags: CSS
categories: Web Study
postImage: https://s1.ax1x.com/2020/04/26/Jc1hFK.jpg
---

The followings are some ways of making one element transparent. Since different browser's compatibility is different, we need many ways to write the opacity in order to fit as many as browsers as possible.

<!--more-->

## rgba

`rgba(xxx,xxx,xxx,a)` : This attribute has four parameters and the last one specify the opacity. The value of opacity is can be arbitrary between 0-1.

0 means totally transparent;

1 means not transparent.

0.5 means half trans parent.

## Opacity

Another is directly wrote `opacity: 0.8`. This is the same as the forth parameter of rgba.

This code can fit many but the IE that is lower than version 8.

**But this supports IE6**. However, this effect can't be tested under *IE Tester*.

## Alpha (IE8)

`filter: alpha(opacity=a);`

a is any value between 0 and 100; a represents the degree of opacity.

0 stands for not transparent.

100 stands for not transparent.