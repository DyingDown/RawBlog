---
title: 2018 ACM-ICPC Asia Flippy Sequence ZOJ-4060
date: 2020-10-04 02:36:32
tags:
categories: ACM
---

## Problem Description

DreamGrid has just found two binary sequences $s_1,s_2,…,s_n$ and $t_1,t_2,…,t_n$($s_i,t_i∈0,1$ for all $1≤i≤n$) from his virtual machine! He would like to perform the operation described below exactly twice, so that $s_i=t_i$ holds for all $1≤i≤n$ after the two operations.

The operation is: Select two integers *l* and *r* ($1≤l≤r≤n$), change $s_i$ to $(1−s_i)$ for all $l≤i≤r$.

DreamGrid would like to know the number of ways to do so.

We use the following rules to determine whether two ways are different:

- Let $A=(a_1,a_2,a_3,a_4)$, where $1≤a_1≤a_2≤n,1≤a_3≤a_4≤n$, be a valid operation pair denoting that DreamGrid selects integers $a_1$ and $a_2$2 for the first operation and integers $a_3$ and $a_4$ for the second operation;
- Let $B=(b_1,b_2,b_3,b_4)$, where $1≤b_1≤b_2≤n,1≤b_3≤b_4≤n$, be another valid operation pair denoting that DreamGrid selects integers $b_1$ and $b_2$ for the first operation and integers $b_3$ and $b_4$ for the second operation.
- *A* and *B* are considered different, if there exists an integer *k* ($1≤k≤4$) such that $ak≠bk$.

### Input

There are multiple test cases. The first line of the input contains an integer *T*, indicating the number of test cases. For each test case:

The first line contains an integer n ($1≤n≤10^6$), indicating the length of two binary sequences.

The second line contains a string $s1s2…sn$ ($si∈‘0’,‘1’$) of length n, indicating the first binary sequence.

The third line contains a string $t_1 t_2…t_n$ ($t_i∈‘0’,‘1’$) of length *n*, indicating the second binary sequence.

It’s guaranteed that the sum of *n* in all test cases will not exceed $10^7$.

### Output

For each test case, output an integer denoting the answer.

### Sample Input

```
3
1
1
0
2
00
11
5
01010
00111
```

### Sample Output

```
0
2
6
```

### Hint

For the second sample test case, there are two valid operation pairs: (1, 1, 2, 2) and (2, 2, 1, 1).

For the third sample test case, there are six valid operation pairs: (2, 3, 5, 5), (5, 5, 2, 3), (2, 5, 4, 4), (4, 4, 2, 5), (2, 4, 4, 5) and (4, 5, 2, 4).

## Analysis

### Preparation

First we denote the longest possible unequal subsequence as A, the longest possible equal subsequence as B.

So the string is consists of A and B.

For example:

```
0 10 1 0
0 01 1 1
```

The array is BABA where first B is 0, first A is 10, second B is 1, second A is 0.

We can just use a for loop to find all the A.

And we use `cnt` to represents the number of A.

```c++
for (int i = 0; i < n; i++) {
    if ((i == 0 || s[i - 1] == t[i - 1]) && s[i] != t[i]) cnt ++;
}
```

### Situations

There multiple answers to multiple situations:

1. #### IF `cnt = 1`

   There is also two conditions. Just flip A and flip A and B.

   ##### **Just flip A**

   Obviously, if we flip the whole A twice, we will get A and we want A to be B. So we must detach A to two parts. First we flip the first part, then we flip the second part. We happened to reverse s twice.

   But how do we break A? Assume the length of A is n.

   We can break A into
   $$
   (A_{1}), (A_{2}, A_{3}, \cdots, A_{n})
   $$
   We can also break A into
   $$
   (A_1, A_2), (A_3, \cdots, A_n)
   $$
   At last we can break A into
   $$
   (A_1, A_2, \cdots A{n-1}),({A_n})
   $$
   You can easily see there is $n−1$ ways of splitting A. If n = 1, Then we can’t separate A. We must flip whole A twice. So as we talked above, there is no way to make s equal to t. So also satisfy the rule $length(A)−1$.

   ##### Flip A and B (Break B)

   If your s is $BAB$ (Total length of B is at least 1 or it will become the ‘break A’ problem). The only possible way of flipping is $BA,B$ or $AB,B$

   Let’s take a closer look at B. Suppose the length of B is n.

   s is made up with
   $$
   B_1,⋯,B_k,A,B_{k+1},⋯B_n(1≤k≤n)
   $$
   So what we can choose to flip is
   $$
   B_x,⋯,B_y,A,B_x,⋯,B_y(1≤x≤y≤n)
   $$
   or

   
   $$
   A,B_x,⋯,B_y,B_x,⋯,B_y(1≤x≤y≤n)
   $$
   As you can see, there are are n ways of splitting B. Where
   $$
   n=Length(s)−Length(A)
   $$
   Finally, the total answer for `cnt = 1` is$Length(A)−1+Length(s)−Length(A)=Length(s)−1$

2. #### IF `cnt = 2`

   S is consists of $BA_1BA_2B$ (The length of central B must not be 0 or it will be BAB). There are 3 ways of flipping:

    $A_1BA_2,B$

    $A_1,A_2$

   $A_1B,BA_2$

3. #### IF `cnt > 2`

   S is consists of $BA_1BA_2BA_3…$ Since you can just flip twice, you can only change two A of the s. So it’s impossible to make the flip.

4. #### IF `cnt = 0`

   S is consists of only B. BBBBBB…

   So, if we flip one B twice, we will reach t. Assume the length of B (which is the length of s) is n.

   If we just choose a substring of B, and the length of substring is 1. We have n - 1 ways of splitting.

   If the length of substring is 2, there will be n - 2 ways of splitting.

   Until: If the length of substring is n, there will be 1 way of splitting.

   So the total ways of splitting B is
   $$
   (n-1)+(n-2)+\cdots+1 \quad=\frac{(n-1+1) \times(n-1)}{2}=\frac{n \times(n-1)}{2}
   $$

5. #### Each ways times 2

   Different order of flip is regards as two ways. {A}, {B} is not equal to {B}, {A}

These are all the situations of the string s. Use If else sentence in your code.

## Code

```c++
#include <bits/stdc++.h>

using namespace std;
typedef long long ll;
const int maxn = 1e5 + 7;
int a[maxn];

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int times;
    cin >> times;
    while (times--) {
        int n;
        cin >> n;
        string s, t;
        cin >> s;
        cin >> t;
        ll cnt = 0;
        for (int i = 0; i < n; i++) {
            if ((i == 0 || s[i - 1] == t[i - 1]) && s[i] != t[i]) cnt++;
        }
        if (cnt == 1) cout << (ll) 2 * n - 2 << endl;
        else if (cnt == 2) cout << 6 << endl;
        else if (cnt > 2) cout << 0 << endl;
        else cout << (ll) (n + 1) * n / 2 << endl;
    }
    return 0;
}
```