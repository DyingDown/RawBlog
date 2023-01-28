---
title: HDU-2020 Absolute Sort
date: 2019-12-20 07:35:04
tags: [HDU, Problem, Sort]
categories: ACM
description: Turn then into positive numbers and sort. And for each unit in array, if it’s negative originally, turn it back to negative.
---

# [Absolute Sort](http://acm.hdu.edu.cn/showproblem.php?pid=2020)

Input n (n <= 100) integers, and output them after sorting according to the absolute value. The title guarantees that for each test case, the absolute values of all numbers are not equal.

<!--more-->

### Input

There are multiple groups of input data. Each group occupies one line. The first number of each line is n, followed by n integers. N = 0 means the end of the input data. No processing is performed.

### Output

For each test instance, the sorted results are output, separated by a space between the two numbers. One line per test instance.

### Sample Input

```
3 3 -4 2
4 0 1 2 -3
0
```

### Sample Output

```
-4 3 2
-3 2 1 0
```

# Analysis

Turn then into positive numbers and sort. And for each unit in array, if it's negative originally, turn it back to negative.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

map<int,int> a;
int arr[1000];
int main() {
	int n;
	while(cin >> n, n){
		for(int i = 0; i < n; i ++) {
			cin >> arr[i];
			if(arr[i] >= 0) a[abs(arr[i])] = 0;
			else a[abs(arr[i])] = 1;
			arr[i] = abs(arr[i]);
		}
		sort(arr, arr + n, greater<int>());
		for(int i = 0; i < n; i ++) {
			if(a[arr[i]]) cout << '-' << arr[i];
			else cout << arr[i];
			if(i != n - 1) cout << " ";
			else cout << endl;
		}
	}
	return 0;
}
```