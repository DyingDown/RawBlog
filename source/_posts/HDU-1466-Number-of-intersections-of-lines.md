---
title: HDU-1466 Number of intersections of lines
date: 2019-12-18 13:15:44
tags: [STL, HDU, Set, DP]
categories: ACM
main: DP
postImage: https://s1.ax1x.com/2020/04/26/JgAYnS.jpg
description: The following analysis is from boss Tan when he taught me how to solve this problem. After passing the problem, I sum up his ideas and turned it into words.
---

# [Calculate the number of intersections of lines](http://acm.hdu.edu.cn/showproblem.php?pid=1466)

There are n straight lines on the plane and there are no three lines in common. Ask how many different intersection points these straight lines can have.
For example, if n = 2, the number of possible intersections is 0 (parallel) or 1 (not parallel).

<!--more-->

### Input

The input data contains multiple test cases, each test case occupies one line, and each line contains a positive integer n (n <= 20), where n is the number of straight lines.

### Output

Each test instance corresponds to a line of output. All the intersection schemes are listed from small to large, where each number is the number of possible intersections, and the integers on each line are separated by a space.

### Sample Input

```
2
3
```

### Sample Output

```
0 1
0 2 3
```

# Analysis

The following analysis is from boss Tan when he taught me how to solve this problem. After passing the problem, I sum up his ideas and turned it into words.

This problem is a dynamic programming problem. 

Assume that we have five straight lines. Three of them are parallel to each other. And other two are unknown (But none of them is parallel to the lines in the other part). 

The points of the two parts of the lines intersect is exactly 6 (not considering the inside intersection of the unknown parts). Which means the lines consisted each one of the 6 points must come from two parts. 

And now consider the unknown two lines. There will be two situations: 0 point (parallel to each other) and 1 point (intersect). 

So with the basic 6 points, there are two choices for the unknown lines. If you choose 0, the points formed by the five lines with three lines parallel to each other is 6. If you choose 1, the points formed by the five lines with three lines parallel to each other is 7.

And this is just one situation of the five lines. There can be one or two or more and even five  parallel lines. 

If there are $n$ lines, and there are $i$ lines parallel to each other, the unknown lines would be $n - i$ .  So the basic points are $i \times (n - i)$ . 

At first, we know that when there is 0 line, there are 1 situation with 0 intersection. When there is 1 line, there are 1 situation with 0 intersection. When there are two lines, there are 2 situations with 0 or 1 intersection. We store the situation for each line-number in a set. And make all the sets in an array. So it's a set array.

With each situations basic points, traverse the situations of the rest lines. Add them together and form a new situation.

The three lines answers can be concluded from the one and two lines situations.

# Code 

```c++
#include<bits/stdc++.h>

using namespace std;

set<int> points[30];
int main() {
	int n;
	set<int> :: iterator it;
	points[0].insert(0);
	points[1].insert(0);
	points[2].insert(1);
	points[2].insert(0);
	for(int i = 3; i < 21; i ++) {
		for(int j = 1; j <= i; j ++) {
			for(it = points[i - j].begin(); it != points[i - j].end(); it ++) {
				points[i].insert(j * (i - j) + *it);
			}
		}
	}
	while(cin >> n) {
		for(it = points[n].begin(); it != points[n].end(); it ++) {
			if(it == points[n].begin()) cout << *it;
			else cout << " " << *it;
		}
		cout << endl;
	}
	return 0;
}
```