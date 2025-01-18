---
title: EEG-EMG-ProcessingPipeline工具使用说明
date: 2025-01-18 00:02:22
tags: [EEG, EMG, EEGLAB]
categories: [EEG, EMG]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501180039206.png
description: 我自己开发的一个针对EEG EMG数据自动化处理流程的使用说明。
warning: false
isCarousel: false
---

我自己开发的一个针对EEG EMG数据自动化处理流程的使用说明。

## 数据说明

该工具是针对txt格式的数据进行的处理，其中EEG和EMG数据混合在一起。并且该实验只有两个事件，a和b，数据格式如下：

```txt
# MIX|None|0+True+胫骨前肌+1000|1+True+腓骨长肌+1000|2+True+腓肠肌内侧+1000|3+True+腓肠肌外侧+1000|4+True+股直肌+1000|5+True+股内侧肌+1000|6+True+股二头肌长头+1000|7+True+半腱肌+1000|8+False+胫骨前肌+1000|9+False+腓骨长肌+1000|10+False+肠肌内侧+1000|11+False+肠肌外侧+1000|12+False+EMG13+1000|13+False+EMG14+1000|14+False+EMG15+1000|15+False+EMG16+1000|0+True+P4+80|1+True+CP2+80|2+True+FC5+80|3+True+C3+80|4+True+P3+80|5+True+C2+80|6+True+FC6+80|7+True+C4+80|8+True+CP6+80|9+True+F3+80|10+True+FC2+80|11+True+FC1+80|12+True+F4+80|13+True+CP5+80|14+True+C1+80|15+True+CP1+80
# 13425+24732+39459+51551+66531+77703+93361+104448
0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00
...
```

其中第二行是打点信息。

为了能使得流程自动发现数据，数据依据如下存放格式

```
├─code_locs
├─subj0
│  └─original
│       ├─b.txt
│  		└─a.txt
└─subj1
    └─original
```

subj0, subj1分别表示数据采集源，将数据直接存在original文件夹下。



## 安装要求

使用Matlab进行数据分析，并需要预先安装EEGLAB

## 配置信息

1. `dataBaseFolder`：该项指定了存储所有原始数据文件的根目录。在这个目录中，程序将会查找并加载包含脑电（EEG）和肌电（EMG）混合数据的 .txt 文件。
2. `avgDatasFolder`：该项指定了存储经过处理后的数据，特别是用于计算平均数据时存放结果的目录。所有经过清洗或处理后的数据将保存至此文件夹。
3. `startPoint`：指定了事件的起始点定位方式。
   `isPeak `布尔值， 属性表示打点位置是否为信号的峰值（中间）。若为 true，则事件标记将位于信号的最中间峰值。
4. `Fs`：此项指定采样率，即每秒钟读取多少数据点。一般用于数据预处理步骤中。
5. `artifacts`：该部分指定了伪影（artifacts）的阈值，用于从数据中识别并去除无效的信号。每一类伪影均指定了其上限与下限，用于过滤符合条件的数据。
   每个类别包含：
     `lower_limit`：此伪影种类的下限值，用于过滤信号值小于此阈值的数据。
     `upper_limit`：此伪影种类的上限值，用于过滤信号值大于此阈值的数据。
     伪影类别说明：
   -   Brain：脑电伪影。
   -   Muscle：肌电伪影。
   -   Eye、Heart、Line Noise、Channel Noise、Other：其余伪影类别，分别对应眼部伪影、心脏伪影、线噪声、通道噪声以及其他伪影类型。

## 流程功能介绍

运行main.m文件

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501172136204.png" style="zoom:50%;" />

共有五个功能：

1. **Point Info Man Corr**： 通过展示波形图，对打点数据进行补充或者修正，同时自动进行滤波和剪切
2. **EEGLAB Preprocessing**（EEGLAB预处理）：将数据导入EEGLAB中，进行坏导插值和去除伪影
3. **Calculate Data**（计算数据）：计算EEG和EMG数据的相关性，使用
4. **Plot Data**（绘制数据）绘制相干性的图
5. **Plot Coh Avg**（绘制相干平均）：计算并绘制一组数据的平均相干性和图

### Point Info Man Corr

点击该按钮会出现如下图形界面：

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501172304731.png" style="zoom: 67%;" />

并且会展示，它所找到的第一个数据画出来图形：

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501172309990.png" style="zoom:67%;" />

输入窗口解释：

- TL_a表示事件A的时长，单位ms
- TL_b：事件B的时长
- Start points：大点信息，单位ms，数据用英文逗号分割
- Banned EMG List：不显示EMG通道的哪些通道，数据按照y轴顺序，输入数字，表示EMG通道里的第几个通道，英文逗号分割
- Banned EEG List：同上，不显示EEG通道里的第几个通道。

按钮解释：

- Save & Update figure: 保存打点信息并更新图
- Update Banned Channel： 修改了Banned EEG EMG List之后点击该按钮更新图
- View Cutted Figure：查看剪切过的数据的样子（剪切并表示把无用的事件信息之外的部分数据剪切掉）
- Close：关闭当前数据文件，但是不会保存任何信息，需要先Save & Update figure才会保存输入窗口修改的信息。 仅关闭表示暂时搁置当前数据，下次打开还能看到它
- Mark Finish Permanently：将该数据标记完成，下次不再展示
- Discard this file：该数据太乱无法使用，直接抛弃该数据

### **EEGLAB Preprocessing**

#### 导入数据

点击小窗口里的 `EEGLAB Preprocessing` 按钮会自动查找切片好的数据，并导入EEGLAB，导入好的数据存储在`subjx/set/beforeInterp`下面

#### 坏导插值

然后回自动进行EEGLAB里的第一步，坏导插值

首先展示当前数据的波形图：

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501172321558.png" style="zoom:50%;" />

然后展示一个新的操作界面：

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501172322451.png" style="zoom: 67%;" />

按钮解释：

- p4~cp1： 点击按钮，变成红色，表示该通道被选中，选中表示要进行插值
- Interp Sel Chann：表示对选中的通道进行插值，每次执行都是针对原始数据的副本进行插值，所以这个步骤可以无限执行且不保存
- Plot Unsel Chann：画出没有进行插值的电极的波形图
- Plot aft Interp：画出插值过后的波形图
- Done & Save：结束退出并保存

插值过的set数据存储在`subjx/set/afterInterp`目录下

#### ICA

上一步按下Done & save按钮之后，会自动进入到下一步执行ICA，并自动执行，跑完ICA的数据存储如下`/subjx/set/afterICA/`

#### 去除伪影

执行完后回自动进行伪影标记阶段，出现如下图形窗口：

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501172336921.png" style="zoom:67%;" />

点击 Flag Artifacts会对数据进行伪影标记，其中这一步默认展示的阈值在前面的config文件里设置。

之后会出现新的弹窗：

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501172338042.png" style="zoom: 67%;" />

该弹窗显示对哪些通道进行了标记，按钮解释如下：

- Preview Rejection：展示去除伪影之后的波形图
- Confirm：确定，表示删除伪影，并保存
- Cancel：取消，想要重新设置阈值

去除伪影之后的数据存储位置如下：`/subjx/set/afterArtifact`

### **Calculate Data**

这一步是用来自动计算EEG和EMG数据的时频域分析，采用的是所有subject，`/subjx/set/afterArtifact`下的所有set文件

采用Morlet小波进行小波连续变换，得到相关性矩阵。

算出来的结果在：`rootDataDir/CMCresults_lowerLimb/subjx/`

### **Plot Data**

绘制相关性的图，绘制完成会自动保存，关闭，绘制下一个。绘制内容如下所示：

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501172351494.png)

图片存储在：`dataRootDir/CMCplots_lowerLimb/subjx`

### **Plot Coh Avg**

计算相关性的平均数据，并得出平均后的时频域图，一般执行这个步骤是因为上图显示的相关性太不均匀了。

要将要计算的mat数据存放在一起，一个文件夹下。

点击这个按钮会让你选择要计算平均的数据的目录。

执行出来的结果存放在你选择的目录下。