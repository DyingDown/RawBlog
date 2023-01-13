---
title: Add Comments
date: 2019-08-15 14:23:24
tags: comment
categories: Blog
warning: true
---

Because of my first theme was so incomplete that I need to add many features myself. So I’ve looked for how to add comment system on the blog.

<!--more-->

By asking many friends and searching, I first used gitment. When I finally make it work which is initial the comment, I found that the gitment is no longer served. So I changed to disqus but I can’t make it work because it has the code in ejs but my theme is written in jade. I don’t know how to exactly change ejs to jade, so I change my theme again. And Finally, I used [LiveRe](https://dyingdown.github.io/2019/08/15/Add-Comments/[https://www.livere.com](https://www.livere.com/)).

First register. And click install.

![img](https://s2.ax1x.com/2019/08/15/mVf9Z8.png)

Choose the free version and install. Fill the blanks.

![img](https://s2.ax1x.com/2019/08/15/mVf1JJ.png)

My LiveRe name is arbitrary and the site URL is your blog URL. And you can choose SNS.

Then you will get a piece of code. Like this:

```
<!-- LiveRe City install code -->
<div id="lv-container" data-id="city" data-uid="MTAyMC80NTk3NS8yMjQ4Ng==">
<script type="text/javascript">
   (function(d, s) {
       var j, e = d.getElementsByTagName(s)[0];

       if (typeof LivereTower === 'function') { return; }

       j = d.createElement(s);
       j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
       j.async = true;

       e.parentNode.insertBefore(j, e);
   })(document, 'script');
</script>
<noscript>Please activate JavaScript for write a comment in LiveRe</noscript>
</div>
<!-- completed City install code -->
```

Then place your code in a certain place of your blog setting files. Usually you just need to change your original blog’s comment code.