---
title: HDU-1395 2^x mod n=1
date: 2019-12-16 02:11:04
tags: [Math, HDU, Mode]
categories: ACM
main: Math
postImage: https://s1.ax1x.com/2020/04/26/JgA31P.jpg
description: This is a loop problem, you need to loop x from 1 to MAX to find if there is an x that fits it.
---

# [HDU-1395 2x mod n=1](http://acm.hdu.edu.cn/showproblem.php?pid=1395)

Give a number n, find the minimum x(x>0) that satisfies 2^x mod n = 1.

<!--more-->

### Input

One positive integer on each line, the value of n.

### Output

If the minimum x exists, print a line with 2^x mod n = 1.

Print 2^? mod n = 1 otherwise.

You should replace x and n with specific numbers.

### Sample Input

```
2
5
```

### Sample Output

```
2^? mod 2 = 1
2^4 mod 5 = 1
```

# Analysis 

This is a loop problem, you need to loop x from 1 to MAX to find if there is an x that fits it. However, if the $2^{MAX}$ can be very big and exceeded long long. So we use an formula 
$$
(a \times b)\%n = ((a \% n) \times b) \% n
$$
which means $2^i = (2^i ) \% n$ in this situation.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int n;
	while(cin >> n) {
		int i = 1, ans = 2;
		for(; i < 10000; i ++) {
			if(ans % n == 1) break;
			ans *= 2;
			ans %= n;
		}
		if(i < 10000) printf("2^%d mod %d = 1\n", i, n);
		else printf("2^? mod %d = 1\n", n);
	}
	return 0;
}
```