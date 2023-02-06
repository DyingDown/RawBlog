---
title: HDU-2029 Palindromes_easy version
date: 2019-12-20 03:34:53
tags: [String, HDU]
categories: ACM
main: String
description: Using C++ 11 features. reverse. Another way is is find the middle of the string and travers from both side. Compare one by one.
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051751555.jpg
---

# [Palindromes_easy version](http://acm.hdu.edu.cn/showproblem.php?pid=2029)

A "palindrome string" is a string that is the same as both the forward and reverse reading. For example, "level" or "noon" is a palindrome string. Please write a program to determine whether the read string is "palindrome".

<!--more-->

### Input

The input contains multiple test instances. The first line of input data is a positive integer n, which represents the number of test instances, followed by n strings.

### Output

If a string is a palindrome, it outputs "yes", otherwise it outputs "no".

# Analysis

Using C++ 11 features. reverse.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int t;
	cin >> t;
	while(t --) {
		string a, b;
		cin >> a;
		b = a;
		reverse(b.begin(), b.end());
		if(a == b) cout << "yes" << endl;
		else cout << "no" << endl; 
	} 
	return 0;
}
```