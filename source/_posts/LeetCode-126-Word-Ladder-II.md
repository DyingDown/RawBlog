---
title: LeetCode 126. Word Ladder II
date: 2023-07-25 11:46:59
tags: [BFS, Backtrack, String]
categories: ACM
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202307251203451.jpg
main: BFS
description: To solve the problem, we can use a combination of BFS and backtracking. 
---

## Problem Description

[126. Word Ladder II](https://leetcode.com/problems/word-ladder-ii/description/)

## Analysis

It's best to read the problem analysis of [127. Word Ladder](https://dyingdown.github.io/2023/03/07/LeetCode-127-Word-Ladder/) first and do this problem first.

To solve the problem, we can use a combination of BFS and backtracking. The BFS is used to build the graph of word transformations and find the shortest paths from `beginWord` to `endWord`. Then, backtracking is employed to reconstruct the transformation sequences from the graph.

The solution involves the following steps:

1. Convert the `wordList` into an unordered set `wordSet` for efficient word existence checks.
2. Initialize a queue `que`, a map `from`, and a set `vis`.
3. Perform a BFS starting from `beginWord`. During the BFS, track the previous words from which each word is reachable and store them in the `from` map.
4. After BFS completes, use backtracking to reconstruct all possible transformation sequences from `beginWord` to `endWord` based on the `from` map.
5. Return the list of all shortest transformation sequences.

**It will be LTE if we jus queue to store each intermediate paths**

## Code

```c++
class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        vector<vector<string>> ans;
        wordSet.insert(beginWord);
        if(wordSet.find(endWord) == wordSet.end()) return ans;

        queue<string> que;
        unordered_map<string, set<string>> from;
        que.push(beginWord);
        wordSet.erase(beginWord);
        unordered_set<string> vis;
        bool find = false;

        // Step 1: BFS to build the graph and find shortest paths
        while(!que.empty()) {
            int n = que.size();
            for(int i = 0; i < n; i ++) {
                auto t = que.front();
                que.pop();
                auto originWord = t;
                for(int i = 0; i < t.size(); i ++) {
                    char originChar = t[i];
                    for(char j = 'a'; j <= 'z'; j ++) {
                        if(j == originChar) continue;
                        t[i] = j;
                        if(wordSet.find(t) != wordSet.end()) {
                            if(t == endWord) find = true;
                            if(vis.find(t) == vis.end())
                                que.push(t);
                            vis.insert(t);
                            from[t].insert(originWord);
                        }
                        t[i] = originChar;
                    }
                }
            }
            if(find) break;
            for(auto i : vis) wordSet.erase(i);
        }

        // Step 2: Backtracking to reconstruct the transformation sequences
        if(find) {
            vector<string> path = {endWord};
            traverse(ans, from, endWord, path);
        }

        return ans;
    }

    // Backtracking function to reconstruct transformation sequences
    void traverse(vector<vector<string>>& ans, unordered_map<string, set<string>>& from, string& current, vector<string> path) {
        if(from[current].empty()) {
            reverse(path.begin(), path.end());
            ans.push_back(path);
            return;
        }
        for(auto i : from[current]) {
            path.push_back(i);
            traverse(ans, from, i, path);
            path.pop_back();
        }
    }
};
```

## Complexity Analysis

- Time Complexity: The BFS process takes O(N * M^2) time, where N is the number of words in `wordList`, and M is the maximum length of a word in the list. The backtracking process takes additional time to reconstruct the sequences, but it remains within a reasonable limit due to the BFS's pruning effect.
- Space Complexity: The space complexity is O(N * M^2) due to the graph representation and additional data structures used during the BFS and backtracking processes.