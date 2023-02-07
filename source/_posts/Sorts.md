---
title: Sorts
date: 2020-01-16 03:39:27
tags: Project
categories: Data Structure
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051722999.jpg
isCarousel: false
---

Here are some sorting ways and I use many data to test and compare. Just to illustrate the property of each algorithm.

<!--more-->

# Insertion Sort

```c++
//
// Insertion_Sort
//
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MAXN = 1e8 + 10;

ll compare = 0;
ll insert_sort(int num[], int len) {
	ll times = 0;
	for(int i = 1; i < len; i++) {
		int key = num[i];
		int j = i - 1;
		while(j >= 0 && key < num[j]) {
			compare ++;
//			cout << compare << endl;
			num[j + 1] = num[j];
			j--; 
		}
		num[j + 1] = key;
		times ++;
	}
	return times;
}

int arr[MAXN];

void fun(const char* name) {
	compare = 0;
	clock_t st, ed;
	int len = 0;
	ifstream file(name);
	while(file >> arr[len++]);
	st = clock();
	ll times = insert_sort(arr, len);
	ed = clock();
	printf("%s\t%lldms\t%lld\t%lld\n", name, ed - st, times, compare);
}
int main() {
	fun("new_100.txt");
	fun("new_10000.txt");
	fun("new_100000.txt");
	fun("new_1000000.txt");
	fun("new_10000000.txt");
	fun("new_100000000.txt");
	fun("100.txt");
	fun("10000.txt");
	fun("100000.txt");
	fun("1000000.txt");
	fun("10000000.txt");
	fun("100000000.txt");
	return 0;
}
```

Data is divided into two parts, deduplicated and undeduplicated raw data

| Data              | times     | swap time | compare time |
| ----------------- | --------- | --------- | ------------ |
| new_100.txt       | 0ms       | 100       | 2690         |
| new_10000.txt     | 27ms      | 8633      | 18573679     |
| new_100000.txt    | 159ms     | 31211     | 245057118    |
| new_1000000.txt   | 194ms     | 32768     | 269903790    |
| new_10000000.txt  | 219ms     | 32768     | 269871114    |
| new_100000000.txt | 191ms     | 32768     | 269870958    |
| raw_100.txt       | 0ms       | 100       | 2690         |
| raw_10000.txt     | 15ms      | 10000     | 25296862     |
| raw_100000.txt    | 1405ms    | 100000    | 2499320214   |
| raw_1000000.txt   | 251126ms  | 1000000   | 249837170214 |
| raw_10000000.txt  | Data lost | Data lost | Data lost    |
| raw_100000000.txt | 30h+      | ?         | ?            |

# Binary Insertion Sort

```c++
//
// Insertion_Sort
//
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MAXN = 1e8 + 10;

ll compare = 0;
ll BInsert_sort(int num[], int len) {
	ll times = 0;
	for(int i = 2; i < len; i++) {
		int key = num[i];
		int low = 1, high = i - 1, mid = (low + high) / 2;
		while(low <= high) {
			compare ++;
			mid = (low + high) / 2;
			if(key < num[mid]) {
				high = mid - 1;
			} else {
				low = mid + 1;
			}
		}
		for(int j = i - 1; j >= high + 1; j --) {
			num[j + 1] = num[j];
		}
		num[high + 1] = key;
		times ++;
	}
	return times;
}

int arr[MAXN];

void fun(const char* name) {
	compare = 0;
	clock_t st, ed;
	int len = 0;
	ifstream file(name);
	while(file >> arr[len++]);
	st = clock();
	ll times = BInsert_sort(arr, len);
	ed = clock();
	printf("%s\t%lldms\t%lld\t%lld\n", name, ed - st, times, compare);
}
int main() {
	fun("new_100.txt");
	fun("new_10000.txt");
	fun("new_100000.txt");
	fun("new_1000000.txt");
	fun("new_10000000.txt");
	fun("new_100000000.txt");
	fun("100.txt");
	fun("10000.txt");
	fun("100000.txt");
	fun("1000000.txt");
	fun("10000000.txt");
	fun("100000000.txt");
	return 0;
}
```

| Data                     | times      | swap time | compare time |
| ------------------------ | ---------- | --------- | ------------ |
| Duplicated_100.txt       | 0ms        | 99        | 532          |
| Duplicated_10000.txt     | 5ms        | 8632      | 100941       |
| Duplicated_100000.txt    | 64ms       | 31210     | 422787       |
| Duplicated_1000000.txt   | 83ms       | 32767     | 446088       |
| Duplicated_10000000.txt  | 70ms       | 32767     | 446053       |
| Duplicated_100000000.txt | 47ms       | 32767     | 446085       |
| raw_100.txt              | 0ms        | 99        | 532          |
| raw_10000.txt            | 1ms        | 9999      | 10001        |
| raw_100000.txt           | 423ms      | 99999     | 100001       |
| raw_1000000.txt          | 50109ms    | 999999    | 18547631     |
| raw_10000000.txt         | 18406979ms | 9999999   | 218645622    |
| raw_100000000.txt        | 30h+       | ?         | ?            |

# Shell Sort

```c++
//
// Insertion_Sort
//
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MAXN = 1e8 + 10;

ll compare = 0;
ll Shell_sort(int num[], int len) {
	ll times = 0;
    for (int increment = len / 2; increment > 0; increment /= 2){
        for (int i = increment; i < len; i++) {
            int insert_num = num[i], j;
            for (j = i - increment; j >= 0; j -= increment) {
            	compare ++;
                if (num[j] > insert_num) 
                    num[j + increment] = num[j];
                else  break;
            }
            num[j + increment] = insert_num;
            times ++;
        }
    }
	return times;
}

int arr[MAXN];

void fun(const char* name) {
	compare = 0;
	clock_t st, ed;
	int len = 0;
	ifstream file(name);
	while(file >> arr[len++]);
	st = clock();
	ll times = Shell_sort(arr, len);
	ed = clock();
	printf("%s\t%lldms\t%lld\t%lld\n", name, ed - st, times, compare);
}
int main() {
	fun("new_100.txt");
	fun("new_10000.txt");
	fun("new_100000.txt");
	fun("new_1000000.txt");
	fun("new_10000000.txt");
	fun("new_100000000.txt");
	fun("100.txt");
	fun("10000.txt");
	fun("100000.txt");
	fun("1000000.txt");
	fun("10000000.txt");
	fun("100000000.txt");
	return 0;
}
```

| Data                     | times   | swap time  | compare time |
| ------------------------ | ------- | ---------- | ------------ |
| Duplicated_100.txt       | 0ms     | 509        | 957          |
| Duplicated_10000.txt     | 2ms     | 103615     | 218937       |
| Duplicated_100000.txt    | 8ms     | 405766     | 990732       |
| Duplicated_1000000.txt   | 8ms     | 458768     | 4114313      |
| Duplicated_10000000.txt  | 11ms    | 458768     | 3149548      |
| Duplicated_100000000.txt | 9ms     | 458768     | 3395501      |
| raw_100.txt              | 0ms     | 509        | 957          |
| raw_10000.txt            | 0ms     | 120018     | 10001        |
| raw_100000.txt           | 34ms    | 1500022    | 100001       |
| raw_1000000.txt          | 254ms   | 18000026   | 64758346     |
| raw_10000000.txt         | 2917ms  | 220000031  | 966765936    |
| raw_100000000.txt        | 57906ms | 2500000038 | 14053571221  |

# Bubble Sort

```c++
//
// Bubble_Sort
//
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MAXN = 1e8 + 10;

ll compare = 0;

ll bubble_sort(int num[], int len) {
	ll times = 0;
	for(int i = 0; i < len; i++) {
		for(int j = i + 1; j < len; j ++) {
			if(num[i] > num[j]) {
				swap(num[i], num[j]);
				times ++;
			}
		}
		compare ++;

	}
	return times;
}

int arr[MAXN];

void fun(const char* name) {
	compare = 0;
	clock_t st, ed;
	int len = 0;
	ifstream file(name);
	while(file >> arr[len++]);
	st = clock();
	ll times = bubble_sort(arr, len);
	ed = clock();
	printf("%s\t%lldms\t%lld\t%lld\n", name, ed - st, times, compare);
}

int main() {
//	freopen("in.txt", "r", stdin);
	fun("new_100.txt");
	fun("new_10000.txt");
	fun("new_100000.txt");
	fun("new_1000000.txt");
	fun("new_10000000.txt");
	fun("new_100000000.txt");
	fun("100.txt");
	fun("10000.txt");
	fun("100000.txt");
	fun("1000000.txt");
	fun("10000000.txt");
	fun("100000000.txt");
	return 0;
}
```

| Data                     | times     | swap time   | compare time |
| ------------------------ | --------- | ----------- | ------------ |
| Duplicated_100.txt       | 0ms       | 2690        | 101          |
| Duplicated_10000.txt     | 135ms     | 18573679    | 8634         |
| Duplicated_100000.txt    | 1633ms    | 245057118   | 31212        |
| Duplicated_1000000.txt   | 1822ms    | 269903790   | 32769        |
| Duplicated_10000000.txt  | 1869ms    | 269871114   | 32769        |
| Duplicated_100000000.txt | 1792ms    | 269870958   | 32769        |
| raw_100.txt              | 0ms       | 2690        | 101          |
| raw_10000.txt            | 220ms     | 22903469    | 10001        |
| raw_100000.txt           | 15912ms   | 1125994864  | 100001       |
| raw_1000000.txt          | 1258151ms | 15851459201 | 1000001      |
| raw_10000000.txt         | 30h+      | ?           | ?            |
| raw_100000000.txt        | 30h+      | ?           | ?            |

# Heap Sort

```c++
//
// Heap Sort
//
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MAXN = 1e8 + 10;

ll compare = 0;
void make_heap(int num[], int len) {
	for (int i = len - 1; i > 0; i --) {
		if(i & 1 && num[i] > num[(i - 1) / 2])
			swap(num[i], num[(i - 1) / 2]);
		else if( !(i & 1) and num[i] > num[(i - 2) / 2])
			swap(num[i], num[(i - 2) / 2]);
		compare ++;
	}
}
ll heap_sort(int num[], int len) {
	ll times = 0;
	while(len) {
		make_heap(num, len) ;
		len --;
		swap(num[0], num[len]);
		times ++;
	}
	return times;
}

int arr[MAXN];

void fun(const char* name) {
	compare = 0;
	clock_t st, ed;
	int len = 0;
	ifstream file(name);
	while(file >> arr[len++]);
	st = clock();
	ll times = heap_sort(arr, len);
	ed = clock();
	printf("%s\t%lldms\t%lld\t%lld\n", name, ed - st, times, compare);
}
int main() {
	fun("new_100.txt");
	fun("new_10000.txt");
	fun("new_100000.txt");
	fun("new_1000000.txt");
	fun("new_10000000.txt");
	fun("new_100000000.txt");
	fun("100.txt");
	fun("10000.txt");
	fun("100000.txt");
	fun("1000000.txt");
	fun("10000000.txt");
	fun("100000000.txt");
	return 0;
}
```

| Data              | times     | swap time | compare time |
| ----------------- | --------- | --------- | ------------ |
| new_100.txt       | 0ms       | 101       | 5050         |
| new_10000.txt     | 45ms      | 8634      | 37268661     |
| new_100000.txt    | 718ms     | 31212     | 487078866    |
| new_1000000.txt   | 801ms     | 32769     | 536887296    |
| new_10000000.txt  | 802ms     | 32769     | 536887296    |
| new_100000000.txt | 801ms     | 32769     | 536887296    |
| 100.txt           | 0ms       | 101       | 5050         |
| 10000.txt         | 96ms      | 10001     | 50005000     |
| 100000.txt        | 9708ms    | 100001    | 5000050000   |
| 1000000.txt       | 2059306ms | 1000001   | 500000500000 |

# Quick Sort

```c++
//
// Quick_Sort
// 
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MAXN = 1e8 + 10;

ll compare = 0; 
ll times = 0;
void quick_sort(int num[], int start, int end){
	
    if (start >= end) return;
    int l = start, r = end;
    int pivot = num[(end - start) / 2 + start];;
    while (l <= r){
        while (l <= r && num[r] > pivot){
        	compare ++;
        	r--;
		}  
        while (l <= r && num[l] < pivot) {
        	compare ++;
        	l++;
		}  
        if (l <= r) {
        	times ++;
        	swap(num[l++], num[r--]);
		}
    }
    quick_sort(num, start, r);
    quick_sort(num, l, end); 
}


int arr[MAXN];

void fun(const char* name) {
	compare = 0;
	times = 0;
	clock_t st, ed;
	int len = 0;
	ifstream file(name);
	while(file >> arr[len++]);
	st = clock();
	quick_sort(arr, 0, len - 1);
	ed = clock();
	printf("%s\t%lldms\t%lld\t%lld\n", name, ed - st, times, compare);
}
int main() {
	fun("new_100.txt");
	fun("new_10000.txt");
	fun("new_100000.txt");
	fun("new_1000000.txt");
	fun("new_10000000.txt");
	fun("new_100000000.txt");
	fun("100.txt");
	fun("10000.txt");
	fun("100000.txt");
	fun("1000000.txt");
	fun("10000000.txt");
	fun("100000000.txt");
	return 0;
} 
```

| Data                     | times  | swap time | compare time |
| ------------------------ | ------ | --------- | ------------ |
| Duplicated_100.txt       | 0ms    | 180       | 579          |
| Duplicated_10000.txt     | 0ms    | 28724     | 86065        |
| Duplicated_100000.txt    | 1ms    | 117382    | 361212       |
| Duplicated_1000000.txt   | 3ms    | 123193    | 391221       |
| Duplicated_10000000.txt  | 1ms    | 123384    | 396556       |
| Duplicated_100000000.txt | 2ms    | 123792    | 379925       |
| raw_100.txt              | 0ms    | 180       | 579          |
| raw_10000.txt            | 3ms    | 33752     | 10001        |
| raw_100000.txt           | 6ms    | 436249    | 100001       |
| raw_1000000.txt          | 65ms   | 5723791   | 14357440     |
| raw_10000000.txt         | 631ms  | 72919003  | 142909802    |
| raw_100000000.txt        | 6479ms | 896298813 | 1346887740   |