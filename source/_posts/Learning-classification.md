---
title: Learning classification
date: 2019-08-13 01:34:59
tags: Knowledge points
categories: Machine Learning
warning: true
isCarousel: false
---

In general, any machine learning problem can be assigned to one of two broad classifications:

**Supervised learning** and **Unsupervised learning**.

<!--more-->

## Supervised Learning

In my understanding, supervised learning is that the given situation has a certain answer. We give multiple data to the algorithm and the answer of the given data.

>  The term Supervised Learning refers to the fact that we gave the algorithm a data set in which the, called, “right answers” were given. That is we gave it a data set of houses in which for every example in this data set, we told it what is the right price.

### Examples

#### Housing price prediction:

![Image result for supervised machine learning](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23Yf70HgeuzT2DENed69HDZfm-SdyNXMrc8vgX4ZVxm80idWbEQ)

Given a size of the house and compute the price. We can treat the data as a function (see as linear in this graph).

>  The task of the algorithm was to just produce more of these right answers .

This problem is also called **Regression Problem**.

#### Breast Cancer Prediction

![Image result for supervised machine learning cancer prediction](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFP3e0rouSha4Jde9DS5uAwOs-k8NapOp2mDGT0fQpkUkL6YEVmA)

This is an different situation, I think. We give many properties of the patient, and check out whether the patient has got a cancer or not. The answer is among some given types like cancer type 1, cancer type 2 and no cancer.

>  For some learning problems what you really want is not to use like three or five features, but instead you want to use an infinite number of features, an infinite number of attributes, so that your learning algorithm has lots of attributes, or features, or cues with which to make those predictions.

This is problem is also called **Regression Problem**.

**Here is an contradistinction of the two types of problems**

![9: Classification vs RegressionÂ ](https://www.researchgate.net/profile/Yves_Matanga2/publication/326175998/figure/fig9/AS:644582983352328@1530691967314/Classification-vs-Regression.png)

## Unsupervised Learning

Unsupervised Learning: you didn’t classify or label. Instead, the algorithm categorize itself. You give it a data sets and it can automatically find categories. It’s called **cluster algorithm**.

>  Unsupervised learning allows us to approach problems with little or no idea what our results should look like. We can derive structure from data where we don’t necessarily know the effect of the variables.

For examples, we give a data set of many new, it can categorize the different types of news.

## Comparison

Here is a contradistinction of two types Learning.

![Related image](https://lawtomated.com/wp-content/uploads/2019/04/supVsUnsup.png)