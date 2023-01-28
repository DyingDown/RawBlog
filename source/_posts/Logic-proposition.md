---
title: Logic-proposition
date: 2019-08-12 17:09:41
tags: logic
categories: Discrete Math
---

This is a homework of Discrete Math course and it happened a long time ago. At first, I think of a violent way that is to list all the possible situations. Somehow, I still can’t achieve this because of my confusing logic. Then a friend of mine told me an algorithm that is Shunting Yard Algorithm.

<!--more-->

## Introduction

 This document is talking about how to use logic_proposition.py the calculate the Well-Formed Formula

### 1 Usage

 1.1 input an expression

 1.2 if it is not a valid WFF, it will return false

 1.3 if it is valid, it will calculate the layer, the type, the true assignment and the false assingment of the expression

### 2 Example

 2.1

 Please input a formula:¬(¬a∧p)↔a

 [‘a’, ‘¬’, ‘p’, ‘∧’, ‘¬’, ‘a’, ‘↔’]

 The type of the expression is :Satisfiable

 True assignment:[{‘p’: ‘0’, ‘a’: ‘1’}, {‘p’: ‘1’, ‘a’: ‘0’}, {‘p’: ‘1’, ‘a’: ‘1’}]

 False assignment:[{‘p’: ‘0’, ‘a’: ‘0’}]

 The layer of this is : 4

 2.2

 Please input a formula:¬(¬a∧p)↔

 This is not a valid expression

### 3 Method

 3.1 convert the expression in to a rpn expressioin

 This will find the unmatched ‘(‘ and ‘)’

 3.2 Then list all the possible assignments using “plus 1 at a time” method. Change the binary numer into a decimal.

 3.3 Then calculate the answer and layer

## Code

```python
precedence = {'¬':1, '∧':2, '∨':3, '→': 4, '↔': 5} #define precedence of operator

propo = set() #store all the proposition
Table = list() #all the possible answer
truthn = [] #all the answer that make the formula true
falsen = [] #all the answer that make the formula false

is_legal = 0

def parameter(operator):  #check how many parameters does the operator need
    if operator == '¬':
        return 1
    elif operator in ['∧','∨','→', '↔']:
        return 2

def rules(operator, parameter1, parameter2 = 1): # how the operator works
    #print(parameter1)
    result = 0
    if operator == '∧': 
        result = parameter1 and parameter2
    elif operator == '∨':
        result = parameter1 or parameter2
    elif operator == '→':
        if parameter1 == 1 and parameter2 == 0:
            result = 0
        else:
            result = 1
    elif operator == '↔':
        if parameter1 == parameter2:
            result = 1
    elif operator == '¬':
        #print(result)
        result = int(not parameter1)
        #print(result)
    return str(result)
        
def shuntingYard(formula):
    l = len(formula) 
    rpn = [] #the translated suffix expression rpn
    operator = [] # temply store  the operator
    is_legal = 1 # the formula is legal
    for i in range (l):
        if formula[i].isalpha(): #check for alphabet
            rpn.append(formula[i]) #if is ,then store in the rpn expression
            propo.add(formula[i])  #get the set of all proposition
        elif formula[i] in ['∧','∨','→', '↔']: #if is right precedence
            while operator != [] and operator[-1] != '(' and precedence[formula[i]] >= precedence[operator[-1]]:
                rpn.append(operator[-1])
                del operator[-1]
            operator.append(formula[i])
        elif formula[i] == '¬': #if is left precedence
            #print(operator)
            while operator != [] and operator[-1] != '(' and precedence[formula[i]] > precedence[operator[-1]]:
                rpn.append(operator[-1])
                del operator[-1]
            operator.append(formula[i])
            #print(operator)
        elif formula[i] == '(':
            operator.append(formula[i])
            #print(operator)
        elif formula[i] == ')':
            while operator != [] and operator[-1] != '(':
                rpn.append(operator[-1])
                #print(operator[-1])
                del operator[-1]
                if operator == []: #if there is no (
                    is_legal = 0 #the formula is not legal
                    break
            #print(operator)
            del operator[-1]
        else:
            is_legal = 0
    #print(operator)
    while operator != []:
        if operator[-1] == '(': #there is no )
            is_legal = 0
            break
        rpn.append(operator[-1])
        del operator[-1]
    return rpn, is_legal # rpn string, is_legal int

def rpn_formula(formula):
    i = -1
    is_legal = 1
    while -i < len(formula) and formula[i] != ')':
        i -= 1
    if formula[i] in ['∧','∨','→', '↔', '¬']:
        is_legal = 0
    return is_legal

def layer(rpn):
    char = []
    for i in range(len(rpn)):
        if rpn[i].isalpha():
            char.append(0)
        else:
            if parameter(rpn[i]) == 1:
                temp = char[-1] + 1
                del char[-1]
                char.append(temp)
            if parameter(rpn[i]) == 2:
                temp = max(char[-1], char[-2]) + 1
                del char[-2:]
                char.append(temp)
    return char[0]

def cal(rpn, value):
    l = len(rpn)
    proposition = [] #temply store the result the some propostions and even the final answer
    result = 0 #temply store the result of one calculation
    is_legal = 1
    for i in range(l):
        #print(rpn[i])
        if rpn[i] in ['∧','∨','¬', '→', '↔']:
            n = parameter(rpn[i]) #the number of parameters that the operator need
            #print(n)
            if len(proposition) < n:
                is_legal = 0
            else:
                a = []
                for j in range(n):
                    #print(proposition)
                    #print(proposition)
                    a.append(proposition[-1])
                    #print(j)
                    #print(a[j])
                    del proposition[-1]
                #print(a) 
                #print(a[0])
                result = rules(rpn[i], eval(a[0]), eval(a[1])) if n == 2 else rules(rpn[i], eval(a[0]))
                #print("the answer is{}".format(result))
                proposition.append(result) 
        elif rpn[i].isalpha():
            proposition.append(value[rpn[i]])
            #print("i:{} rpn[i] {}".format(i,value[rpn[i]]))
            #print(proposition)
    if len(proposition) > 1:
        is_legal = 0
    else:
        result = proposition[0]
    return result, is_legal

#to make the binary number increase by one at a time, change them into decimal numbers and increase 1
def truthTable(num, rpn):#num is the length of the set
    numt = 2 ** num #n is the last occasion of the truth Table
    #print(numt)
    proposi = list(propo) #change the propo into list
    #print(proposi)
    temp = list()
    for i in range(numt):
        #print("i {}".format(i))
        b = '{:0100b}'.format(i)#set the length of the changed binary number to 100; value is a string 
        #print("b {}".format(b))
        #print(-num - 1)
        b = b[-num:] #cut off the unneeded first some 0s and leave the rest things from -1 to -num
        #print("b {}".format(b))
        temp = list(b) #split the string into list
        #print(temp)
        value = dict(zip(proposi, temp)) #match the values and the propositions
        #print(value)
        ans = cal(rpn, value)[0]
        #print(ans)
        if cal(rpn, value)[1] != 0:
            #print(ans)
            Table.append(ans) #calculate the answer and store in the list
            #print(Table)
            if ans == '0':
                #print(falsen)
                falsen.append(value)
                #print(falsen)
            elif ans == '1':
                truthn.append(value)
        else:
            global is_legal
            is_legal = 0
            break

#def true_false()
def main():
    formula = input("Please input a formula:")
    rpn = shuntingYard(formula)[0]
    #print(rpn)
    is_legal = shuntingYard(formula)[1]
    is_legal = rpn_formula(rpn)
    #print(is_legal)
    #print(len(propo))
    #print(propo)
    if propo != set() and is_legal == 1:
        truthTable(len(propo), rpn)
        if is_legal == 1:
            print("The type of the expression is :", end = "")
            if '0' not in Table:
                print("Tautology")
            elif '1' not in Table:
                print("Contradictory")
            else:
                print("Satisfiable")
            
            print("True assignment:{}".format(truthn))
            print("False assignment:{}".format(falsen))
            layers = layer(rpn)
            print("The layer of this is : {}".format(layers))
        else:
            print("This is not a valid expression")
    else:
        print("This is not a valid expression")
        
main()
```