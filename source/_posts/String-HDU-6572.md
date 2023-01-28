---
title: String HDU-6572
date: 2019-11-11 15:05:28
tags: [HDU, Problem]
categories: ACM
description: Because of selecting the same character is allowed, so the probability of one character is
---

# [String](http://acm.hdu.edu.cn/showproblem.php?pid=6572)

### Problem Description

Avin has a string. He would like to uniform-randomly select four characters (selecting the same character is allowed) from it. You are asked to calculate the probability of the four characters being ”avin” in order.

### Input

The first line contains n (1 ≤ n ≤ 100), the length of the string. The second line contains the string. To simplify the problem, the characters of the string are from ’a’, ’v’, ’i’, ’n’.

### Output

Print the reduced fraction (the greatest common divisor of the numerator and denominator is 1), representing the probability. If the answer is 0, you should output "0/1".

### Sample Input

```
4
avin
4
aaaa
```

### Sample Output

```
1/256
0/1
```

# Analysis

Because of selecting the same character is allowed, so the probability of one character is
$$
P_{a_i}=\frac{1}{a.length}
$$
And if there are more than one 'a' or 'v' or so on, like n 'a', the probability is 
$$
P_{'a'}=\frac{n}{a.length}
$$

# Code

```c++
#include<bits/stdc++.h>

using namespace std;
map<char,int> num;
int main() {
	int n;
	string s;
	cin >> n >> s;
	for(int i = 0; i < n; i ++){
		num[s[i]] ++;
	}
	int ga = __gcd(num['a'], n);
	int gv = __gcd(num['v'], n);
	int gi = __gcd(num['i'], n);
	int gn = __gcd(num['n'], n);
	int na = n / ga; num['a'] /= ga;
	int nv = n / gv; num['v'] /= gv;
	int ni = n / gi; num['i'] /= gi;
	int nn = n / gn; num['n'] /= gn;
	int son = num['a'] * num['v'] * num['i'] * num['n'];
	int fa = na * nv * ni * nn;
	int g = __gcd(son, fa);
	cout << son / g << '/' << fa / g << endl;
	return 0;
}
```