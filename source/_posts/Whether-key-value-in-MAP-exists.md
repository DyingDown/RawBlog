---
title: Whether key value in MAP exists
date: 2020-09-03 08:03:36
tags: usage
categories: C++
postImage: https://s1.ax1x.com/2020/09/03/wPY4aR.jpg
---

Normally, if I want to find whether the key exists in map STL(C++), the first thing come up to my mind is `if(map1[key1])`. However, this is wrong, because if there is no key equals to `key1`, `map1[key1]` will return 0 and if there is a `key1` but its value is `0`, then it will also return 0; So this method is not feasible.

<!--more-->

There are generally two ways to determine whether the key exists in map.

## Find function

find function returns an iterator.

```c++
map<int, int> test;

if(test.find(key) == test.end()) {
    // the key doesn't exists
}
```

## Count Function

```c++
if(test.count(key) == 0) {
	// the key doesn't exists
}
```