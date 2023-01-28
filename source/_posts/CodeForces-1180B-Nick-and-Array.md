---
title: CodeForces-1180B Nick and Array
date: 2019-11-24 09:57:45
tags: [Brute Force, CodeForces]
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/Jcuotg.png
description: To make the most product, you just need to change all numbers to negative first. And then find the smallest number and make it positive.
---

<center style="line-height=20px;">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/1180/problem/B" one-link-mark="yes">B. Nick and Array</a><br>
        </font>
        <font size="2">
            time limit per test: 1 second <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

# [Nick and Array](http://codeforces.com/problemset/problem/1180/B)

### Problem

Nick had received an awesome array of integers $a=[a_1,a_2, \cdots ,a_n]$ as a gift for his 5 birthday from his mother. He was already going to explore its various properties but after unpacking he was disappointed a lot because the product $a_1,a_2 \cdots a_n$ of its elements seemed to him not large enough.

He was ready to throw out the array, but his mother reassured him. She told him, that array would not be spoiled after the following operation: choose any index i ($1≤i≤n$) and do $a_i=−a_i−1$.

For example, he can change array $[3,−1,−4,1]$ to an array $[−4,−1,3,1]$ after applying this operation to elements with indices $i=1$ and $i=3$.

Kolya had immediately understood that sometimes it's possible to increase the product of integers of the array a lot. Now he has decided that he wants to get an array with the maximal possible product of integers using only this operation with its elements (possibly zero, one or more times, as many as he wants), it is not forbidden to do this operation several times for the same index.

Help Kolya and print the array with the maximal possible product of elements $a_1,a_2, \cdots, a_n$ which can be received using only this operation in some order.

If there are multiple answers, print any of them.

### Input

The first line contains integer $n (1≤n≤105)$ — number of integers in the array.

The second line contains n integers $a_1,a_2,\cdots,a_n(−10^6≤a_i≤10^6)$ — elements of the array

### Output

Print n numbers — elements of the array with the maximal possible product of elements which can be received using only this operation in some order from the given array.

If there are multiple answers, print any of them.

### Examples

#### Input

```
4
2 2 2 2
```

#### Output

```
-3 -3 -3 -3 
```

#### Input

```
1
0
```

#### Output

```
0 
```

#### Input

```
3
-3 -3 2
```

#### Output

```
-3 -3 2 
```

# Analysis

To make the most product, you just need to change all numbers to negative first. And then find the smallest number and make it positive.

Note: Do twice on one number you get the number itself.

```c++
#include<bits/stdc++.h>

using namespace std;

int a[200000];
int main() {
	int n, t;
	cin >> n;
	int maxn = 0;int flag = 0;
	for(int i = 0; i < n; i ++) {
		cin >> t;
		if(t >= 0) {
			t = -t - 1;
		}
		if(abs(t) > maxn){
			flag = i;
			maxn = abs(t);
		} 
		a[i] = t;
	}
	if(n & 1) {
		a[flag] = -a[flag] - 1;
	}
	cout << a[0];
	for(int i = 1; i < n; i ++) {
		cout << " " << a[i];
	}
	cout << endl;
	return 0;
}
```