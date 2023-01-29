---
title: HDU-2019 Ordered Sequence
date: 2019-12-20 08:06:46
tags: [HDU, Problem, Sort]
categories: ACM
main: Sort
description: Using C++ Sort.
---

# [Ordered Sequence](http://acm.hdu.edu.cn/showproblem.php?pid=2019)

There are n (n <= 100) integers, which have been arranged in ascending order. Now give another integer x, please insert the number into the sequence and keep the new sequence still ordered.

<!--more-->

### Input

The input data contains multiple test cases. Each set of data consists of two rows, the first row is n and m, and the second row is a sequence of n numbers that have been ordered. n and m are 0 at the same time to mark the end of the input data, this line does not do processing.

### Output

For each test case, output the sequence after inserting the new element.

### Sample Input

```
3 3
1 2 4
0 0
```

### Sample Output

```
1 2 3 4
```

# Analysis

Using C++ Sort.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int arr[1000];
int main() {
	int n, m;
	while(cin >> n >> m, n, m){
		for(int i = 0; i < n; i ++) {
			cin >> arr[i];
		}
		arr[n] = m;
		sort(arr, arr + n + 1);
		for(int i = 0; i <= n; i ++) {
			if(i == n) cout << arr[i] << endl;
			else cout << arr[i] << " ";
		}
	}
	return 0;
}
```