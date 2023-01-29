---
title: CodeForces-1296 B Food Buying
date: 2020-02-05 04:40:19
tags: [Simulation, CodeForces]
categories: ACM
main: Simulation
postImage: https://s1.ax1x.com/2020/04/26/JcuRXt.png
description: This is stimulating the process. First, spend the money of multiples of ten. Spend the most at once. Second, add up the rest and feedback money.
---

<center style="line-height:20px">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/1296/problem/B" one-link-mark="yes">B. Food Buying</a><br>
        </font>
        <font size="2">
            time limit per test: 1 second <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

Mishka wants to buy some food in the nearby shop. Initially, he has $s$ burles on his card.

Mishka can perform the following operation any number of times (possibly, zero): choose some **positive integer number** $1≤x≤s$, buy food that costs exactly xx burles and obtain $⌊\frac{x}{10}⌋$ burles as a cashback (in other words, Mishka spends $x$ burles and obtains $⌊\frac{x}{10}⌋$ back). The operation $⌊\frac{a}{b}⌋$ means $a$ divided by $b$ rounded down.

It is guaranteed that you can always buy some food that costs $x$ for any possible value of $x$.

Your task is to say the maximum number of burles Mishka can spend if he buys food optimally.

For example, if Mishka has $s=19$ burles then the maximum number of burles he can spend is $21$. Firstly, he can spend $x=10$ burles, obtain $1$ burle as a cashback. Now he has $s=10$ burles, so can spend $x=10$ burles, obtain $1$ burle as a cashback and spend it too.

You have to answer $t$ independent test cases.

### Input

The first line of the input contains one integer $t$ $(1≤t≤104)$ — the number of test cases.

The next $t$ lines describe test cases. Each test case is given on a separate line and consists of one integer $s$ $(1≤s≤109)$ — the number of burles Mishka initially has.

### Output

For each test case print the answer on it — the maximum number of burles Mishka can spend if he buys food optimally.

### Example

#### input

```
6
1
10
19
9876
12345
1000000000
```

#### output

```
1
11
21
10973
13716
1111111111
```

# Analysis

This is stimulating the process.

First, spend the money of multiples of  ten. Spend the most at once. 

Second, add up the rest and feedback money.

Third, do the first do.

Loop until the money is 0.

# Code 

```c++
#include<bits/stdc++.h>

using namespace std;

int a[200000];
int main() {
    int t;
    cin >> t;
    while(t --) {
        int n;
        cin >> n;
        int count = 0;
        while(n) {
            if (n < 10) {
                count += n;
                n = 0;
            } else {
                int s = n / 10;
                count += s * 10;
                n %= 10;
                n += s;
            }
        }
        cout << count << endl;
    }
    return 0;
}
```