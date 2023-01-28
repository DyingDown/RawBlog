---
title: Traffic HDU-6573
date: 2019-11-11 14:09:09
tags: [HDU, Problem]
categories: ACM
description: "There is a fuzzy point in the description. That is all the car has to wait the same amount of time. For example,"
---

# [Traffic](https://vjudge.net/problem/2578583/origin)

### Problem

Avin is observing the cars at a crossroads. He finds that there are n cars running in the east-west direction with the i-th car passing the intersection at time ai . There are another m cars running in the north-south direction with the i-th car passing the intersection at time bi . If two cars passing the intersections at the same time, a traffic crash occurs. In order to achieve world peace and harmony, all the cars running in the north-south direction wait the same amount of integral time so that no two cars bump. You are asked the minimum waiting time.

<!--more-->

### Input

The first line contains two integers n and m (1 ≤ n, m ≤ 1, 000). The second line contains n distinct integers ai (1 ≤ ai ≤ 1, 000). The third line contains m distinct integers bi (1 ≤ bi ≤ 1, 000).

### Output

Print a non-negative integer denoting the minimum waiting time.

### Sample Input

```
1 1
1
1
1 2
2
1 3
```

### Sample Output

```
1
0
```

# Analysis

There is a fuzzy point in the description. That is all the car has to wait the same amount of time. For example:

|   dir\min   |  1   |  2   |  3   |  4   |  5   |  6   |
| :---------: | :--: | :--: | :--: | :--: | :--: | :--: |
|  east-west  |  1   |      |  3   |  4   |      |      |
| north-south |  1   |  2   |      |      |  5   |      |

The north-south cars has a car go through minute 1 and is conflict with the east-west car. So it has to wait a minute. But all the cars has to wait the same amount of time. So the situation looks like this:

|   dir\min   |  1   |  2   |  3   |  4   |  5   |  6   |
| :---------: | :--: | :--: | :--: | :--: | :--: | :--: |
|  east-west  |  1   |      |  3   |  4   |      |      |
| north-south |      |  2   |  3   |      |      |  6   |

However there is still a confliction at minute 3. So wait another minute.

|   dir\min   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |
| :---------: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  east-west  |  1   |      |  3   |  4   |      |      |      |
| north-south |      |      |  3   |  4   |      |      |  7   |

Now there are two conflictions. We keep waiting another minute.

|   dir\min   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |
| :---------: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  east-west  |  1   |      |  3   |  4   |      |      |      |      |
| north-south |      |      |      |  4   |  5   |      |      |  8   |

Ah---!Another minute.

|   dir\min   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |
| :---------: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  east-west  |  1   |      |  3   |  4   |      |      |      |      |      |
| north-south |      |      |      |      |  5   |  6   |      |      |  9   |

Finally, all the cars can pass without confliction.

The code is to stimulate this process to find the least waiting minute.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int a[100000], b[100000];
int main() {
	int n, m, s;
	cin >> n >> m;
	for(int i = 0; i < n; i ++){
		cin >> s;
		a[s] = 1;
	}
	for(int i = 0; i < m; i ++){
		cin >> b[i];
	}
	int t = 0;
	while(1) {
		int flag = 0;
		for(int i = 0; i < m; i ++){
			if(a[b[i] + t] != 0){
				flag = 1;
				break;
			}
		}
		if(flag) {
			t ++;
		} else {
			break;
		}
	}
	cout << t << endl;
	return 0;
}
```