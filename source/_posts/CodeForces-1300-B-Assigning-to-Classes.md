---
title: CodeForces-1300 B Assigning to Classes
date: 2020-02-09 15:51:55
tags: [CodeForces, Sort]
categories: ACM
main: Sort
postImage: https://s1.ax1x.com/2020/04/26/Jc1tLn.jpg
description: The middle two numbers' absolute difference is the answer. Because you can give the first to array1 and second to array2 and third to array1...
---

<center style="line-height:20px">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/1300/problem/B" one-link-mark="yes">B. Assigning to Classes</a><br>
        </font>
        <font size="2">
            time limit per test: 2 seconds <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

**Reminder: the [median](https://en.wikipedia.org/wiki/Median)** of the array $[a_1,a_2,…,a_{2k+1}]$ of odd number of elements is defined as follows: let $[b_1,b_2,…,b_{2k+1}]$ be the elements of the array in the sorted order. Then median of this array is equal to $b_{k+1}$.

There are $2n$ students, the ii-th student has skill level $a_i$. It's **not guaranteed** that all skill levels are distinct.

Let's define **skill level of a class** as the median of skill levels of students of the class.

As a principal of the school, you would like to assign each student to one of the $2$ classes such that each class has **odd number of students** (not divisible by $2$). The number of students in the classes may be equal or different, by your choice. Every student has to be assigned to exactly one class. Among such partitions, you want to choose one in which the absolute difference between skill levels of the classes is minimized.

What is the minimum possible absolute difference you can achieve?

### Input

Each test contains multiple test cases. The first line contains the number of test cases $t$ $(1≤t≤10^4)$. The description of the test cases follows.

The first line of each test case contains a single integer $n$ $(1≤n≤10^5)$ — the number of students halved.

The second line of each test case contains $2n$ integers $a_1,a_2,…,a_{2n}$ $(1≤a_i≤10^9)$ — skill levels of students.

It is guaranteed that the sum of $n$ over all test cases does not exceed $10^5$.

### Output

For each test case, output a single integer, the minimum possible absolute difference between skill levels of two classes of odd sizes.

### Example

#### input

```
3
1
1 1
3
6 5 4 1 2 3
5
13 4 20 13 2 5 8 3 17 16
```

#### output

```
0
1
5
```

### Note

In the first test, there is only one way to partition students — one in each class. The absolute difference of the skill levels will be $|1−1|=0$.

In the second test, one of the possible partitions is to make the first class of students with skill levels $[6,4,2]$, so that the skill level of the first class will be $4$, and second with $[5,1,3]$, so that the skill level of the second class will be $3$. Absolute difference will be $|4−3|=1$.

Note that you can't assign like $[2,3]$, $[6,5,4,1]$ or $[]$, $[6,5,4,1,2,3]$ because classes have even number of students.

[2], [1,3,4] is also not possible because students with skills $5$ and $6$ aren't assigned to a class.

In the third test you can assign the students in the following way: $[3,4,13,13,20]$,$[2,5,8,16,17]$ or $[3,8,17]$,$[2,4,5,13,13,16,20]$. Both divisions give minimal possible absolute difference.

# Analysis

The middle two numbers' absolute difference is the answer. Because you can give the first to array1 and second to array2 and third to array1... and then the first middle is in array1 and the second middle is in array two. And the median of array1 is the first middle and the median of array2 is the second middle.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int arr[2000000];
int main() {
    int t;
    cin >> t;
    while(t --) {
        int n;
        cin >> n;
        for(int i = 0; i < 2 * n; i ++) {
            cin >> arr[i];
        }
        sort(arr, arr + 2 * n);
        cout << abs(arr[n - 1] - arr[n]) << endl;
    }
    return 0;
}
```