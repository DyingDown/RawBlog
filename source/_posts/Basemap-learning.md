---
title: Basemap learning
date: 2020-02-15 05:12:44
tags: [Knowledge points, Basemap]
categories: Python
postImage: https://s1.ax1x.com/2020/04/26/Jc14JO.png
---

Since I have already introduced `Basemap` and how to install , I’ll start it directly.

<!--more-->

## Basic map

First `import` libraries for drawing maps.

```python
import matplotlib.pyplot as plot 
from mpl_toolkits.basemap import Basemap
```

And then create a `basemap` project.

```python
map = Basemap(
    projection='ortho', # there a many other projections
    lat_0 = 0, # latitude
    lon_0 = 0 # longitude
)
```

(for more projections, visit https://matplotlib.org/basemap/users/mapsetup.html)

Draw the map.

```python
# draw the outlines of the projection and fill it with color
map.drawmapboundary(fill_color="aqua")
# fill the continents with color
# color stands for continent color, lake_color is the lake color
map.fillcontinents(color="green",lake_color="aqua")
# draw the costlines
map.drawcoastlines()
```

Show the map.

```python
plot.savefig('map.png') # save a picture
plot.show() # start a console to draw the map
```

So the complete code would be this:

```python
import matplotlib.pyplot as plot 
from mpl_toolkits.basemap import Basemap

map = Basemap(
    projection='ortho',
    lat_0 = 0, 
    lon_0 = 0
)

map.drawmapboundary(fill_color="aqua")
map.fillcontinents(color="green",lake_color="aqua") 
map.drawcoastlines()


plot.savefig('test.png')
plot.show()
```

![img](https://s2.ax1x.com/2020/02/15/1xYNlD.png)