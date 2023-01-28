---
title: Calculator (double stack)
date: 2019-11-12 15:46:21
tags: Project
categories: Data Structure
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202301241035043.jpg
---

The pre-knowledges you should know is priority of operator. Priority is the rule that determines when we meet two operators, which to calculate first. Like 3+2*5, we calculate 2 * 5 first.

The priority of operators are:

<!--more-->
$$
)>\times = \div >+=->(
$$
# Illustration

The principle of the operation is to use double stack, one is for operator and one is for operands.

Here are the way it works.

Given an arithmetic, like $3\times2+(4-1)$.

First we prepare two stacks.

<img src="https://s2.ax1x.com/2019/11/20/MWrrqg.png" style="zoom:67%;" />

Then we receives an operands 3 and push it into the operands stack.

<img src="https://s2.ax1x.com/2019/11/20/MWsneg.png" style="zoom:67%;" />

And then we receives an operator $\times$ and push it into the operator stack.

<img src="https://s2.ax1x.com/2019/11/20/MWs0YR.png" style="zoom:67%;" />

The next is 2.

<img src="https://s2.ax1x.com/2019/11/20/MWsRTH.png" style="zoom:67%;" />

Next is an operator $+$. We compare the precedence of the operators, the $\times$ is prior than $+$. So we pop $\times$ out of the stack. And $\times$ needs two parameters, so we push two operands out of the operands stack. And then do the calculation $3\times2$. We get $6$. Push $6$ to the operands stack.

<img src="https://s2.ax1x.com/2019/11/20/MWso1P.png" style="zoom:67%;" /> 

Don't forget the +. Push it in.

<img src="https://s2.ax1x.com/2019/11/20/MWyVhR.png" style="zoom:67%;" />

Then comes to (. We find that the ( is prior to +, so we push ( to the stack.

<img src="https://s2.ax1x.com/2019/11/20/MWyDEQ.png" style="zoom:67%;" />

Then we push 4 to stack.

<img src="https://s2.ax1x.com/2019/11/20/MWyhbF.png" style="zoom:67%;" />

And $-$, it priority is prior than ( so we push it in.

<img src="https://s2.ax1x.com/2019/11/20/MWyjbD.png" style="zoom:67%;" />

Next is 1.

<img src="https://s2.ax1x.com/2019/11/20/MW6Ar8.png" style="zoom:67%;" />

And the special ). When we meet ), we pop all the elements in operator stack and to the operation until we meet an (. First we pop out $-$ and it needs two parameters, so we pop out two element from operands stack. and calculate $4-1$ we get 3 and push it in the operands stack.

<img src="https://s2.ax1x.com/2019/11/20/MW63rT.png" style="zoom:67%;" />

After that ,we meets the (, so we pop the ( out and we are done with the brackets thing.

<img src="https://s2.ax1x.com/2019/11/20/MW6JZF.png" style="zoom:67%;" />

Finally we receives all the elements, however, there is still elements left in the operator stack which means we still need to do the calculation. We pop the operators out and do the calculation until there is nothing in the operation stack.

So we pop out + and it need two parameters. So we pop out 3 and 6 and do $3+6$ and push the result in the operands stack.

<img src="https://s2.ax1x.com/2019/11/20/MW6yZD.png" style="zoom:67%;" />

So the only elements left in the operands stack is the final answer.

# Code

### Calculation.h

```c++
//
// Created by o_oyao on 2019/10/2.
//

#ifndef ELEMENTARY_ARITHMETIC_CALCULATION_H
#define ELEMENTARY_ARITHMETIC_CALCULATION_H

#include <map>
#include <string>

class Calculation {
private:
    static std::map<char, int> precedence;
    static std::map<char, int> parameters;
    static std::map<char, char> brackets;
    static double para[2]; // temporarily store the parameters of the operator
    static double operation(char opt, double parameter1, double parameter2 = 1);
    static bool isOperator(char opt);
    static double getNum(std::string &str, int &i);
public:
    static bool isLegal;
    static void init();
    static double calculate(std::string &formula);
};


#endif //ELEMENTARY_ARITHMETIC_CALCULATION_H
```

### Calculation.cpp

```c++
//
// Created by o_oyao on 2019/10/2.
//

#include "Calculation.h"
#include <stack>
#include <iostream>

std::map<char, int> Calculation::precedence;
std::map<char, int> Calculation::parameters;
std::map<char, char> Calculation::brackets;
double Calculation::para[2];
bool Calculation::isLegal;
void Calculation::init() {
    /* declare parameters */
    parameters['+'] = 2;
    parameters['-'] = 2;
    parameters['*'] = 2;
    parameters['/'] = 2;
    parameters['_'] = 1;
    /* declare precedence */
    precedence['+'] = 4;
    precedence['-'] = 4;
    precedence['*'] = 3;
    precedence['/'] = 3;
    precedence['_'] = 2;
    precedence['('] = 1;
    precedence['['] = 0;
    precedence['{'] = -1;
    /* declare brackets */
    brackets[')'] = '(';
    brackets['}'] = '{';
    brackets[']'] = '[';
    /* initial the para array */
    para[0] = 0;
    para[1] = 0;
}

double Calculation::getNum(std::string &str, int &i) {
    double integer = 0.0; // the integer part
    while (isdigit(str[i])) { // sum up the integers
        integer = integer * 10 + str[i++] - '0';
    }
    double decimal = 0.0, digit = 1.0; // decimal part, digit count the digits of decimal part
    if (str[i] == '.') {// if there is a dot there is decimal part
        i ++;
        while (isdigit(str[i])) { // sum up the decimal part
            digit /= 10;
            decimal += (str[i++] - '0') * digit;
        }
    }
    return integer + decimal; // the decimal plus integer is the final answer
}

double Calculation::calculate(std::string &formula) {
    isLegal = true;
    double ans = 0;
    std::stack<char> operators;
    std::stack<double> operands;

    int len = formula.length();
    for (int i = 0; i < len and isLegal; i++) { // if it's found illegal in the middle, terminate the calculation
        if (isdigit(formula[i])) { // if is number, store it in operands stack
            operands.push(getNum(formula, i)); // the number could be decimal with dot
            i --;
        } else if (isOperator(formula[i])) {
            if (formula[i] == '-' and (i == 0 or formula[i - 1] == '(' or formula[i - 1] == '{' or formula[i - 1] == '[')) {
                formula[i] = '_';
            }
            if ((!operators.empty() and (precedence[formula[i]] <= precedence[operators.top()]
                or (operators.top() == '(') or operators.top() == '{' or operators.top() == '['))
                or operators.empty()) {
                operators.push(formula[i]); // if it's empty or precedence not lower than the top of operators
            } else {
                while (!operators.empty() and precedence[formula[i]] > precedence[operators.top()] and isLegal
                        and operators.top() != '{' and operators.top() != '[' and operators.top() != '(') {
                    // the operator with lower precedence number should be calculated first. e.g. * > +
                    for (int j = 0; j < parameters[operators.top()] and isLegal; ++j) {
                        if (operands.empty()) { // if there is no enough parameters for the operator
                            isLegal = false;
                            break;
                        }
                        para[j] = operands.top();
                        operands.pop();
                    }
                    if (isLegal) {
                        operands.push(operation(operators.top(), para[0], para[1]));
                        operators.pop();
                    }
                }
                operators.push(formula[i]);
            }
        } else if (formula[i] == '(' or formula[i] == '{' or formula[i] == '[') {
            operators.push(formula[i]);
        } else if (formula[i] == ')' or formula[i] == '}' or formula[i] == ']') {
            while (isLegal) { // pop the operator one by one until find the matching brackets
                if (operators.empty()) { // if the stack is empty but the right bracket is still not matched
                    isLegal = false;
                } else {
                    if (operators.top() != brackets[formula[i]]) { // if not match, pop and calculate
                        if (isOperator(operators.top())) {
                            for (int j = 0; j < parameters[operators.top()] and isLegal; ++j) {
                                if (operands.empty()) {
                                    isLegal = false;
                                    break;
                                }
                                para[j] = operands.top();
                                operands.pop();
                            }
                            if (isLegal) {
                                operands.push(operation(operators.top(), para[0], para[1]));
                                operators.pop();
                            }
                        } else { // if matches other type of the brackets
                            isLegal = false;
                        }
                    } else { // found the matching brackets and exists
                        operators.pop();
                        break;
                    }
                }
            }
        }
    }
    if (isLegal) {
        while (!operators.empty()) {
            if (operands.empty()) {
                isLegal = false;
            } else {
                for (int j = 0; j < parameters[operators.top()] and isLegal; ++j) {
                    if (operands.empty()) { // if there is no enough parameters for the operator
                        isLegal = false;
                        break;
                    }
                    para[j] = operands.top();
                    operands.pop();
                }
                if (isLegal) {
                    operands.push(operation(operators.top(), para[0], para[1]));
                    operators.pop();
                }
            }
        }
    }
    if (isLegal and operands.size() == 1) {
        if(operators.empty())
            ans = operands.top();
        else isLegal = false;
    }
    return ans;
}

double Calculation::operation(char opt, double parameter1, double parameter2) { // assign the operator with operation
    double ans = 0;
    switch (opt) {
        case '+':
            ans = parameter1 + parameter2;
            break;
        case '-':
            ans = parameter2 - parameter1; // let the second one be subtracted number because stack reverse the order
            break;
        case '*':
            ans = parameter1 * parameter2;
            break;
        case '/':
            ans = parameter2 / parameter1;
            break;
        case '_':
            ans = 0 - parameter1;
            break;
    }
    return ans;
}

bool Calculation::isOperator(char opt) {
    return opt == '+' or opt == '-' or opt == '*' or opt == '/' or opt == '_'; // brackets are judged separately
}
```

### main.cpp

```c++
#include <iostream>
#include "Calculation.h"

int main() {
    std::cout << "Input a formula of elementary arithmetic(e.g. {[(3+2)*(-1)+2/3-5]/2+2}+100 ) : ";
    std::string formula;
    std::cin >> formula;
    double ans;
    Calculation::init();
    ans = Calculation::calculate(formula);
    if (Calculation::isLegal) {
        std::cout << "The answer is: " << ans << std::endl;
    } else {
        std::cout << "Illegal expression" << std::endl;
    }
    return 0;
}
```