---
title: HDU-2032 Yang Hui triangle
date: 2019-12-20 03:25:19
tags: [HDU, Problem, Logic]
categories: ACM
main: Logic
description: As you can see from the picture, for each unit, there is...
---

# [Yang Hui triangle](http://acm.hdu.edu.cn/showproblem.php?pid=2032)

Remember the Yang Hui triangle you learned in middle school? The specific definition is not described here, you can refer to the following figure:

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp8ifUZL3-2LFdhmkXlBN0fqY_EPEwvMV3MtqLqFrn1YbcUIJu&s)

<!--more-->

#### Input

The input data contains multiple test instances. The input of each test instance contains only a positive integer n (1 <= n <= 30), which represents the number of layers of the Yang Hui triangle to be output.

#### Output

Corresponding to each input, please output the Yanghui triangle of the corresponding number of layers. The integers of each layer are separated by a space, and a blank line is added after each Yanghui triangle.

# Analysis

As you can see from the picture, for each unit, there is :
$$
y[i][j] = y[i - 1][j - 1] + y[i - 1][j]
$$

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

long long y[50][50];
void Yang() {
	for(int i = 0; i < 50; i ++) {
		y[i][0] = 0;
	}
	y[0][1] = 1;
	for(int i = 1; i <= 30; i ++) {
		for(int j = 1; j <= i; j ++) {
			y[i][j] = y[i - 1][j - 1] + y[i - 1][j];
		}
	}

}
int main() {
	Yang();
	int n;
	while(cin >> n) {
		for(int i = 1; i <= n; i ++) {
			for(int j = 1; j <= i; j ++) {
				if(j == 1) cout << y[i][j];
				else cout << " " << y[i][j];
			}
			cout << endl;
		}
		cout << endl;
	}
	return 0;
}
```

