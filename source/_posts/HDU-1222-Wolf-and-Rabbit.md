---
title: HDU-1222 Wolf and Rabbit
date: 2019-12-15 14:36:20
tags: [Math, GCD, HDU]
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/JgA1pt.jpg
description: This problem is to judge whether the two numbers are relatively prime.
---

## [Wolf and Rabbit](https://vjudge.net/problem/18342/origin)

### Problem

There is a hill with n holes around. The holes are signed from 0 to n-1.

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly92ai56MTgwLmNuLzI0MzRmZTg3ZmJmOWM4ZTlmOGE5NDYzZDc3NTA1ZDVk?x-oss-process=image/format,png)



A rabbit must hide in one of the holes. A wolf searches the rabbit in anticlockwise order. The first hole he get into is the one signed with 0. Then he will get into the hole every m holes. For example, m=2 and n=6, the wolf will get into the holes which are signed 0,2,4,0. If the rabbit hides in the hole which signed 1,3 or 5, she will survive. So we call these holes the safe holes.

### Input

The input starts with a positive integer P which indicates the number of test cases. Then on the following P lines,each line consists 2 positive integer m and n(0<m,n<2147483648).

### Output

For each input m n, if safe holes exist, you should output “YES”, else output “NO” in a single line.

### Sample Input

```
2
1 2
2 2
```

### Sample Output

```
NO
YES
```

## Analysis

This problem is to judge whether the two numbers are relatively prime.

## Code

```C++
#include<bits/stdc++.h>

using namespace std;

int main(){
	int t;
	cin >> t;
	while(t --){
		int a, b;
		cin >> a >> b;
		if(__gcd(a, b) == 1) cout << "NO" << endl;
		else cout << "YES" << endl;
	}
	return 0;
}
```