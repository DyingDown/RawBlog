---
title: AtCoder-4870 Attack Survival
date: 2019-11-17 10:49:22
tags: [AtCoder, Simulation]
categories: ACM
main: Simulation
description: The main mission of this problem is to count each players number of right questions.
---

# [Attack Survival](https://abc141.contest.atcoder.jp/tasks/abc141_c?lang=en)

### Problem Statement

Takahashi has decided to hold fastest-finger-fast quiz games. Kizahashi, who is in charge of making the scoreboard, is struggling to write the program that manages the players' scores in a game, which proceeds as follows.

<!--more-->

A game is played by $N$ players, numbered $1$ to $N$. At the beginning of a game, each player has $K$ points.

When a player correctly answers a question, each of the other $N-1$ players receives minus one $(−1) $point. There is no other factor that affects the players' scores.

At the end of a game, the players with 0 points or lower are eliminated, and the remaining players survive.

In the last game, the players gave a total of $Q$ correct answers, the $i-th$ of which was given by Player $A_i$. For Kizahashi, write a program that determines whether each of the $N$ players survived this game.

### Constraints

- All values in input are integers.
- 2≤$N$≤105
- 1≤$K$≤109
- 1≤$Q$≤105
- 1≤$A_i$≤$N$ (1≤$i$≤$Q$)

### Input

Input is given from Standard Input in the following format:

```
N K Q
A1
A2
.
.
.
AQ
```

### Output

Print *N* lines. The *i*-th line should contain `Yes` if Player *i* survived the game, and `No` otherwise.

### Sample Input 1

```
6 3 4
3
1
3
2
```

### Sample Output 1

```
No
No
Yes
No
No
No
```

In the beginning, the players' scores are (3,3,3,3,3,3).

- Player 3 correctly answers a question. The players' scores are now (2,2,3,2,2,2).
- Player 1 correctly answers a question. The players' scores are now (2,1,2,1,1,1).
- Player 3 correctly answers a question. The players' scores are now (1,0,2,0,0,0).
- Player 2 correctly answers a question. The players' scores are now (0,0,1,−1,−1,−1).

Players 1,2,4,5 and 6, who have 0 points or lower, are eliminated, and Player 3 survives this game.

### Sample Input 2

```
6 5 4
3
1
3
2
```

### Sample Output 2

```
Yes
Yes
Yes
Yes
Yes
Yes
```

### Sample Input 3

```
10 13 15
3
1
4
1
5
9
2
6
5
3
5
8
9
7
9
```

### Sample Output 3

```
No
No
No
No
Yes
No
No
No
Yes
No
```

# Analysis

The means is the problem is that once there is a question, the points of all players -1. **However**, if the player solve the problem right, he or she doesn't need to -1. So one players point at end is equal to 
$$
K-Q+n(the \space number \space of \space right \space questions)
$$
So the main mission of this problem is to count each players number of right questions.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;
map<int,int> a;
int main() {
	int n, k, q, t;
	cin >> n >> k >> q;
	for(int i = 0; i < q; i ++){
		cin >> t;
		a[t] ++;
	}
	for(int i = 1; i <= n; i ++){
		if(k - (q - a[i]) > 0) cout << "Yes" << endl;
		else cout << "No" << endl;
	}
	return 0;
}
```

