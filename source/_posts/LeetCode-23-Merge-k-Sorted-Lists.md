---
title: LeetCode 23. Merge k Sorted Lists
date: 2023-07-03 00:33:10
tags: [List, Heap]
categories: ACM
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202307030050641.jpg
description: To merge k sorted linked lists efficiently, we can use a Min Heap data structure.
main: Heap
---

## Problem Description

[23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/description/?envType=study-plan-v2&envId=top-interview-150)

## Approach and Algorithm

To merge k sorted linked lists efficiently, we can use a **Min Heap** data structure. We will maintain a min heap of size k, where each element in the heap represents the current head node of each linked list. Initially, we will add the heads of all k linked lists to the min heap.

We will repeatedly extract the minimum node from the heap, append it to the result list, and then move the pointer of the corresponding linked list to its next node. If the linked list becomes empty, we will replace the current head in the heap with the last element in the heap, reduce the heap size, and adjust the heap to maintain its min heap property. This process continues until the heap is empty.

We can implement a heap manually or use the `priority_queue`.

## C++ Solution

```cpp
class Solution {
public:
    void minifyHeap(vector<ListNode*>& list, int index, int heapSize) {
        int left = index * 2 + 1, right = left + 1;
        int minIndex = index;
        if(left < heapSize && list[left]->val < list[minIndex]->val) {
            minIndex = left;
        }
        if(right < heapSize && list[right]->val < list[minIndex]->val) {
            minIndex = right;
        }
        if(minIndex != index) {
            swap(list[minIndex], list[index]);
            minifyHeap(list, minIndex, heapSize);
        }
    }
    void buildHeap(vector<ListNode*>& lists, int heapSize) {
        for(int i = heapSize / 2 - 1; i >= 0; i --) {
            minifyHeap(lists, i, heapSize);
        }
    }
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        ListNode* preHead = new ListNode(0), *head = preHead;
        int size = lists.size();
        for(int i = 0; i < size; ) {
            if(lists[i] == nullptr) {
                swap(lists[i], lists[size - 1]);
                size --;
            } else {
                i ++;
            }
        }
        if(size == 0) return nullptr;
        buildHeap(lists, size);
        while(size) {
            head->next = lists[0];
            head = head->next;
            lists[0] = lists[0]->next;
           

 if(lists[0] == nullptr) {
                swap(lists[0], lists[size- 1]);
                size --;
            }
            minifyHeap(lists, 0, size);
        }
        return preHead->next;
    }
};
```

## Complexity Analysis

The time complexity of this approach is O(N log k), where N is the total number of nodes across all k linked lists. This is because we need to perform a heapify operation for each node in the worst case.

The space complexity is O(k) since we are using a min heap of size k to store the head nodes of the linked lists.

## Summary

In this problem, we used the concept of a min heap to efficiently merge k sorted linked lists. By maintaining a min heap of size k, we can always extract the minimum element and continue merging the lists until all elements are merged into a single sorted list. The time complexity of this approach is efficient, making it a practical solution for large values of k or N.