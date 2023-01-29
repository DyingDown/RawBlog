---
title: HDU-1555 How many days?
date: 2019-12-18 09:56:23
tags: [Simulation, HDU]
categories: ACM
main: Simulation
postImage: https://s1.ax1x.com/2020/04/26/JgAt0g.jpg
description: This is just stimulation. At first I think the answer was m + m / k . However, I didn't think of that there may be given more than k days more.
---

# [How many days?](http://acm.hdu.edu.cn/showproblem.php?pid=1555)

The 8600's mobile phone consumes 1 yuan per day, and every K yuan spent will receive 1 yuan. At the beginning, 8600 has M yuan. How many days can I use?

<!--more-->

### Input

The input includes multiple test instances. Each test instance includes two integers M, k, (2 <= k <= M <= 1000). M = 0, k = 0 represents the end of the input.

### Output

An integer is output for each test instance, which indicates the number of days that M yuan can be used.

### Sample Input

```
2 2
4 3
0 0
```

### Sample Output

```
3
5
```

# Analysis

This is just stimulation. At first I think the answer was $m + m \div k$ . However, I didn't think of that there may be given more than k days more.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int m, k;
	while(cin >> m >> k, m, k) {
		int count = 0, ik = 0;
		while(m) {
			m --;
			ik ++;
			if(ik % k == 0) {
				m += 1;
				ik = 0;
			}
			count ++;
		} 
		cout << count << endl;
	}
	return 0;
}
```