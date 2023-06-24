---
title: LeetCode 30. Substring with Concatenation of All Words
date: 2023-06-23 23:24:39
tags: [Sliding Window, Hash Table, SW]
categories: ACM
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202306240059887.png
description: Because all the words are the same length, we can use hash map to check for substring from index i to index i +word length  * words number.
main: SW
---

## Problem Description

[30. Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/description/?envType=study-plan-v2&envId=top-interview-150)

## Analysis

Because all the words are the same length, we can use hash map to check for substring from index `i` to index `i +word length  * words number`.

Then we can traverse all the i index.

However, we can use sliding window to reduce creation of hash map.

For each start, there are 3 situations:

1. the current word is not in the word list, then the whole substring is invalid. so the window will start from the next word.
2. the current word is in the words list, but it appears more times than in the words list. So in this case we start remove words from window in the front, until the other current word is reached and removed.
3. the words are all matched, so we removed the first word from the window.

## Code

```c++
class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        int wordLen = words[0].length(), wordCnt = words.size();
        unordered_map<string,int> baseWords, cmpWords;
        vector<int> ans;
        for(auto i : words) baseWords[i] ++;
        for(int i = 0; i < wordLen; i ++) {
            cmpWords.clear();
            int cnt = 0, tmpStart = i;
            for(int j = i; j < s.length(); j += wordLen) {
                string curWord = s.substr(j, wordLen);
                // 1. current word not in the list
                if(baseWords[curWord] == 0) {
                    cmpWords.clear();
                    cnt = 0;
                    tmpStart = j + wordLen;
                } else {
                    cmpWords[curWord] ++;
                    cnt ++;
                    // the word occurrence time is exceeds 
                    if(cmpWords[curWord] > baseWords[curWord]) {
                        // shrink the window front boundary
                        while(cnt --) {
                            string toBeDel = s.substr(tmpStart, wordLen);
                            cmpWords[toBeDel] --;
                            tmpStart += wordLen;
                            if(toBeDel == curWord) {
                                break;
                            }
                        }
                    }
                    // the words are all matched, remove the first word
                    if(cnt == wordCnt) {
                        ans.push_back(tmpStart);
                        string firstWord = s.substr(tmpStart, wordLen);
                        cmpWords[firstWord] --;
                        cnt --;
                        tmpStart += wordLen;
                    }
                }
            }
        }
        return ans;
    }
};
```

