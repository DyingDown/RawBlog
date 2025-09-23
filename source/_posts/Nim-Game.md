---
title: Nim Game
date: 2024-10-20 16:13:18
tags: [Nim Game, Game Theory]
categories: [Algorithm]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410211001007.jpg
description: English&中文解释, This article discusses the classic Nim game, where players can take any number of stones from n piles, detailing the specific solutions and underlying principles.
warning: false
isCarousel: false
---

## English Ver

### Basic Rules of the Nim Game

- At the start of the game, there are $N$ piles (or boxes) of stones, with a certain number of stones in each pile.
- Players take turns removing any number of stones (at least 1) from any pile.
- The player who takes the last stone wins.

### Analysis

Let's examine a few scenarios (assuming Player A goes first and Player B goes second):

1. When $N = 1$, Player A takes all the stones and wins.
2. When $N = 2$, there are two cases:
   - If the two piles have equal amounts of stones, then no matter how many Player A takes, Player B can take the same amount from the other pile, ensuring Player B wins.
   - If the two piles have unequal amounts of stones, Player A can take stones such that the remaining two piles have equal amounts, guaranteeing Player A's win.

3. When $N = 3$:

   1. If the configuration is $1, 2, 3$:

      In this case, Player B wins because no matter how Player A takes stones, Player B can always take stones to make the remaining two piles equal. Possible scenarios after Player A's move might include:

      - $2, 3$
      - $1, 1, 3$
      - $1, 3$
      - $1, 2, 2$
      - $1, 2, 1$
      - $1, 2$

      Thus, no matter how Player A plays, Player B can ensure victory.

From this, we can see that as long as the remaining stones can reach a balance, the game can be controlled.

**This balance is defined by $N_1 \oplus N_2 \oplus ... \oplus N_n = 0$**, and this balance is called **Nim-Sum**.

This means that when the Nim-Sum is 0, the next player to take stones will lose.

### Why Nim-Sum is Correct

I previously struggled to understand why a Nim-Sum of 0 indicates a losing position for the first player. Additionally, I questioned the relationship between the XOR operation and the game's state.

Various online explanations stated that when Nim-Sum = 0, the player taking stones will, regardless of their choice, disrupt this balance, making $Nim-Sum \neq 0$. This puts them in a passive position since the opponent can return the game to a Nim-Sum of 0.

However, this explanation did not clarify my confusion; it felt circular. I still do not understand how disrupting the balance and returning to it relates to the final outcome of the game.

#### Bottom-Up Thinking

Assume the current Nim-Sum is 0, and it is Player A's turn, with $Nim-Sum \neq 0$.

Player B adopts a strategy, and after their turn, $Nim-Sum = 0$.

Player A plays, $Nim-Sum \neq 0$.

Player B adopts a strategy, and after their turn, $Nim-Sum = 0$.

…

Player B adopts a strategy, and after their turn, $Nim-Sum = 0$.

Player A plays, $Nim-Sum \neq 0$ (at this point, the piles are: $1, 1$).

Player B adopts a strategy, and after their turn, $Nim-Sum = 0$; thus, all stones have been taken.

Player A has no stones left to take; Player B has won.

Reversing the logic, suppose it is the final round.

In the last turn, since Player B took stones in the second-to-last round and $Nim-Sum = 0$ after their turn, we can prove that the number of piles $N$ cannot be 1.

> Proof: If there is only one pile, then $Nim-Sum =$ number of stones in the last pile $> 0$.

If $N > 2$, then it cannot be the last round for both players; there must be another round afterward.

Thus, $N = 2$, with only two piles, each containing 1 stone.

> Proof: If each pile contains 2 stones, Player A will adopt the optimal strategy and take only one stone, delaying their loss. In this case, Player B would also take one stone, leaving some stones behind, so it cannot be the last round.

By this logic, when it is Player A's turn and the Nim-Sum is 0, there are only two possibilities: all stones have been taken, or some stones remain. As long as there are stones left, Player B has the opportunity to take $x$ stones to ensure the Nim-Sum is 0. Thus, the scenario is that either Player B takes all the stones, leaving some behind, or Player A cannot take all stones in one turn.

> Proof: Assume Player A can take all stones in one turn; then $Nim-Sum \neq 0$, which contradicts the premise that $Nim-Sum = 0$.

### How to Take the Optimal Strategy

1. Calculate Nim-Sum: $NS = A_1 \oplus A_2 \oplus \ldots \oplus A_k$, where $A_i$ denotes the number of stones in the $i$-th pile.

2. Assess the current situation:

   - If $NS = 0$, then the current position is disadvantageous for the first player; they do not have a winning strategy.
   
   - If $NS \neq 0$, then the current position is advantageous for the first player, and they can find a winning strategy.

3. Choose a pile:

   - Select any pile $A_i$ (where $1 \leq i \leq k$).

4. Calculate the target quantity:

   To make the Nim-Sum equal to 0, you need to find an $x$ such that:

   $x = A_i - (NS \oplus A_i)$

   > Proof:
   >
   > By taking $x$ stones from $A_i$ to make $Nim-Sum = 0$,
   >
   > That is $NS_1 = (A_1 \oplus A_2 \oplus \ldots \oplus A_k) \oplus A_i \oplus (A_i - x) = 0$
   >
   > $\Rightarrow NS \oplus A_i \oplus (A_i - x) = 0$
   >
   > $\Rightarrow NS \oplus A_i = (A_i - x)$
   >
   > $\Rightarrow x = A_i - (NS \oplus A_i)$

## 中文版本

大学的时候打ACM比赛，对博弈论这块就囫囵吞枣的，只是有模板用，但是并不理解其原理。没想到之前偷的懒将来总是要还的。

### Nim 博弈的基本规则

- 游戏开始时，有 $N$个石堆（或盒子），每个石堆中有若干个石子。
- 玩家轮流从任意一个石堆中取走任意数量的石子（至少取 1 个）。
- 取走最后一个石子的人获胜。

### 分析

先看一下几种情况（假设A先手，B后手）：

1.  当 $N = 1$ 时，A拿光全部，A胜利
2. 当 $N = 2$ 时，又分两种情况
   - 两堆石头数量相等。这样A第一次无论拿多少，B从另一堆里拿相同的量，B定赢
   - 两堆石头数量不相等。A第一次拿的时候只要拿完剩下的两堆石头数量相等，A定赢

3. 当 $n = 3$ 时： 

   1. 假如情况是 $1, 2, 3$: 

      这种情况下B赢，因为A不管怎么拿，B都可以拿到一种情况，使得剩余两堆的数量相同。例如A拿完之后剩余的石头的可能的情况：

      - 2， 3
      - 1，1，3
      - 1，3
      - 1，2，2
      - 1，2，1
      - 1，2

      可知，无论A怎么拿，B都可以赢。

由上可知，只要尽可能使得最后剩余的石头数量达到一种平衡就行。

**这个平衡就是 $N_1 \oplus N_2 \oplus ... \oplus  N_n = 0$**， 这个平衡就叫做**Nim-Sum**

这也就是说，当 Nim-Sum = 0 的局面时，下一个拿的人输。

### 为什么Nim-Sum是正确的

我之前一直陷入一个困境，执着于证明为什么Nim-Sum=0的时候，是个不利的局面，先手会输。并且异或和跟局面有什么关系？

在网上和各种AI找到的解释是：

当Nim-Sum=0的时候，这是时候拿石头的人，无论怎么拿，都会打破这个局面。使得$Nim-Sum \neq 0$， 这样就变得被动，因为对方可以使得这个Nim-Sum=0的局面回来。

但是这个解释并没有解决我的疑惑，感觉这个解释自己闭环了。我还是不理解打破了这个局面如何，回到这个局面又如何，跟最后输赢到底有啥关系。

#### 自底向上式思考

假设当前Nim-Sum=0，轮到A拿，$Nim-Sum \neq 0$，

B采取一定的策略，拿完后 $Nim-Sum = 0$，

A拿，$Nim-Sum \neq 0$，

B采取一定的策略，拿完后 $Nim-Sum = 0$，

……

B采取一定的策略，拿完后 $Nim-Sum = 0$，

A拿，$Nim-Sum \neq 0$，（此时石头堆为：1， 1）

B采取一定的策略，拿完后 $Nim-Sum = 0$，此时，所有的石子拿完了。

A拿，A没有石头可以拿了，B已经赢了。



反过来推，假设现在是最后一轮。

最后一次拿，由于B倒数第二次拿，拿完后Nim-Sum=0，证明，堆数N不可能是1。

> 证：若只有一堆，则Nim-Sum=最后一堆石头数 > 0。

若堆数N>2, 则不可能是AB的最后一轮，必定后面还有一轮。

所以N=2，只有两堆。且每堆数量为1。

> 证：假设每堆是 2，2，A会采取最优策略，只拿一个，输的慢一点。为此B也只拿一个，还会有剩余，故不是最后一轮。

以此类推往上推导，

轮到A的时候Nim-sum=0，只有两种情况，石头全拿光了，石头还有剩余。只要是石头还有剩余，B就有机会拿x个石头使得Nim-sum=0。这时，情况还是，要么B拿光了石头，石头还有剩余，且A一次拿不完。

> 证：设A一次能拿完，则$Nim-Sum \neq 0$, 与前提$Nim-Sum=0$自相矛盾。

### 最优策略具体怎么拿

1. 计算Nim-Sum：$NS = A_1 \oplus A_2 \oplus \ldots \oplus A_k$其中 $A_i$ 表示第 i 堆的石子数量。

2. 判断当前局面：

   - 如果 $NS=0$，则当前局面对先手不利，先手没有必胜策略。

   - 如果 $NS \neq 0$，则当前局面对先手有利，可以找到必胜策略。

3. 选择石堆：

   - 选择任意一个石堆 $A_i$（其中 $1 \leq i \leq k$）。

4. 计算目标数量：

   为了让Nim-Sum变为0，你需要找到一个 x 使得：

   $x = A_i - (NS \oplus A_i)$

   > 证明：
   >
   > 从$A_i$里拿取x个石头，使得Nim-Sum=0，
   >
   > 即 $NS_1 = (A_1 \oplus A_2 \oplus \ldots \oplus A_k) \oplus A_i \oplus (A_i - x) = 0$
   >
   > $\Rightarrow NS \oplus A_i \oplus (A_i - x) = 0$
   >
   > $\Rightarrow NS \oplus A_i =(A_i - x)$
   >
   > $\Rightarrow x = A_i - (NS \oplus A_i)$

## Code

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; // piles of stone
    cout << "Enter number of piles: ";
    cin >> n;
    vector<int> piles(n);
    cout << "Enter the number of stones in each pile: ";
    for (int i = 0; i < n; i++) {
        cin >> piles[i];
    }

    int nim_sum = 0;
    for (int stones : piles) {
        nim_sum ^= stones; 
    }

    if (nim_sum == 0) {
        cout << "Current player loses." << endl;
    } else {
        cout << "Current player can win." << endl;
    }

    return 0;
}
```

