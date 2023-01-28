---
title: CodeForces-1180A Alex and a Rhombus
date: 2019-11-24 09:55:47
tags: [Math, CodeForces]
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/JcuThQ.png
description: This problem has a regular formula. First you count the outermost layer has how many squares. Then the second outermost layer. Until the second smallest layer.
---

<center style="line-height=20px">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/1180/problem/A" one-link-mark="yes">A. Alex and a Rhombus</a><br>
        </font>
        <font size="2">
            time limit per test: 1 second <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

### Problem

While playing with geometric figures Alex has accidentally invented a concept of a n-th order rhombus in a cell grid.

A 1-st order rhombus is just a square 1×1 (i.e just a cell).

A nn-th order rhombus for all n≥2 one obtains from a n−1-th order rhombus adding all cells which have a common side with it to it (look at the picture to understand it better).

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly92ai56MTgwLmNuL2FhZmJmMzk0MjQ0MDExYjdjNTYxNTdiMWEzZGEwMmQ3?x-oss-process=image/format,png)

Alex asks you to compute the number of cells in a n-th order rhombus.

### Input

The first and only input line contains integer nn (1≤n≤100) — order of a rhombus whose numbers of cells should be computed.

### Output

Print exactly one integer — the number of cells in a nn-th order rhombus.

### Examples

#### Input

```
1
```

#### Output

```
1
```

#### Input

```
2
```

#### Output

```
5
```

#### Input

```
3
```

#### Output

```
13
```

### Note

Images of rhombus corresponding to the examples are given in the statement.

# Analysis

This problem has a regular formula. First you count the outermost layer has how many squares. Then the second outermost layer. Until the second smallest layer.

So we add them up. Imagine we have a $n-th$ order rhombus in a cell grid. The $n-th$ rhombus has $n - 1$ layers.

So the total square except the center square is:
$$
(4n-4)+(4(n-1) - 4)+ \cdots +2 \times 4 - 4 \\=4(n-1 + n - 2 + \cdots + 1) \\=2 \times (n-1)n
$$
So the final answer is $2 \times (n - 1)n + 1$ .

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int n;
	cin >> n;
	cout << 2 * n * (n - 1) + 1 << endl;
	return 0;
}
```