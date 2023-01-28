---
title: Usage of string.find()
date:2019-09-02 00:34:38
tags: usage
categories: C++
postImage: https://s1.ax1x.com/2020/04/25/J6kwz8.jpg
---

Every time I use find function in C++ , I always search its usage after using it for so many times. So I decide to make a summary of some commonly used usages.

<!--more-->

## C++ string.find()

Before seeing the usage directly, we need to know a data type **size_type**.

>  Size_type is a type defined by the string class type and the vector class type to hold the length of any string object or vector object. The standard library type defines size_type as unsigned. The abstract meaning of string is a string, the abstract meaning of size() is the size of a string, and the abstract meaning of string::size_type is a unit of size unit.

The followings are the usage.

```
#include <string>
#include <iostream>

using namespace std;

int main(){
    string s;
    string flag;
    char a;
    string::size_type position;
    ...
    return 0;
}
```

### the subscript position of flag in s

```
position = s.find(flag);
if(position != s.npos){
    // the position exists
} else {
    // the position does not exist
}
```

### Subscript position of flag in s start from 3 subscript

```
position = s.find(flag, 3);
```

### First occurrence of the subscript position of character a in s

```
position = s.find_first_of(a);
```

### All locations where a appears in s

```
position = 0;
int i = 1;
while(position = s.find_fisrt_of(a, position)) != string::npos){
    ...
    position ++;
    i ++;
}
```

### Find the position in the flag that does not match the first one of s

```
position = flag.find_first_not_of(s);
```

### Last occurrence of flag in s

```
position = s.rfind(flag)
```

The reason why I use this function is that I came cross a problem on LuoGu [P1533 number reversion](https://www.luogu.org/problem/P1553) and I have another article that solve this problem.