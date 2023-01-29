---
title: CodeForces-1293A ConneR and the A.R.C. Markland-N
date: 2020-01-19 07:33:35
tags: [CodeForces, STL, Map]
categories: ACM
main: STL
postImage: https://s1.ax1x.com/2020/04/26/Jcu478.png
description: In the first example test case, the nearest floor with an open restaurant would be the floor 4.
---

<center style="line-height:20px">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/1293/problem/A" one-link-mark="yes">A. ConneR and the A.R.C. Markland-N</a><br>
        </font>
        <font size="2">
            time limit per test: 1 second <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

<!--more-->

[*Sakuzyo - Imprinting*](https://www.youtube.com/watch?v=55Ca6av1kAY)

A.R.C. Markland-N is a tall building with $n$ floors numbered from 1 to $n$. Between each two adjacent floors in the building, there is a staircase connecting them.

It's lunchtime for our sensei Colin "ConneR" Neumann Jr, and he's planning for a location to enjoy his meal.

ConneR's office is at floor $s$ of the building. On each floor (including floor $s$, of course), there is a restaurant offering meals. However, due to renovations being in progress, $k$ of the restaurants are currently closed, and as a result, ConneR can't enjoy his lunch there.

CooneR wants to reach a restaurant as quickly as possible to save time. What is the minimum number of staircases he needs to walk to reach a closest currently open restaurant.

Please answer him quickly, and you might earn his praise and even enjoy the lunch with him in the elegant Neumanns' way!

### Input

The first line contains one integer $t (1≤t≤1000)$ — the number of test cases in the test. Then the descriptions of $t$ test cases follow.

The first line of a test case contains three integers $n, s$ and $k (2≤n≤10^9, 1≤s≤n, 1≤k≤min(n−1,1000))$ — respectively the number of floors of A.R.C. Markland-N, the floor where ConneR is in, and the number of closed restaurants.

The second line of a test case contains kk distinct integers $a_1,a_2,…,a_k (1≤a_i≤n)$ — the floor numbers of the currently closed restaurants.

It is guaranteed that the sum of kk over all test cases does not exceed 1000.

### Output

For each test case print a single integer — the minimum number of staircases required for ConneR to walk from the floor $s$ to a floor with an open restaurant.

### Example

#### input

```
5
5 2 3
1 2 3
4 3 3
4 1 2
10 2 6
1 2 3 4 5 7
2 1 1
2
100 76 8
76 75 36 67 41 74 10 77
```

#### output

```
2
0
4
0
2
```

### Note

In the first example test case, the nearest floor with an open restaurant would be the floor 4.

In the second example test case, the floor with ConneR's office still has an open restaurant, so Sensei won't have to go anywhere.

In the third example test case, the closest open restaurant is on the 6-th floor.

# Analysis

Just check the floor from the initial floor to the bottom or to the top. 

At first I use array to store the closed restaurant. However, I got Runtime Error. I don't know why so I changed to map and it passed.

I use 0 to represents not closed and 1 for closed status.

# Code

```c++
#include<bits/stdc++.h>
 
using namespace std;
 
int main() {
    long long t;
    cin >> t;
    while (t--) {
    	map<long long, int> arr;
        long long n, s, k;
        cin >> n >> s >> k;
        long long countup = 0, countdown = 0;
        for(long long i = 0; i < k; i ++) {
            long long a;
            cin >> a;
            arr[a] ++; // if it's closed, it's status is 1
        }
        arr[0] = 1;
        long long temp = s;
        while (arr[temp]) {
            countdown ++;
            temp ++;
            if(temp > n) {
                countdown = 20000000000;
                break;
            }
        }
        temp = s;
        while (arr[temp]) {
            countup ++;
            temp --;
            if(temp < 0) {
                countup = 20000000000;
                break;
            }
        }
        cout << min(countdown,countup) << endl;
    }
    return 0;
}
```