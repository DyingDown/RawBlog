---
title: LeetCode 127. Word Ladder
date: 2023-03-07 00:02:40
tags: [BFS, String]
categories: ACM
main: BFS
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303070021716.jpg
description: The problem is to find the next word in the wordList.
---

## Problem Description

[https://leetcode.com/problems/word-ladder/](https://leetcode.com/problems/word-ladder/)

## Analysis

It's kind of tricky for me to understand the *transform sequence*. This means `s1->s2` there is only on character changed.  eg. `abc -> aec` the middle character changed.

Then, the problem is to find the next word in the `wordList`.

A simple way to do that is we replace each position of the current word with characters  `a - z`. So we check if this new word in `wordList`.

Then the rest would be BFS template.

In order to avoid loop in the word sequence, we need to remove the word we used from wordList.

The reason why its no affect to remove it right after it's pushed to queue is the followings:

The possibility word sequences from this word will be the same no matter what the previous words are. For example, there are some possible sequences A -> B -> C->End, A -> B -> D->End.  if there is other sequence that can also reaches B (F->G->B) the possible sequences will be:  F->G->B->C->End, F->G->B->D->End. You can see that the longer sequences has no use to exists. So we don't need to let the longer one appear, we can safely remove the word B just when we met it.

## Code

```c++
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> words(wordList.begin(), wordList.end());
        queue<string> que;
        que.push(beginWord);
        int len = 1;
        while(!que.empty()) {
            len ++;
            int n = que.size();
            for(int k = 0; k < n; k ++) {
                string t = que.front();
                que.pop();
                for(int i = 0; i < t.length(); i ++) {
                    for(int j = 'a'; j <= 'z'; j ++) {
                        char c = t[i];
                        t[i] = j;
                        if(words.find(t) != words.end()) {
                            if(t == endWord) {
                                return len;
                            }
                            que.push(t);
                            words.erase(t); // this word is being used.
                        }
                        t[i] = c; // replace it back
                    }
                }
            }
            
        }
        return 0;
    }
};
```

