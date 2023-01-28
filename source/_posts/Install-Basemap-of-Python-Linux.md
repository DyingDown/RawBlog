---
title: Install Basemap of Python(Linux)
date: 2020-02-05 15:03:58
tags: Install
categories: Python
---

`Basemap` is a plug-in of `matplotlib`. `Matplotlib` is a drawing library that helps to draw data in multiple ways using python. And `Basemap` is used to draw maps. The followings are steps to install `basemap`.

<!--more-->

```
→ yay basemap
2 community/python-basemap-common 1.2.1-3 (76.5 MiB 186.2 MiB) 
    Data files for python-basemap
1 community/python-basemap 1.2.1-3 (132.6 KiB 806.8 KiB) 
    Toolkit for plotting data on map projections
==> Packages to install (eg: 1 2 3, 1-3 or ^4)
==> 1
```

You choose 1 and it will automatically install 2 for you.

I use this to draw maps, so I also installed `Matplotlib` and `NumPy`

```
→ pip install matplotlib --user
```

All the other dependencies you see in it's website, installing basemap will automatically install them.