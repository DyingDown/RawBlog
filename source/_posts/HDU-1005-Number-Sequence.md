---
title: HDU-1005 Number Sequence
date: 2019-12-19 04:51:20
tags: [Force, HDU]
categories: ACM
main: Force
postImage: https://s1.ax1x.com/2020/04/26/JgASw4.jpg
description: This problem seems like a very huge problem, however, the answers have some certain regular pattern.
---

# [Number Sequence](http://acm.hdu.edu.cn/showproblem.php?pid=1005)

A number sequence is defined as follows:

f(1) = 1, f(2) = 1, f(n) = (A * f(n - 1) + B * f(n - 2)) mod 7.

Given A, B, and n, you are to calculate the value of f(n).

### Input

The input consists of multiple test cases. Each test case contains 3 integers A, B and n on a single line (1 <= A, B <= 1000, 1 <= n <= 100,000,000). Three zeros signal the end of input and this test case is not to be processed.

### Output

For each test case, print the value of f(n) on a single line.

### Sample Input

```
1 1 3
1 2 10
0 0 0
```

### Sample Output

```
2
5
```

# Analysis

This problem seems like a very huge problem, however, the answers have some certain regular pattern. For $f[n]$, it's consisted of a basic number array. That means after a certain number of numbers, the numbers will be the same as begin. Like $1, 2, 5, 6, 1, 2, 5, 6, 1, 2, 5, 6 \cdots$. So just loop to find the recycle number.

# Code

Not that if you don't define boarder for i, it will be time limit exceeded. And the biggest recycled number is no bigger than 49.

```c++
#include<bits/stdc++.h>

using namespace std;

int f[100];
int main() {
	int a, b, n;
	while(cin >> a >> b >> n, a, b, n) {
		f[1] = f[2] = 1;
		int i = 3;
		for(; i < 50; i ++) {
			f[i] = (a * f[i - 1] + b * f[i - 2]) % 7;
			if(f[i - 1] == 1 and f[i] == 1) {
				break;
			}
		}
		f[0] = f[i - 2];
		cout << f[n % (i - 2)] << endl;
	}
	return 0;
}
```