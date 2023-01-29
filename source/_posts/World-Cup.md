---
title: World Cup
date: 2019-10-20 02:51:54
tags: [Force, GYM, CodeForces]
categories: ACM
main: Force
description: For me, the core of the problem is to figure out how the matches carry on exactly. It's the hardest part for me.
---

## [Problem Description](https://codeforces.com/gym/101775/problem/M)

The 2018 World Cup will be hosted in Russia. 32 national teams will be divided into 8 groups. Each group consists of 4 teams. In group matches, each pair (unordered) of teams in the group will have a match.

<!--more-->

Top 2 teams with the highest score in each group will advance to eighth-finals. Winners of each eighth-final will advance to quarter-finals. Then, the winners of each quarter-final will advance to semi-finals. Eventually, the World Champion will be the winner of the World Final which is played between the two winners of the semi-finals.

Each match is labeled with a match ID sequenced from 1 to 63, with group matches followed by eighth-final matches followed by quarter-final matches followed by semi-finals matches and finally the final match.

Zhuojie is going to watch the 2018 World Cup. Since the World Champion of ACM-ICPC is very rich, he decides to spend 0.01% of his daily salary to buy tickets. However, there are only match IDs on the tickets and the prices are missing. Can you calculate how much Google pays Zhuojie every workday? Note that Zhuojie can buy multiple tickets for one match.

### Input

The input starts with one line containing exactly one integer *T*, the number of test cases.

Each test case contains 3 lines. The first line contains 5 integers, indicating the ticket price for group match, eighth-final match, quarter-final match, semi-final match and the final match. The second line contains one integer *N*, the number of tickets Zhuojie buys. The third line contains *N* integers, each indicating the match ID on the ticket.

- 1 ≤ *T* ≤ 100.
- 1 ≤ *N* ≤ 105.
- ![img](https://vj.z180.cn/3c8ec44c47388d1d1af338be6335adb2?v=1571201984).
- ![img](https://vj.z180.cn/c855342a7353e6a8e76049969985a9ff?v=1571201984).

### Output

For each test case, output one line containing “Case #x: y” where x is the test case number (starting from 1) and y is daily salary of Zhuojie.

### Example

#### Input

```
111 12 13 14 1521 49
```

#### Output

```
Case #1: 230000
```

## Analysis the Problem

For me, the core of the problem is to figure out how the matches carry on exactly. It’s the hardest part for me. And finally the rules:

| contest | Group | Eighth-final | Quarter-final | Semi-final | Final |
| :-----: | :---: | :----------: | :-----------: | :--------: | :---: |
| number  |  48   |      8       |       4       |     2      |   1   |

So we just need to know which level of contest tickets he bought and sum up the money.

Long Long is needed.

## Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	long long t;
	cin >> t;
	long long b[10];
	long long n;
	long long count, temp;
	for(long long j = 0;j < t;j ++){
		count = 0;
		for(long long i = 0;i < 5; i ++){
			cin >> b[i];
		}
		cin >> n;
		for(long long i = 0;i < n; i ++){
			cin >> temp;
			if(temp <= 48) count += b[0];
			else if(temp <= 56) count += b[1];
			else if(temp <= 60) count += b[2];
			else if(temp <= 62) count += b[3];
			else count += b[4];
		}
		cout << "Case #" << j +1 << ": " << count  << "0000" <<endl;
	}
	return 0;
}
```