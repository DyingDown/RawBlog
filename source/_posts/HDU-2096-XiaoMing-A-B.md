---
title: HDU-2096 XiaoMing A+B
date: 2019-12-19 13:49:00
tags: [HDU, Problem]
categories: ACM
description: a and b each mod 100 and the answer a + b mod 100
---

# [XiaoMing A+B](http://acm.hdu.edu.cn/showproblem.php?pid=2096)

Xiaoming is 3 years old, and now he can recognize non-negative integers up to 100, and can add non-negative integers up to 100.
For integers greater than or equal to 100, Xiaoming retains only the last two digits of the number for calculation.If the calculation result is greater than or equal to 100, then Xiaoming also retains only the last two digits of the calculation result.

<!--more-->

For example, for Xiao Ming:
1) 1234 and 34 are equal
2) 35 + 80 = 15

Given the non-negative integers A and B, your task is to calculate the value of A + B on behalf of Xiao Ming.

### Input

The first line of the input data is a positive integer T, which represents the number of test data groups. Then there are T groups of test data. Each group of test data contains two non-negative integers A and B (A and B are in the range represented by int type) Inside).

### Output

For each set of test data, output the result of Xiaoming A + B.

#### Sample Input

```
2
35 80
15 1152
```

#### Sample Output

```
15
67
```

# Analysis

a and b each mod 100 and the answer a + b mod 100

# code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int t;
	cin >> t;
	while(t --) {
		int a, b;
		cin >> a >> b;
		a %= 100; b %= 100;
		cout << (a + b) % 100 << endl;
	}
	return 0;
}
```