---
title: CodeForces 1295 A Display The Number
date: 2020-01-29 17:34:56
tags: [Simulation, CodeForces]
main: Simulation
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/Jcug1A.png
---

<center style="line-height:20px">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/1295/problem/A" one-link-mark="yes">A. Display the Number</a><br>
        </font>
        <font size="2">
            time limit per test: 1 second <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

You have a large electronic screen which can display up to $998244353$ decimal digits. The digits are displayed in the same way as on different electronic alarm clocks: each place for a digit consists of $7$ segments which can be turned on and off to compose different digits. The following picture describes how you can display all $10$ decimal digits:

![](https://espresso.codeforces.com/39cedf07ce9ef18d7ec074f319640a9857b9f8cb.png)

As you can see, different digits may require different number of segments to be turned on. For example, if you want to display $1$, you have to turn on $2$ segments of the screen, and if you want to display $8$, all $7$ segments of some place to display a digit should be turned on.

You want to display a really large integer on the screen. Unfortunately, the screen is bugged: no more than $n$ segments can be turned on simultaneously. So now you wonder what is the greatest integer that can be displayed by turning on no more than $n$ segments.

Your program should be able to process $t$ different test cases.

### Input

The first line contains one integer $t (1≤t≤100)$ — the number of test cases in the input.

Then the test cases follow, each of them is represented by a separate line containing one integer $n (2≤n≤105)$ — the maximum number of segments that can be turned on in the corresponding testcase.

It is guaranteed that the sum of $n$ over all test cases in the input does not exceed $105$.

### Output

For each test case, print the greatest integer that can be displayed by turning on no more than $n$ segments of the screen. Note that the answer may not fit in the standard $32$-bit or $64$-bit integral data type.

### Example

#### input

```
2
3
4
```

#### output

```
7
11
```

# Analysis

The more number it can lighten, the longer digits it can have. So,

$1$ uses the less segments. 

We make $1$ as many as possible. If there are still segments left that can't make a complete $1$, we break up one $1$ and let it form $7$ with the rest.(the rest could only be 1 or 0 because $1$ uses two segments)

# Code

```c++
#include<bits/stdc++.h>
 
using namespace std;
 
int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        int digits1 = n / 2;
        if(n % 2 == 1) {
            cout << 7;
            for(int i = 1; i < digits1; i ++) {
                cout << 1;
            }
        } else {
            for(int i = 0; i < digits1; i ++) {
                cout << 1;
            }
        }
        cout << endl;
    }
    return 0;
}
```

