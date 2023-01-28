---
title: JS project with code
date: 2019-09-03 10:24:32
tags: Project
categories: JavaScript
---

The code of the bouncing all and more projects.

<!--MORE-->

![img](https://s2.ax1x.com/2019/09/03/nkjMRJ.gif)

```javascript
/* drawing a bouncing ball */

var t = 0;
var a = 0.01;
var y = 0;
var v = 38;
var x = 0;

draw= function() {
    background(214, 254, 255);
    noStroke();
    fill(255, 255, 255);
    rect(0,228,400,202);
    
    v = -a*t+4;
    y = -a*t*t+v*t;
    
    /*shadow*/
    fill(200+0.1*y, 200+0.1*y, 200+0.1*y);
    ellipse(x,300,50+0.3*y,10);
    
    /*ball*/
    fill(0, 0, 0);
    ellipse(x,274-y,50,50);
    
    if (v<0) {
        a=-0.02-t;
    }
    if (y<0) {
        t=0;
        a+=0.002;
    }
    
    t+=5;
    x+=2;
    
    if (a<0) {
        y=0;
    }
    if (x > 450) {
        y=0;
        x=0;
        a=0.01;
        v=38;
        t=0;
    }
};
```

This is a cute picture I’ve seen somewhere. It’s so lovely so I drew it using JavaScript.

![img](https://s2.ax1x.com/2019/09/03/nACG1U.png)

```javascript
background(209, 255, 255);
var drawCuty = function() {
    var x = 148;
    var y = 170*x/140;
    var w = 130*x/140;
    var h = 50*x/140;
    var a = x*30/140;

    /*the first layer*/
    strokeWeight(6*x/140);
    stroke(59, 12, 12);
    arc(x+1, y+h/2, h, h, -272, -90);//left curve
    arc(x+w, y+h/2, h, h, -121, 90);//right curve
    noStroke();
    rect(x, y, w, h);//to make the bottom layer full
    stroke(59, 12, 12);
    line(x, y+h, x+w, y+h);

    /*the second layer*/
    noStroke();
    quad(x+a, y-h*10/13, x+w-a, y-h*10/13, x+w, y, x, y);//to make the second layer full
    stroke(59, 12, 12);
    arc(x*54/52+a/2, y-h*5/13, h, h, -228, -85);//left curve
    arc(x*51/53+w-a/2, y-h*5/13, h, h, -86, 47);//right curve

    /*the top layer*/
    noStroke();
    fill(255, 255, 255);
    quad(x+a, y-h*6/4, x+w-a, y-h*6/4, x+w-a/2, y-h*5/13, x+a/2, y-h*5/13);//to fill the third layer
    stroke(59, 12, 12);
    arc(x+a, y-h*(6/4-7/20), h/2, h*14/20, 124, 270);//left curve
    arc(x+w-a, y-h*(6/4-7/20), h/2, h*14/20, -75, 47);//right curve
    fill(255, 255, 255);
    beginShape();
    curveVertex(-127*x/140, 197*y/170);
    curveVertex(x+a, y-h*6/4);
    curveVertex(x+(w-a), y-h*6/4);
    curveVertex(616*x/140, 500*y/170);
    endShape();//the most top 
    
    /*eyes*/
    fill(59, 12, 12);
    ellipse(x+a, y*175/170, x/14, x/14);//left eye
    ellipse(x+w-a,175*y/170, x/14, x/14);//right eye

    /*mouse*/
    noFill();
    strokeWeight(4*x/140);
    arc(x+w/2, 175*y/170, x/10, x/10, 10, 180);

    /*the red face*/
    strokeWeight(x/14);
    stroke(250, 187, 223);
    line(x+18*x/140, y+h/2, x+24*x/140, y+h/2);
    line(x+w-18*x/140, y+h/2, x+w-24*x/140, y+h/2);
};
drawCuty();
```

And a design using this picture:

![img](https://s2.ax1x.com/2019/10/27/Ksghkj.png)

![img](https://s2.ax1x.com/2019/10/27/Ks2S91.gif)