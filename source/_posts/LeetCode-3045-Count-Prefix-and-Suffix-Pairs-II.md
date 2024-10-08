---
title: LeetCode 3045. Count Prefix and Suffix Pairs II
date: 2024-02-18 21:24:22
tags: [Trie, Z-function]
categories: ACM
main: Trie
postImage:
description: Using trie tree and z-algorithm to find prefix and suffix.
---

# Intuition

At first I think of using two trie to save prefix and suffix. And save the index of word in the array to its trie node. But the space and the time needed is to big.

So I cut down one trie. Use only one trie, and in the trie, only save the common prefix and suffix.

# Approach

Loop the array from the back, then for each string s, it only needs to search in the trie tree and then, you can find the answer string which index is greater than index of s.

Because there is only one trie tree, you only need to save the word of its common prefix and suffix. Eg. ("ababa", you need to save "aba", "a", "ababa" to the trie tree.)

In order to find its common prefix and suffix, you use z-function.

After searching in trie tree and found the valid pairs, save current string(its common prefixs) to trie tree.

# Code

```cpp
struct Node {
    map<char, Node*> next;
    unordered_set<int> indexs;
};

class Solution {
public:
    long long countPrefixSuffixPairs(vector<string>& words) {
        int n = words.size();
        long long ans = 0;
        Node* root = new Node();
        priority_queue<int, vector<int>, greater<int>> que;
        for(int i = n - 1; i >= 0; i --) {
            int num = searchTree(root, words[i]);
            ans += num; 
            z_function(words[i], que);
            saveToTree(root, words[i], i, que);
        }
        return ans;
    }
    void saveToTree(Node* root, string& word, int j, priority_queue<int, vector<int>, greater<int>>& que) {
        Node* node = root;
        for(int i = 0; i < word.length(); i ++) {
            if(node->next[word[i]] == nullptr) {
                node->next[word[i]] = new Node();
            }
            node = node->next[word[i]];
            if(!que.empty() && i + 1 == que.top()) {
                node->indexs.insert(j);
                que.pop();
            }
        }
        node->indexs.insert(j);
    }
    
    int searchTree(Node* root, string& word) {
        Node* node = root;
        for(int i = 0; i < word.length(); i ++) {
            // int index = word[i] - 'a';
            if(node->next[word[i]] == nullptr) {
                return 0;
            }
            node = node->next[word[i]];
        }
        return node->indexs.size();
    }
    
    void z_function(string& s, priority_queue<int, vector<int>, greater<int>>& que) {
        priority_queue<int, vector<int>, greater<int>> newQue;
        que.swap(newQue);
        que.push(s.length());
        if(s.length() < 2) {
            return ;
        }
        vector<int> cnt(s.length(), 0);
        int left = 0, right = 0;
        for(int i = 1; i < s.length(); i ++) {
            if(i < right) {
                cnt[i] = min(right - i, cnt[i - left]);
            }
            while(cnt[i] + i < s.length() && s[cnt[i]] == s[cnt[i] + i]) {
                cnt[i] ++;
            }
            if(cnt[i] + i > right) {
                right = cnt[i] + i;
                left = i;
            }
            if(cnt[i] + i == s.length()) {
                que.push(cnt[i]);
            }
        }
    }
};
```