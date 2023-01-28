---
title: Draw map with Color
date: 2020-02-13 06:14:32
tags: Basemap
categories: Python
postImage: https://s1.ax1x.com/2020/04/26/Jc1TQH.jpg
---

Last article, we learned how to draw a uncolored map with python. Now, we are going to fill our country with beautiful colors.

<!--more-->

# Unified Color

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
ax = plot.gca()
for nshape, seg in enumerate(m.states):
    poly = Polygon(seg, facecolor='DeepSkyBlue')
    ax.add_patch(poly)

m.readshapefile(r'TWN_adm/TWN_adm1', 'states', drawbounds=True)
ax = plot.gca()
for nshape, seg in enumerate(m.states):
    poly = Polygon(seg, facecolor='DeepSkyBlue')
    ax.add_patch(poly)

plot.show()
```

![在这里插入图片描述](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAyLzEzLzFxTzlESC5wbmc?x-oss-process=image/format,png)

# China population graph

For further use, It will also use `pandas` , so install it.

```
pip install pandas --user
```

And here is the population data [http://www.stats.gov.cn/tjsj/pcsj/rkpc/6rp/indexce.htm](http://www.stats.gov.cn/tjsj/pcsj/rkpc/6rp/indexce.htm)

After download it, modify the file until it looks like this:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213224113630.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lhb29fbw==,size_16,color_FFFFFF,t_70)

**The most important thing is that don't forget to delete the space between province names!!!!** This is important because I stuck because of this for a day.

```python
import matplotlib.pyplot as plot
from mpl_toolkits.basemap import Basemap
from matplotlib.patches import Polygon
from matplotlib.colors import rgb2hex
import pandas as pd
import numpy as np

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

m.readshapefile(r'../CHN_adm/CHN_adm1', 'states', drawbounds=True)

df = pd.read_excel(r'../A0101a.xls')
df['省名'] = df.地区.str[:2]
df.set_index('省名', inplace=True)
statenames=[]
colors={}
cmap = plot.cm.Blues
vmax = 100000000
vmin = 3000000
for shapedict in m.states_info:
    statename = shapedict['NL_NAME_1']
    p = statename.split('|')
    if len(p) > 1:
        s = p[1]
    else:
        s = p[0]
    s = s[:2]
    if s == '黑龍':
        s = '黑龙'
    statenames.append(s)

    # print(df['人口数'])
    pop = df['人口数'][s]
    colors[s] = cmap(np.sqrt((pop - vmin) / (vmax - vmin)))[:3]

ax = plot.gca()
for nshape, seg in enumerate(m.states):
    color = rgb2hex(colors[statenames[nshape]])
    poly = Polygon(seg, facecolor=color, edgecolor=color)
    ax.add_patch(poly)

plot.show()
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213224347627.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lhb29fbw==,size_16,color_FFFFFF,t_70)

Sooooooooooo beautiful！！！