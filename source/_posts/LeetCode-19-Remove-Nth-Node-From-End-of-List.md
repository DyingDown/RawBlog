---
title: LeetCode 19. Remove Nth Node From End of List
date: 2023-03-15 22:48:35
tags: [List, Two Pointers]
categories: ACM
main: List
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303152255314.gif
description: Use two pointers, let them always have a distance of n, so when right pointer reach the end, the left pointer is the last nth node.
---

## Problem Description

[19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/)

## Analysis

Use two pointers, we let them always have a distance of n, so when right pointer reach the end, the left pointer is the last $n^{th}$ node.

Of course there are some extreme situations like there is only one node, we need to remove them to return null. In order to make this case fit in one universal method, we can add a dummy head.

## Code

```c++
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode *dummyHead = new ListNode(0);
        dummyHead->next = head;
        ListNode* fast = dummyHead, *slow = dummyHead;
        while(n --) {
            fast = fast->next;
        }
        while(fast->next != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }
        slow->next = slow->next->next;
        return dummyHead->next;
    }
};
```

