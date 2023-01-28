---
title: CSS 高度塌陷 Height crash
date: 2020-04-09 10:18:16
tags: CSS
categories: Web Study
postImage: https://s1.ax1x.com/2020/04/26/Jc1Rdx.png
---

Environment: When you set float to an element, and it's parent's width or height follows the element's width or height. Then, the parent will lose its width or height and it's called height crash. Here are some solutions.

<!--more-->

## Fixed height

Set the height of the parent to a fixed number. This will work but, when the child element changed, the parent element won't change. So this solutions works but a good one.

## BFC

According to the Standard of **W3C**, every element in the page has a hidden attribute called **BFC**, short for **Block Formatting Context**. This attribute is off by default.

### Attributes when BFS is on

1. Vertical margin of parent item won't overlap with child item
2. BFC-on element won't be covered by float element
3. BFC-on element can contain float child element

### How to open BFC

1. Set float to parent item

   This way will make the parent item lose its width, and  following item will still move

2. Set absolute position for parent item

   The same as the first one

3. Set `inline-block` for item

   Also lose width

4. Set the value of `overflow` to a non-visible value

   **This works!**

## Overflow

```css
overflow: hidden;
overflow: auto;
```

If there is a relative positioned item in the parent element and the item is out of the range, you won't be able to see it.

In IE6 or lower, the browser doesn't support BFC, it has an attribute call **hasLayout**, familiar to BFC.

## Zoom (IE6)

```css
/* IE6 */
zoom: 1;
```

Zoom means enlarge the element. Value 1 means the element is the same size as before.

Use this way to enable hasLayout.

## Set width

Set width to a certain value for the parent element.

## Blank element

1. Add a blank div at the bottom of the parent element. Clear float of the blank div.

Since this element is not float, the parent height will be stretched. 

Basically has no side effect.

```html
	<style>
    .clear {
        clear: both;
    }
</style>
<div class="box1">
    <div class="box2"></div>
    <div class="clear"></div>
</div>
```

However, this will add redundant struct in page. So this is not recommended.

2.  Add a Pseudo Class `:after`

```html
.clearfix:after {
    /* add content */
    content: "";
    /* change into a block element */
    display: block;
    /* clear float on both side */
    clear: both;
}
<div class="box1 clearfix">
    <div class="box2"></div>
</div>
```

In IE6, `:after` is not supported, so we still need `zoom`.

```css
.clearfix {
    zoom: 1;
}
```