---
title: Budget HDU-6575
date: 2019-11-11 13:20:11
tags: [HDU, Problem, Logic]
categories: ACM
main: Logic
description: This is a rounding problem. Since it has only three number after the point, you just need to find the last number n and if it's more than four...
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051739956.jpg
---

# [Budget](http://acm.hdu.edu.cn/showproblem.php?pid=6575)

### Problem

Avin’s company has many ongoing projects with different budgets. His company records the budgets using numbers rounded to 3 digits after the decimal place. However, the company is updating the system and all budgets will be rounded to 2 digits after the decimal place. For example, 1.004 will be rounded down
to 1.00 while 1.995 will be rounded up to 2.00. Avin wants to know the difference of the total budget caused by the update.

### Input

The first line contains an integer n (1 ≤ n ≤ 1, 000). The second line contains n decimals, and the i-th decimal ai (0 ≤ ai ≤ 1e18) represents the budget of the i -th project. All decimals are rounded to 3 digits.

### Output

Print the difference rounded to 3 digits..

### Sample Input

```
1
1.001
1
0.999
2
1.001 0.999
```

### Sample Output

```
-0.001
0.001
0.000
```

# Analysis

This is a rounding problem. Since it has only three number after the point, you just need to find the last number $n$ and if it's more than four, the company over calculate it's money by $10-n$ , if it's equal or less than four, the company miss calculate the money by $n$. So the total difference is the over calculated money - the miss calculated money.

**Note: you better not to calculating the floating number many times because there might be a precision problem.** At first I time all the number to 1e2, let the computer automatically do the rounding for me. However there is always a precision problem and I don't know how to fix. So I changed the way.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;
int main() {
	int n;
	cin >> n;
	int sum = 0;
	for(int i = 0; i < n;i ++){
		string a;
		cin >> a;
		int l = a.length();
		if(a[l - 1] - '0' < 5 ) // miss calculated
			sum -= a[l - 1] - '0';
		else sum += (10 - (a[l - 1] - '0')); // over calculated
	}
	printf("%.3f\n", sum * 1.0 / 1000);
	return 0;
}
```