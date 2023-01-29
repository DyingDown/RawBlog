---
title: HDU-2023 Average score
date: 2019-12-20 06:29:16
tags: [HDU, Problem, Other]
categories: ACM
main: Other
description: No tricks but you need to be very careful or you will not be able to make it.
---

# [Average Score](http://acm.hdu.edu.cn/showproblem.php?pid=2023)

Suppose there are n (n <= 50) students in a class, and each person tests m (m <= 5) courses. Find the average grade of each student and the average grade of each course, and output the scores of each subject greater than or equal Average number of students.

<!--more-->

### Input

The input data has multiple test instances. The first line of each test instance includes two integers n and m, which represent the number of students and the number of courses, respectively. Then there are n rows of data, each row contains m integers (ie: test scores).

### Output

For each test instance, output 3 rows of data. The first row contains n data, which represents the average grade of n students, with two decimal places in the result. The second row contains m data, which represents the average grade of m courses. Results Keep two decimal places; the third line is an integer that indicates the number of students in each class whose grades are greater than or equal to the average grade.
Each test instance is followed by a blank line.

### Sample Input

```
2 2
5 10
10 20
```

### Sample Output

```
7.50 15.00
7.50 15.00
1
```

# Analysis

This problem is very disgusting. No tricks but you need to be very careful or you will not be able to make it.

Every time I write this problem, I need to WA many many to get one AC.

I've tried to count the average while inputting. However I don't know what's wrong because all my own test cases are right but gets WA always. So I change in the complex way.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int n, m;
	while(cin >> n >> m) {
		int stu_grade[60][50];
		for(int i = 0; i < n; i ++) {
			for(int j = 0; j < m; j ++) {
				cin >> stu_grade[i][j];
			}
		}
		double stu_avg[60], obj_avg[10];
		for(int i = 0; i < n; i ++) {
			int sum = 0;
			for(int j = 0; j < m; j ++) {
				sum += stu_grade[i][j]; 
			}
			stu_avg[i] = sum * 1.0 / m;
			if(i == n - 1) printf("%.2f\n", stu_avg[i]);
			else printf("%.2f ", stu_avg[i]);
		}
		for(int i = 0; i < m; i ++) {
			int sum = 0;
			for(int j = 0; j < n; j ++) {
				sum += stu_grade[j][i];
			}
			obj_avg[i] = sum * 1.0 / n;
			if(i == m - 1) printf("%.2f\n", obj_avg[i]);
			else printf("%.2f ", obj_avg[i]);
		}
		int count = 0;
		for(int i = 0; i < n; i ++) {
			int flag = 1;
			for(int j = 0; j < m; j ++) {
				if(stu_grade[i][j] < obj_avg[j]) {
					flag = 0;
					break;
				}
			}
			if(flag) count ++;
		}
		printf("%d\n\n", count);
	} 
	return 0;
}
/*
5 6
80 80 80 80 80 80
70 70 70 70 70 70
60 60 60 60 60 60
50 50 50 50 50 50
40 40 40 40 40 40
*/
```