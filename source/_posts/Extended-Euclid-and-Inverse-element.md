---
title: Extended Euclid and Inverse element
date: 2019-08-14 14:38:36
tags: Knowledge points
categories: ACM
---

Today’s importance is inverse element, however, inverse element calculation is based on the extended Euclid algorithm. At first, we need to know the Euclid’s algorithm.

<!--more-->

## Extended Euclid and Inverse Element

>  A much more efficient method is the [Euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm), which uses a [division algorithm](https://en.wikipedia.org/wiki/Division_algorithm) such as [long division](https://en.wikipedia.org/wiki/Long_division) in combination with the observation that the gcd of two numbers also divides their difference. –from Wikipedia

### Extended Euclid

$$
ax+by=gcd(a,b)
$$

From the Euclid Method of calculating gcd, we know that
$$
gcd(a,b)=gcd(b,a)
$$

We set another function
$$
bx1+(a\space mod  \space b) y1=ay1+b(x1-[a/b]y1)
$$

So, combine the first function with the third function we got
$$
ax+by=bx1+(a \\
ax+by=bx1+ay2
$$

We define that if
$$
b=0:x=1,y=0
$$
So we can write our function in this way

```C++
typedef pair<int,int> P;
P gcdEx(int a, int b){
    if(b == 0) return P(1, 0);
    else{
        P p = gcdEx(b, a % b);
        return P(t.second, t.first - (a / b) * t.second);
    }
}
```

The previous one is the direct one we can get from the mathematical function. Here is a better way of writing it.

```C++
void gcdEx(int a, int b, int &x, int &y){
    if(b == 0){
        x = 1; y = 0;
    }else{
        gcdEx(b, a % b, y, x);
        y -= a / b * x;
    }
}
```

### Inverse Element

$$
ax≡1(mod b)ax≡1(mod b)
$$

There is a inverse element only if a and b are **both prime numbers**. The equation above means both side mod b at the same time is equal. **x is a reverse element of a under mod b**.

We can change the equation into this.
$$
ax mod m=1 ax−my=1ax mod m=1 ax−my=1
$$
y is the middle element used to solve x.

So the code looks like this.

```C++
int x, y;
gcdEx(a, m, x, y);
x = (x % m + m) % m;
```

x is the inverse element of a.