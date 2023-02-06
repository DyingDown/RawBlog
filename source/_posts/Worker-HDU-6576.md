---
title: Worker HDU-6576
date: 2019-11-11 12:15:21
tags: [HDU, Problem, Math, GCD]
categories: ACM
main: Math
description: This problem is gcd or lcm problem. 
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051739586.jpg
---

# [Worker](http://acm.hdu.edu.cn/showproblem.php?pid=6576)

### Problem

Avin meets a rich customer today. He will earn 1 million dollars if he can solve a hard problem. There are n warehouses and m workers. Any worker in the i-th warehouse can handle ai orders per day. The customer wonders whether there exists one worker assignment method satisfying that every warehouse handles the same number of orders every day. Note that each worker should be assigned to exactly one warehouse and no worker is lazy when working.

<!--more-->

### Input

The first line contains two integers n (1 ≤ n ≤ 1, 000), m (1 ≤ m ≤ 1018). The second line contains n integers. The i-th integer ai (1 ≤ ai ≤ 10) represents one worker in the i-th warehouse can handle ai orders per day.

### Output

If there is a feasible assignment method, print "Yes" in the first line. Then, in the second line, print n integers with the i-th integer representing the number of workers assigned to the i-th warehouse.
Otherwise, print "No" in one line. If there are multiple solutions, any solution is accepted.

### Sample Input

```
2 6
1 2
2 5
1 2
```

### Sample Output

```
Yes
4 2
No
```

# Analysis

This problem is gcd or lcm problem.  For example, to make two numbers $a_1 \space a_2$ equal, the least number $n$ that satisfy $n=a_1 \times d_1 = a_2 \times d_2$ is $lcm(a_1, a_2)$, which is $\frac{a_1 \times a_2}{gcd(a_1, a_2)}$. So the least multiplier to $a_1$ is $d_1=\frac{lcm(a_1, a_2)}{a_1}$, the least multiplier to $a_2$ is $d_2=\frac{lcm(a_1, a_2)}{a_2}$. So $d_1,d_2$ is the satisfying condition. However, the problem says that it want all workers to work, so the answer is $kd_1, kd_2 (kd_1+kd_2<m)$. m is the number of workers.

For three or more numbers $a_1, a_2, a_3, \cdots ,a_n$ , you just need to calculate the lcm of these numbers and find each number's $d_i$ . 

**Note that the lcm of these number can't be calculated by $\frac{a_1 \times a_2 \times \cdots \times a_n}{gcd(a_1, a_2, \cdots , a_n)}$ , but need to calculated two each time and use the answer to be the next one parameter.** I use the wrong way at first and the judge always says there is Runtime Error(INTEGER_DIVIDE_BY_ZERO) problem. I can't figure it out until I change the calculation ways.

# Code

```c
#include<bits/stdc++.h>

using namespace std;

long long a[10000];
int main() {
	long long n, m;
	cin >> n >> m;
	cin >> a[0];
	long long g = a[0], mul = a[0];
	for (long long i = 1; i < n; i ++) {
		cin >> a[i];
		g = __gcd(a[i], g);
		mul *= a[i];
	} // calculate lcm of the numbers
	long long lcm = mul / g;
	a[0] = lcm / a[0];
	long long count = a[0];
	for(long long i = 1; i < n; i ++){
		a[i] = lcm / a[i]; 
		count += a[i];
	}
	if(m % count != 0) cout << "No" << endl; // if there must be workers at rest
	else {
		cout << "Yes" << endl;
		long long s = m / count; // this is to find a k
		cout << a[0] * s;
		for(long long i = 1; i < n; i ++){
			cout << " " << a[i] * s;
		}
		cout << endl;
	}
}
```