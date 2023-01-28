---
title: HDU-1280 Front m biggest Numbers
date: 2019-12-16 00:39:40
tags: [Sort, HDU]
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/JgA86f.jpg
description: First sort all the original numbers. And then, add the first m biggest numbers one by one, we get biggest sums of first m * m numbers.
---

# [Front m biggest Numbers](http://acm.hdu.edu.cn/showproblem.php?pid=1280)

Remember the assignment that Gardon assigned to Xiaoxi? (1005 of the last match) Actually Xiaoxi has retrieved the original number sheet. Now she wants to confirm whether her answer is correct, but the entire answer is a huge table. Xiaoxi just wants you to put the answer Tell her the largest number of M's.
Given a sequence containing N (N <= 3000) positive integers, each of which does not exceed 5000, add N * (N-1) / 2 sums obtained by adding them one by one, and find out where the first M is large (M <= 1000) and in ascending order.

<!--more-->

### Input

The input may contain multiple sets of data, each of which consists of two rows:
The first two numbers N and M,
The number N in the second line indicates the sequence.

### Output

For each set of input data, M numbers are output, indicating the result. The output should be in order from largest to smallest.

### Sample Input

```
4 4
1 2 3 4
4 5
5 3 6 4
```

### Sample Output

```
7 6 5 5
11 10 9 9 8
```

# Analysis

First sort all the original numbers. And then, add the first m biggest numbers one by one, we get biggest sums of first m * m numbers. Then sort. Finally out put the first m numbers.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int a[1000000];
int ans[2000000];
int main() {
	int n, m;
	while(cin >> n >> m) {
		for(int i = 0; i < n; i ++) {
			cin >> a[i];
		}
		sort(a, a + n, greater<int>());
		int k = 0;
		for(int i = 0; i < m; i ++) {
			for (int j = i + 1; j < m; j ++) {
				ans[k ++] = a[i] + a[j];
			}
		}
		sort(ans, ans + k, greater<int>());
		for(int i = 0; i < m; i ++) {
			if(i == m - 1)
				cout << ans[i] << endl;
			else cout << ans[i] << " ";
		}
	}
	return 0;
}
```