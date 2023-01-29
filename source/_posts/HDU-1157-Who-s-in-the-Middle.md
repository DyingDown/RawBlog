---
title: HDU-1157 Who's in the Middle
date: 2019-12-15 14:16:23
tags: [Sort, HDU]
categories: ACM
main: Sort
postImage: https://s1.ax1x.com/2020/04/26/JgAnTH.jpg
description: Just sort all the numbers, since the input numbers are odds, so the middle number is n / 2 + 1
---

# [Who's in the Middle]()

### Problem Description

FJ is surveying his herd to find the most average cow. He wants to know how much milk this 'median' cow gives: half of the cows give as much or more than the median; half give as much or less.

Given an odd number of cows N (1 <= N < 10,000) and their milk output (1..1,000,000), find the median amount of milk given such that at least half the cows give the same amount of milk or more and at least half give the same or less.

### Input

\* Line 1: A single integer N

\* Lines 2..N+1: Each line contains a single integer that is the milk output of one cow.

### Output

\* Line 1: A single integer that is the median milk output.

### Sample Input

```
5
2
4
1
3
5
```

### Sample Output

```
3
```

# Analysis

Just sort all the numbers, since the input numbers are odds, so the middle number is n / 2 + 1.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int a[2000000];
int main() {
	int n;
	while(cin >> n){
		for(int i = 0; i < n; i ++) {
			cin >> a[i];
		}
		sort(a, a + n);
		cout << a[n / 2] << endl;
	}
}
```

