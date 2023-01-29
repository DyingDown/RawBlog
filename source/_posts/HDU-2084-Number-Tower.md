---
title: HDU-2084 Number Tower
date: 2019-12-20 06:50:56
tags: [HDU, Problem, Other]
categories: ACM
main: Other
description: "As you can easily see, for each point tower[i][j] , it has two parent points, 
warning..."
---

# [Number Tower](http://acm.hdu.edu.cn/showproblem.php?pid=2084)

When describing the DP algorithm, a classic example is the number tower problem, which is described as follows:

There are counting towers as shown below. It is required to walk from the top to the bottom. If each step can only go to adjacent nodes, what is the maximum number of nodes that pass by?

<!--more-->

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly92ai56MTgwLmNuLzc5YjY1MDkyNzM0ZDZhMjYzYTkyODBmNWIzMzJjNWI5?x-oss-process=image/format,png)

I have already told you that this is a DP topic. Can you AC?

### Input

The input data first includes an integer C, which represents the number of test instances. The first line of each test instance is an integer N (1 <= N <= 100), which represents the height of the number tower, and is then represented by N rows of numbers. Number tower, where there are i integers in the i-th row, and all integers are in the interval [0,99].

### Output

For each test instance, the maximum possible output is obtained, and the output for each instance is on one line.

### Sample Input

```
1
5
7
3 8
8 1 0 
2 7 4 4
4 5 2 6 5
```

### Sample Output

```
30
```

# Analysis

This is an very easy task. As you can easily see, for each point $tower[i][j]$ , it has two parent points, $tower[i - 1][j - 1]$ and $tower[i - 1][j]$. The longest path from the root point to the current points is directly base on his parent point.

So you store the length of the path from the first point to the current point in the current point's position. So how to choose the longest path?

Since it's parents status has changed into the total length, this point's status should be the biggest parent of the two plus this points original status.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int tower[200][200];
int main() {
	memset(tower, 0, sizeof(tower));
	int t, n;
	cin >> t;
	while(t --) {
		cin >> n;
		for(int i = 1; i <= n; i ++) {
			for(int j = 1; j <= i; j ++) {
				cin >> tower[i][j];
			}
		}
		for(int i = 1; i <= n; i ++) {
			for(int j = 1;j <= i; j ++) {
				tower[i][j] += max(tower[i - 1][j - 1], tower[i - 1][j]);
			}
		}
		int maxn = 0;
		for(int i = 1; i <= n; i ++) {
			maxn = max(maxn, tower[n][i]);
		}
		cout << maxn << endl;
	}
	return 0;
}
```