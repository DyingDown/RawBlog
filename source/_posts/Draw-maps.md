---
title: Draw maps
date: 2020-02-06 11:03:46
tags: Basemap
categories: Python
postImage: https://s1.ax1x.com/2020/04/26/JcNQne.jpg
description: Before you start to draw maps with python, you first need to install basemap and pyshp.
---

# Preparation

Before you start to draw maps with python, you first need to install `basemap` and `pyshp`. [Click here to see how to install `basemap`](https://dyingdown.github.io/2020/02/05/Install-Basemap-of-Python/) . And the following command to install `pyshp`

```
pip install pyshp --user
```

# Draw maps

Since `basemap` is a plug-in in Python, so we first new a py file.

## World map with coastlines

```python
import matplotlib.pyplot as plot
from mpl_toolkits.basemap import Basemap

plot.figure(figsize=(16,8))
m = Basemap()
m.drawcoastlines()

plot.show()
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAyLzA2LzE2ZzJkQS5wbmc?x-oss-process=image/format,png)

## World map with countries

```python
import matplotlib.pyplot as plot
from mpl_toolkits.basemap import Basemap

plot.figure(figsize=(14,6))
m = Basemap()
m.drawcoastlines()
m.drawcountries(linewidth=1)
                
plot.show()
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAyLzA2LzE2Mmg3OS5wbmc?x-oss-process=image/format,png)

## Chinese map board

```python
import matplotlib.pyplot as plot
from mpl_toolkits.basemap import Basemap

plot.figure(figsize=(14,6))
m = Basemap(
    llcrnrlon=73.55770111084013,
    llcrnrlat=18.159305572509766,
    urcrnrlon=134.773925782502,
    urcrnrlat=53.56085968017586
)
m.drawcoastlines()
m.drawcountries(linewidth=1)

plot.show()
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAyLzA3LzFjODU2Sy5wbmc?x-oss-process=image/format,png)

# Chinese map with province

Download the provinces information here [http://www.diva-gis.org/gdata](http://www.diva-gis.org/gdata)

(Don't forget Taiwan)

```python
import matplotlib.pyplot as plot
from mpl_toolkits.basemap import Basemap
from matplotlib.patches import Polygon

plot.figure(figsize=(14,6))
m = Basemap(
    llcrnrlon=73,
    llcrnrlat=18,
    urcrnrlon=134,
    urcrnrlat=53
)
m.drawcoastlines()
m.drawcountries(linewidth=1)

m.readshapefile(r'CHN_adm/CHN_adm1', 'states', drawbounds=True)
m.readshapefile(r'TWN_adm/TWN_adm1', 'states', drawbounds=True)

ax = plot.gca()

plot.show
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAyLzEwLzE0UEozRC5wbmc?x-oss-process=image/format,png)

Well... It looks not so good.

It can be modified...

# Chinese map with province (modified)

```python
import matplotlib.pyplot as plot
from mpl_toolkits.basemap import Basemap
from matplotlib.patches import Polygon

plot.figure(figsize=(14,6))
m = Basemap(
    llcrnrlon=77,
    llcrnrlat=14,
    urcrnrlon=140,
    urcrnrlat=51,
    projection='lcc', 
    lat_1=33, 
    lat_2=45, 
    lon_0=100
)

m.readshapefile(r'CHN_adm/CHN_adm1', 'states', drawbounds=True)
m.readshapefile(r'TWN_adm/TWN_adm1', 'states', drawbounds=True)

ax = plot.gca()

plot.show() 
```

Better. 

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAyLzEzLzFxN3V6NC5wbmc?x-oss-process=image/format,png)

Next, we are going to color the map to make it more beautiful!

[https://dyingdown.github.io/2020/02/13/Draw-map-with-Color/](https://dyingdown.github.io/2020/02/13/Draw-map-with-Color/)

