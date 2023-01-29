---
title: HDU-1008 Elevator
date: 2019-12-14 16:37:28
tags: [Simulation, HDU]
categories: ACM
main: Simulation
postImage: https://s1.ax1x.com/2020/04/26/JgkvOU.jpg
description: This is an easy problem and you just need to stimulate the hole process.
---

# [Elevator](http://acm.hdu.edu.cn/showproblem.php?pid=1008)

The highest building in our city has only one elevator. A request list is made up with N positive numbers. The numbers denote at which floors the elevator will stop, in specified order. It costs 6 seconds to move the elevator up one floor, and 4 seconds to move down one floor. The elevator will stay for 5 seconds at each stop.

<!--more-->

For a given request list, you are to compute the total time spent to fulfill the requests on the list. The elevator is on the 0th floor at the beginning and does not have to return to the ground floor when the requests are fulfilled.

### Input

There are multiple test cases. Each case contains a positive integer N, followed by N positive numbers. All the numbers in the input are less than 100. A test case with N = 0 denotes the end of input. This test case is not to be processed.

### Output

Print the total time on a single line for each test case.

#### Sample Input

```
1 2
3 2 3 1
0
```

#### Sample Output

```
17
41
```

# Analysis

This is an easy problem and you just need to stimulate the hole process.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int n;
	while(cin >> n and n) {
		int pre = 0, now = 0, dif, ans = 0;
		for(int i = 0; i < n; i ++) {
			cin >> now;
			dif = now - pre;
			if(dif > 0) 
				ans += dif * 6 + 5;
			else ans += dif * (-4) + 5;
			pre = now;
		}
		cout << ans << endl;
	}
	return 0;
}
```