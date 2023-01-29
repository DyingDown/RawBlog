---
title: Rising Sun
date: 2019-10-20 02:21:53
tags: [CodeForces, STL, Map, GYM]
categories: ACM
main: STL
description: Position of the house can be divided into two situation, Uphill slope and Downhill slope. And the two situations are used to calculate the Y position of the house.
---

## [Problem Description](https://codeforces.com/gym/102058/problem/J)

Joon has a midterm exam tomorrow, but he hasn’t studied anything. So he decided to stay up all night to study. He promised himself that he will not stop studying before the sun rises.

<!--more-->

Joon’s house is in some mountains. For convenience, let’s say that Joon is living in a 2-dimensional coordinate system. The mountains are in the region y≥0y≥0, starting at x=a0x=a0, and the boundary of them consists of 2n2n line segments parallel to either y=xy=x or y=−xy=−x.

More precisely, the boundary of the mountains can be described by (2n−1)(2n−1) additional integers, where the iith number aiai of them is the xx-coordinate of the iith cusp of the mountains. The boundary line starts at (a0,0)(a0,0), proceeds parallel to y=xy=x until its xx-coordinate reaches a1a1, then proceeds parallel to y=−xy=−x until its xx-coordinate reaches a2a2, and so on. After the last step, the line proceeds parallel to y=−xy=−x until it meets the xx-axis.

The interior of the mountains is the region below the boundary and above the xx-axis. Thus, the interior and the boundary are disjoint.

At some point between x=a0x=a0 and x=a2n−1x=a2n−1, there is Joon’s house on the boundary of the mountains. The size of his house is neglectable compared to the mountains.

Currently, the sun is at the origin and it rises vertically (+y+y direction), 1 per minute. Joon can see the sun if the interior of the mountains does not intersect the straight line segment connecting Joon’s house and the sun. Joon is completely exhausted and wants to know when can he stop studying. But as you may expect, he is out of his mind, so he cannot do such difficult math. Help him!

![img](https://codeforces.com/predownloaded/8b/e0/8be0461e7a430519f72111c9e200113847dc258e.png)

### Input

The first line of the input contains an integer nn (1≤n≤1031≤n≤103).

The next line contains 2n2n integers, the iith of which is the integer ai−1ai−1 (1≤a0<⋯<a2n−1≤1061≤a0<⋯<a2n−1≤106).

The last line contains an integer xx, the xx-coordinate of Joon’s house (a0≤x≤a2n−1a0≤x≤a2n−1).

It is guaranteed that the boundary of the mountains is in the region y≥0y≥0.

### Output

Print exactly one integer mm, the smallest integer such that Joon can see the sun after mm minutes.

### Examples

#### input

```
21 4 6 77
```

#### output

```
5
```

#### input

```
23 4 5 77
```

#### output

```
0
```

#### input

```
34 9 12 13 14 1615
```

output

```
8
```

## Analysis the Problem

Position of the house can be divided into two situation: Uphill slope and Downhill slope. And the two situations are used to calculate the Y position of the house.

1. We firstly calculate some of the Y position of the given points. From the first point to the point before or equal to the point of house.
2. And then the Y position of house.
3. Then traverse the points between the start point and the house, find a tallest point.
4. The tallest point is the point to block the sunshine.
5. Use the information of the tallest point and the house point to calculate a function Y = aX + b.
6. b is the answer.

## Code

```c++
#include<bits/stdc++.h>

using namespace std;

int arr[30000]; // x positions
map<int,int> y; 
int main(){
	int n;
	cin >> n;
	int housex, housey;
	for(int i = 0;i < n * 2;i ++){
		cin >> arr[i];
	}
	cin >> housex;
	int i = 0;
	for(;arr[i] <= housex and i < n * 2; i ++){
		if(i & 1){
			if(i  - 2 >= 0)
				y[arr[i]] = y[arr[i - 2]]  - arr[i - 1] + arr[i-2] + arr[i] - arr[i - 1];
			else
				y[arr[i]] = arr[i] - arr[i - 1];
		}
	}
	if((i & 1)) { // up
		if(i - 2 >= 0)
			housey = y[arr[i - 2]]  - arr[i - 1] + arr[i-2] + housex - arr[i - 1];
		else housey = housex - arr[i - 1];
	} else { // down
		housey = y[arr[i - 1]] - (housex - arr[i - 1]) ;
	}
	map<int,int>::iterator it = y.begin();
	double k = 1e9;
	for(; it != y.end(); it ++){
		k = min(k, (it->second - housey) * 1.0 / (it->first - housex));
	}
	int m = ceil(housey - k * housex);
	if(m <= 0) cout << 0 << endl;
	else cout << m << endl;;
	return 0;
}
```