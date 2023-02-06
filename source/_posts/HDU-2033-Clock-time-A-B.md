---
title: HDU-2033 Clock time A+B
date: 2019-12-20 03:01:16
tags: [HDU, Problem, Simulation]
categories: ACM
main: Simulation
description: Just stimulate the rule of clock time addition.
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051750997.png
---

# [Clock time A + B](http://acm.hdu.edu.cn/showproblem.php?pid=2033) 

There are already 10 A + B questions on HDOJ. I believe these questions were once everyone ’s favorite. I hope that this A + B today will bring good luck to everyone. I also hope that this question will evoke everyone's concerns about ACM Love.

<!--more-->

A and B in this topic are not simple integers, but two times. A and B are composed of 3 integers, which represent hours, minutes, and seconds. For example, if A is 34 45 56, it means that the time represented by A is 34 hours, 45 minutes, and 56 seconds.

### Input

The input data consists of multiple lines. First is an integer N, which represents the number of test instances, and then N rows of data. Each line has 6 integers AH, AM, AS, BH, BM, BS, which represent the times A and B, respectively. The corresponding hour, minute, and second. The title guarantees that all data is legal.

### Output

For each test instance, output A + B. Each output result is also composed of 3 hours, minutes, and seconds. At the same time, the rules of time must be met (that is, the range of minutes and seconds is 0 ~ 59). One line, and all parts can be represented by 32-bit integers.

### Sample Input

```
2
1 2 3 4 5 6
34 45 56 12 23 34
```

### Sample Output

```
5 7 9
47 9 30
```

# Analysis 

Just stimulate the rule of clock time addition.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int t;
	cin >> t;
	int a[3], b[3], c[3];
	while(t --) {
		for(int i = 0; i < 3; i ++) cin >> a[i];
		for(int i = 0; i < 3; i ++) {
			cin >> b[i];
			c[i] = a[i] + b[i];
		} 
		for(int i = 2; i >= 1; i --) {
			c[i - 1] += c[i] / 60;
			c[i] %= 60;
		}
		cout << c[0] << " " << c[1] << " " << c[2] << endl;
	}
	return 0;
}
```