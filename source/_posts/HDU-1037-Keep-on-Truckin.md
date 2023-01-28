---
title: HDU-1037 Keep on Truckin'
date: 2019-12-15 06:09:39
tags: [Other, HDU]
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/JgAemD.jpg
description: Just estimate each number, if it is lower than 168, then this underpass is unable to be passed. If no number is less than 168 ,then there is no crash.
---

# [Keep on Truckin'](http://acm.hdu.edu.cn/showproblem.php?pid=1037)

### Problem Description

Boudreaux and Thibodeaux are on the road again . . .

"Boudreaux, we have to get this shipment of mudbugs to Baton Rouge by tonight!"

"Don't worry, Thibodeaux, I already checked ahead. There are three underpasses and our 18-wheeler will fit through all of them, so just keep that motor running!"

"We're not going to make it, I say!"

So, which is it: will there be a very messy accident on Interstate 10, or is Thibodeaux just letting the sound of his own wheels drive him crazy?

### Input

Input to this problem will consist of a single data set. The data set will be formatted according to the following description.

The data set will consist of a single line containing 3 numbers, separated by single spaces. Each number represents the height of a single underpass in inches. Each number will be between 0 and 300 inclusive.

### Output

There will be exactly one line of output. This line will be:

  NO CRASH

if the height of the 18-wheeler is less than the height of each of the underpasses, or:

  CRASH X

otherwise, where X is the height of the first underpass in the data set that the 18-wheeler is unable to go under (which means its height is less than or equal to the height of the 18-wheeler).
The height of the 18-wheeler is 168 inches.

### Sample Input

```
180 160 170
```

### Sample Output

```
CRASH 160
```

# Analysis

Just estimate each number, if it is lower than 168, then this underpass is unable to be passed. If no number is less than 168 ,then there is no crash.

# Code

```c++
#include<iostream>

using namespace std;

int main() {
	int a[4];
	cin >> a[0] >> a[1] >> a[2];
	int flag = 0;
	for(int i = 0; i < 3; i ++) {
		if(a[i] < 168) {
			cout << "CRASH " << a[i] << endl;
			flag = 1;
			break;
		}
	}
	if(!flag) cout << "NO CRASH" << endl;
	return 0;
}
```