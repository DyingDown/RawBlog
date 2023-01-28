---
title: Big N!
date: 2019-09-17 06:20:34
tags: [Simulation, String, HDU, Template, Knowlege points]
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/JgAKkd.jpg
---

Using C/C++ we can’t calculate very big number of prime factors. So we use string to store it.

<!--more-->

## Template

```c++
#define INF 1000010
int arr[INF]; // store each digit
string fac(int n){
	string ans;
	if(n == 0) return "1"; // the factorial of 0 is 1;
	fill(arr, arr + INF, 0); // initial the array with 0
	int count = 0, m = n; // count is length of digits
	while(m){
		a[++ count] = m % 10; // calculate each digit
		m /= 10;
	}
	for(int i = n - 1; i >= 2; i --){ // starts the factorial calculation
		int t = 0;
		for(int j = 1; j <= count; j ++){
			arr[j] = arr[j] * i + t;
			t = arr[j] / 10;
			arr[j] %= 10;
		}
		while(t){
			arr[++ count] = t % 10;
			t /= 10;
		}
	}
	while(!arr[count]) count --;
	while(count >= 1) ans += arr[count --] + '0';
	return ans;
}
```

## [N! (HDU 1042)](http://acm.hdu.edu.cn/showproblem.php?pid=1042)

### Problem Description

Given an integer N(0 ≤ N ≤ 10000), your task is to calculate N!

### Input

One N in one line, process to the end of file.

### Output

For each N, output N! in one line.

### Sample Input

```
1
2
3
```

### Sample Output

```
1
2
6
```

## AC Code

```c++
#include <bits/stdc++.h>

using namespace std;

const int L = 100005;

int a[L];

string fac(int n){
	string ans;
	if(n == 0) return "1";
	fill(a, a + L, 0);
	int s = 0, m = n;
	while(m){
		a[++ s] = m % 10;
		m /= 10;
	}
	for(int i = n - 1; i >= 2; i --){
		int w = 0;
		for(int j = 1; j <= s; j ++){
			a[j] = a[j] * i + w;
			w = a[j] / 10;
			a[j] %= 10;
		}
		while(w){
			a[++ s] = w % 10;
			w /= 10;
		}
	}
	while(!a[s]) s --;
	while(s >= 1) ans += a[s --] + '0';
	return ans;
}
int main () {
	int n;
	while(cin >> n){
		cout << fac(n) << endl;
	}
	return 0;
}
```