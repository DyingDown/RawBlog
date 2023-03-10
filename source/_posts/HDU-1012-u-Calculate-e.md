---
title: HDU-1012 u Calculate e
date: 2019-12-14 18:04:32
tags: [Other, HDU]
categories: ACM
main: Other
postImage: https://s1.ax1x.com/2020/04/26/JgAPYR.jpg
description: The range of the number is very small, only 0 to 9, store all the factorial of n, and then calculate then one by one.
---

# [u Calculate e]( http://acm.hdu.edu.cn/showproblem.php?pid=1012 )

A simple mathematical formula for e is

$$
$e=\sum_{i=0}^n \frac{1}{i !}$
$$
<!--more-->

where n is allowed to go to infinity. This can actually yield very accurate approximations of e using relatively small values of n.

### Output

Output the approximations of e generated by the above formula for the values of n from 0 to 9. The beginning of your output should appear similar to that shown below.

### Sample Output

```
n e
- -----------
0 1
1 2
2 2.5
3 2.666666667
4 2.708333333
```

# Analysis

The range of the number is very small, only 0 to 9, store all the factorial of n, and then calculate then one by one.

# Code

```c++
#include<iostream>

using namespace std;

int main() {
	printf("n e\n- -----------\n");
	int f[15];
	f[0] = 1;
	double ans = 1;
	cout << 0 << " " << 1 << endl;
	for(int i = 1; i <= 9; i ++) {
		f[i] = f[i - 1] * i;
		ans += 1.0 / f[i];
		if(i == 1) printf("%d %.0f\n", i, ans);
		else if(i == 2) printf("%d %.1f\n", i, ans);
		else printf("%d %.9f\n", i, ans);
	}
	return 0;
}
```