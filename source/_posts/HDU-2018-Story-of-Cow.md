---
title: HDU-2018 Story of Cow
date: 2019-12-20 09:26:05
tags: [Brute Force, HDU, Regular Pattern]
categories: ACM
description: Let's stimulate the situation by ourselves first.
---

# [Story of Cow](http://acm.hdu.edu.cn/showproblem.php?pid=2018)

There is a cow that gives birth to a heifer at the beginning of each year. Each heifer starts in the fourth year and a heifer is born at the beginning of each year. Please program how many cows will there be in year n?

<!--more-->

### Input

The input data consists of multiple test cases, each test case occupies one line, including an integer n (0 <n <55), the meaning of n is as described in the title.
n = 0 means the end of the input data, no processing.

### Output

For each test case, the number of cows at year n is output.
One line per output.

### Sample Input

```
2
4
5
0
```

### Sample Output

```
2
4
6
```

# Analysis

Let's stimulate the situation by ourselves first.

|  Year  |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |  10  |
| :----: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| Number |  1   |  2   |  3   |  4   |  6   |  9   |  13  |  19  |  28  |  41  |

We can draw a conclusion that:
$$
cow[i] = cow[i - 3] + cow[i - 1] \space \space\space \space\space \space (i>3)
$$

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

long long arr[1000];
int main() {
	arr[1] = 1; arr[2] = 2; arr[3] = 3;
	for(int i = 4; i <= 55; i ++) {
		arr[i] = arr[i - 1] + arr[i - 3];
	}
	int n;
	while(cin >> n, n) {
		cout << arr[n] << endl;
	}
	return 0;
}

```