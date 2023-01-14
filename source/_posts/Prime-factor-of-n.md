---
title: Prime factor of n
date: 2019-08-15 16:37:06
tags: Knowledge points
categories: ACM
---

Any given natural number n can be written as a format of the multiplication of sum prime numbers. For example:
$$
4937775= 3*5*5*65837
$$

## Prime factors of N

Here is the directly algorithm

```
int arr[100000];
int prime_factor(int n){
	int count = 0;
	for(int i = 2; i * i <= n; i ++){ 
		if(n % i == 0){
			count ++;
			arr[count] = i;
		}
		while(n % i == 0){
			n /= i;
            // count ++;
            // arr[count] = i; if you don't want to de-duplicate the factors
		}
	}
	if(n != 1){
		count ++;
		arr[count] = n;
	}
	return count;
}
```

## Example

#### Smith Numbers

 While skimming his phone directory in 1982, Albert Wilansky, a mathematician of Lehigh University,noticed that the telephone number of his brother-in-law H. Smith had the following peculiar property: The sum of the digits of that number was equal to the sum of the digits of the prime factors of that number. Got it? Smith’s telephone number was 493-7775. This number can be written as the product of its prime factors in the following way:
$$
4937775= 3*5*5*65837
$$
​ The sum of all digits of the telephone number is 4+9+3+7+7+7+5= 42,and the sum of the digits of its prime factors is equally 3+5+5+6+5+8+3+7=42. Wilansky was so amazed by his discovery that he named this kind of numbers after his brother-in-law: Smith numbers.
As this observation is also true for every prime number, Wilansky decided later that a (simple and unsophisticated) prime number is not worth being a Smith number, so he excluded them from the definition.
Wilansky published an article about Smith numbers in the Two Year College Mathematics Journal and was able to present a whole collection of different Smith numbers: For example, 9985 is a Smith number and so is 6036. However,Wilansky was not able to find a Smith number that was larger than the telephone number of his brother-in-law. It is your task to find Smith numbers that are larger than 4937775!

#### Input

 The input file consists of a sequence of positive integers, one integer per line. Each integer will have at most 8 digits. The input is terminated by a line containing the number 0.

#### Output

 For every number n > 0 in the input, you are to compute the smallest Smith number which is larger than n,and print it on a line by itself. You can assume that such a number exists.

#### Sample Input

```
4937774
0
```

#### Sample Output

```
4937775
```

## Code

This is a simple application of prime factors of n. And n can’t be a prime number.

```c++
#include<iostream>

using namespace std;

typedef long long ll;

ll pri[200000000], k;
ll resolve(ll n){
	k = 0;
	int N = n;
	for(ll i = 2; i * i <= n; i ++) {
		if(N % i == 0){
			N /= i;
	        pri[k ++] = i;
	        while(N % i == 0){
	        	pri[k ++] = i;
	        	N /= i;
			}
		}
	}
	if(N > 1 && N != n) // n is n's factor which can't be counted
		pri[k ++]= N;
	return k;
}

ll sum(ll a){
	ll s = 0;
	while(a){
		s += a % 10;
		a /= 10;
	}
	return s;
}

int check(ll k, ll i){ // check if sum of every digit of k and i are equal
	ll sumi = sum(i);
	ll sumk = 0;
	for(int j = 0; j < k; j ++){
		sumk += sum(pri[j]);
	}
	if(sumk == sumi) return 1;
	return 0;
}

int main(){
	ll n;
	while(cin >> n && n){
		ll i = n;
		while(i ++){
			ll k = resolve(i);
			if(check(k, i)){ 
				cout << i << endl;
				break;
			}
		}
	}
	return 0;
}
```