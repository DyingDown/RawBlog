---
title: HDU-5702 Solving Order
date: 2020-07-11 11:37:49
tags: [Sort, HDU, struct]
categories: ACM
description: This just struct sort. The most easy one with no tricks.
---

## [Solving Order](http://acm.hdu.edu.cn/showproblem.php?pid=5702)

Welcome to HDU to take part in the first CCPC girls’ competition!

![img](https://vj.z180.cn/447d60ff4d002c0b038af203168398a7?v=1594189572)

As a pretty special competition, many volunteers are preparing for it with high enthusiasm.
One thing they need to do is blowing the balloons.

Before sitting down and starting the competition, you have just passed by the room where the boys are blowing the balloons. And you have found that the number of balloons of different colors are strictly different.

After thinking about the volunteer boys’ sincere facial expressions, you noticed that, the problem with more balloon numbers are sure to be easier to solve.

Now, you have recalled how many balloons are there of each color.
Please output the solving order you need to choose in order to finish the problems from easy to hard.
You should print the colors to represent the problems.

### Input

The first line is an integer TT which indicates the case number.
And as for each case, the first line is an integer n, which is the number of problems.
Then there are n lines followed, with a string and an integer in each line, in the i-th line, the string means the color of balloon for the i-th problem, and the integer means the balloon numbers.

It is guaranteed that:
T is about 100.
1≤n≤10.
1≤ string length≤10.
1≤ balloon numbers ≤83.(there are 83 teams :p)
For any two problems, their corresponding colors are different.
For any two kinds of balloons, their numbers are different.

### Output

For each case, you need to output a single line.
There should be n strings in the line representing the solving order you choose.
Please make sure that there is only a blank between every two strings, and there is no extra blank.

### Sample Input

```
3
3
red 1
green 2
yellow 3
1
blue 83
2
red 2
white 1
```

### Sample Output

```
yellow green red
blue
red white
```

## Analysis

This just struct sort. The most easy one with no tricks.

## Code

```c++
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<string>

using namespace std;

struct bolloon {
	int number;
	string color;
	bool operator < (const bolloon& x) const {
		return number > x.number;
	}
}b[10000];

int main() {
	int t;
	cin >> t;
	while(t --) {
		int n;
		cin >> n;
		for(int i = 0; i < n ; i ++) {
			cin >> b[i].color >> b[i].number;
		}
		sort(b, b + n);
		for(int i = 0; i < n; i ++) {
			cout << b[i].color;
			if(i != n - 1) cout << " ";
			else cout << endl;
		}
	}
} 
```