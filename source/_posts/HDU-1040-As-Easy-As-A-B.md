---
title: HDU-1040 As Easy As A+B
date: 2019-12-15 08:22:07
tags: [Sort, HDU, Quick Sort]
categories: ACM
main: Sort
postImage: https://s1.ax1x.com/2020/04/26/JgAm0e.jpg
description: This is a sorting problem, you can either use quick sort or bubble sort or other sorts.
---

# [As Easy As A+B](http://acm.hdu.edu.cn/showproblem.php?pid=1040)

### Problem Description

These days, I am thinking about a question, how can I get a problem as easy as A+B? It is fairly difficulty to do such a thing. Of course, I got it after many waking nights.
Give you some integers, your task is to sort these number ascending (升序).
You should know how easy the problem is now!
Good luck!

### Input

Input contains multiple test cases. The first line of the input is a single integer T which is the number of test cases. T test cases follow. Each test case contains an integer N (1<=N<=1000 the number of integers to be sorted) and then N integers follow in the same line.
It is guarantied that all integers are in the range of 32-int.

### Output

For each case, print the sorting result, and one line one case.

### Sample Input

```
2
3 2 1 3
9 1 4 7 2 5 8 3 6 9
```

### Sample Output

```
1 2 3
1 2 3 4 5 6 7 8 9
```

# Analysis

This is a sorting problem, you can either use quick sort or bubble sort or other sorts.

# Code

```c++
#include<iostream>

using namespace std;

int a[10000];

void quick_sort(int a[], int start, int end) {
	if(start >= end) return ;
	int l = start, r = end;
	int pivot = a[(end + start) / 2];
	while(l <= r) {
		while(l <= r && a[r] > pivot) r --;
		while(l <= r && a[l] < pivot) l ++;
		if(l <= r) swap(a[l ++], a[r --]);
	}
	quick_sort(a, start, r);
	quick_sort(a, l, end);
}
int main() {
	int t;
	cin >> t;
	while(t --) {
		int n;
		cin >> n;
		for(int i = 0; i < n; i ++) {
			cin >> a[i];
		}
		quick_sort(a, 0, n - 1);
		for(int i = 0; i < n; i ++) {
			if(i == n - 1) cout << a[i] << endl;
			else cout << a[i] << " ";
		}
	}
	return 0;
}
```