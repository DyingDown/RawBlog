---
title: Big number A+B
date: 2019-09-15 05:32:24
tags: [Knowledge points, Simulation, HDU]
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/JgAif1.jpg
---

The problem A+B is probably the easiest problem, however, the maxim number C/C++ can calculate is between -9223372036854775808~9223372036854775807. The bigger number can’t be calculate unless you use Python or Java. So I’m going to introduce a way to calculate the big number of A+B.

<!--more-->

## Details

Since we can’t use the type int , long int or long long, we can use string to store the big number.

```c++
string a, b;
cin >> a >> b;
```

With string, we can operate **bitwise addition** we learnt when we are in kindergarten. Started from the last bit and align the ends. It’s easier to insert characters in the front of a string then insert at the end. So we reverse the string.

```c++
reverse(a.begin(), a.end());
reverse(b.begin(), b.end());
```

Then we need to know how many digits is the difference between the two numbers and make up the difference with character ‘0’.

```c++
int diff = abs((int)(a.length() - b.length()));
if (a.length() < b.length()) {
     for(int i = 0; i < diff; i ++){
         a += '0';
     }   
} else {
    for(int i = 0; i < diff; i ++){
        b += '0';
    } 
}
```

**Note that .length() returns a type - unsigned long long, if we directly operate the minus operation, the answer will overflow because unsigned long long can’t be negative.**

Then we start to calculate each digit, every digit consist of three element: a[i], b[i], carryIn.

```c++
int carryIn = 0, digit;
string ans = "";
for(int i = 0; i < a.length(); i ++){
    digit = (a[i] - '0') + (b[i] - '0') + carryIn; // convert char to int
    carryIn = digit / 10;
    digit %= 10;
    ans += digit + '0'; // convert int to char
} 
```

If there is still a carryIn when we calculated all the digit, we add a new digit to the number.

```c++
if(carryIn){
    ans += carryIn + '0';
}
```

And don’t forget to reverse the answer back.

```c++
reverse(ans.begin(), ans.end());
cout << ans << endl;
```

Here is a problem of the A+B [A + B Problem II](http://acm.hdu.edu.cn/showproblem.php?pid=1002)

## Problem Description

I have a very simple problem for you. Given two integers A and B, your job is to calculate the Sum of A + B.

### Input

The first line of the input contains an integer T(1<=T<=20) which means the number of test cases. Then T lines follow, each line consists of two positive integers, A and B. Notice that the integers are very large, that means you should not process them by using 32-bit integer. You may assume the length of each integer will not exceed 1000.

### Output

For each test case, you should output two lines. The first line is “Case #:”, # means the number of the test case. The second line is the an equation “A + B = Sum”, Sum means the result of A + B. Note there are some spaces int the equation. Output a blank line between two test cases.

### Sample Input

```
2
1 2
112233445566778899 998877665544332211
```

### Sample Output

```
Case 1:
1 + 2 = 3

Case 2:
112233445566778899 + 998877665544332211 = 1111111111111111110
```

## AC Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main(){
	int t; 
	string a, b, ans, mid, first;
	cin >> t;
	for(int i = 1; i <= t; i ++){
		ans = "";
		cin >> a >> b;
        cout << "Case " << i << ":" << endl << a << " + " << b << " = ";
		reverse(a.begin(), a.end());
        reverse(b.begin(), b.end());
        if(a.length() < b.length()){
            mid = a;
            first = b;
        }else{
            mid = b;
            first = a;
        }
        int diff = abs((int)(a.length() - b.length()));
        for(int j = 0; j < diff; j ++){
            mid += '0';
        }    
        int carryIN = 0, digit;
        for(int j = 0; j < mid.length(); j ++){
            digit = (first[j] - '0') + (mid[j] - '0') + carryIN;
            carryIN = digit / 10;
            digit %= 10;
            ans += digit + '0';
        } 
        if(carryIN){
            ans += carryIN + '0';
        }
        reverse(ans.begin(), ans.end());
		cout << ans << endl;
		if(i != t) cout << endl;
	}
	return 0;
}
```