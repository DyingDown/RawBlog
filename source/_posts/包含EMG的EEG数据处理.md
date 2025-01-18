---
title: 包含EMG的EEG数据处理(Matlab)
date: 2025-01-17 17:07:46
tags: [EEG, EMG, Matlab, EEGLAB]
categories: [EEG, EMG]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171954245.jpg
description: 本文章介绍了EEG和EMG数据的预处理，由于目的是对EEG和EMG数据在同一时间尺度上的相关性，所以 其中采集的原始数据为TXT格式，且EMG和EEG数据存放在一起。
warning: true
isCarousel: false
---

本文章介绍了EEG和EMG数据的预处理，由于目的是对EEG和EMG数据在同一时间尺度上的相关性，所以 其中采集的原始数据为TXT格式，且EMG和EEG数据存放在一起。直接使用的图形界面在此：[Github Repo: EEG_EMG Process](https://github.com/DyingDown/EEG_EMG_Process)

<!--more--->

本文为单一数据的处理，使用我写的图形UI界面则可以批量处理数据。自动从文件里查找数据进行处理。

## 数据格式简介

在进行EEG数据预处理之前，了解数据的基本格式是关键。以下是采集的EEG和EMG数据的格式示例：

```
# MIX|None|0+True+胫骨前肌+1000|1+True+腓骨长肌+1000|2+True+腓肠肌内侧+1000|3+True+腓肠肌外侧+1000|4+True+股直肌+1000|5+True+股内侧肌+1000|6+True+股二头肌长头+1000|7+True+半腱肌+1000|8+False+胫骨前肌+1000|9+False+腓骨长肌+1000|10+False+肠肌内侧+1000|11+False+肠肌外侧+1000|12+False+EMG13+1000|13+False+EMG14+1000|14+False+EMG15+1000|15+False+EMG16+1000|0+True+P4+80|1+True+CP2+80|2+True+FC5+80|3+True+C3+80|4+True+P3+80|5+True+C2+80|6+True+FC6+80|7+True+C4+80|8+True+CP6+80|9+True+F3+80|10+True+FC2+80|11+True+FC1+80|12+True+F4+80|13+True+CP5+80|14+True+C1+80|15+True+CP1+80
# 13425+24732+39459+51551+66531+77703+93361+104448+119984+130913+145827+157066
0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00
...
```

### 数据格式说明

1. **Header部分**：
   - `MIX|None|`：描述了数据类型（例如MIX可能是混合信号）。
   - `X+True/False+Channel+SampleRate`：表示不同通道的信息，包括是否启用（True/False）、通道名称（如胫骨前肌、P4等）、以及采样率（单位Hz）。
2. **打点标记**：以`#`开头的时间点数据，如 `13425+24732+39459...`。表示实验中的打点信息。但是本次实验中没有用上，因为打点不准确
3. **信号值部分**：每行表示一个时间点的信号值，各列对应不同的通道。

## 数据准备

### 数据滤波

若使用我写的图形界面进行处理，则无需关心，此步骤自动实现。

#### 从文件读取数据

首先使用MATLAB从文件中读取原始数据，可以采用以下代码：

```matlab
fid = fopen(filepath);
% ... verify fid
datafile = textscan(fid, repmat('%f', 1, 32), 'Delimiter', '\t', 'CommentStyle', '#');
```

#### 提取EEG，EMG

根据实验需求，分别提取EEG数据和EMG数据。其中EMG是1-8列，EEG是17-32列

```matlab
EMGData = [datafile{1:8}]; 
EEGData = [datafile{17:32}];
```

#### 滤波处理

- **EEG信号**：关注1-49 Hz频段，此频段包含了主要的脑电信息，例如α波、β波等。消除50 Hz及其倍频的工频噪声。
- **EMG信号**：关注20-150 Hz频段，此频段包含了肌电信号的主要特征。同样需要消除50 Hz工频干扰。

```matlab
function [EMGData, EEGData] = filterData(EMGData, EEGData)
    fs = 1000; % 采样频率

    % 工频干扰滤波：50 Hz及其倍频
    for j = 1:9
        [b, a] = butter(2, [2*(50*j-1)/fs, 2*(50*j+1)/fs], "stop");
        EMGData = filter(b, a, EMGData);
        EEGData = filter(b, a, EEGData);
    end

    % 带通滤波：提取感兴趣频段
    % EMG 20-150 Hz
    [b, a] = butter(4, [2*20/fs, 2*150/fs], "bandpass");
    EMGData = filter(b, a, EMGData);

    % EEG 1-49 Hz
    [b, a] = butter(4, [2*1/fs, 2*49/fs], "bandpass");
    EEGData = filter(b, a, EEGData);
end
```

### 手动修正打点

由于数据打点信息缺失，或者打点数据不够精确，所以需要手动修正打点数据。所以要先把图画出来，根据图找出精确的位置。

```matlab
N1 = length(EMGData(1,:)); % EMG通道数量
N2 = length(EEGData(1,:)); % EEG通道数量
N = N1 + N2; % 总通道数量 24个，对应了24eegemg_sitstand_locs.ced文件里的24个

if isempty(findall(0, 'Name', ['Window ' char(filename)], 'Type', 'figure'))
hFig = figure;  % 如果没有找到已命名的窗口，就新建一个
disp("Didn't find exisiting window, create a new one")
else
hFig = findall(0, 'Name', ['Window ' char(filename)], 'Type', 'figure');
close(hFig);  % 关闭已打开的图形窗口
hFig = figure;  % 重新创建一个新的图形窗口
end

% 数据展示-不展示特定meg通道
yrangeEMG = 200;
yrangeEEG = 100;
t = 0.001:0.001:length(EMGData(:,1))/1000; % 以秒为单位的时间向量
offsets = zeros(N, 1); % 创建一个N*1的竖矩阵，所有元素为0， 用来在y轴体现偏移

set(gcf, 'Name', ['Window ' char(filename)]);
hold on
for j=1:8
%if j == 2 || j == 3
%j=9不需要删除emg通道
if ismember(j, EMGBanList)
result = 0;
else
result = 1;
end
offsets(j) = yrangeEMG*(N1-j);
plot(t, (EMGData(:,j)+offsets(j))*result)
end
for j=1:16
if ismember(j, EEGBanList)
result = 0;
else
result = 1;
end
offsets(N1+j) = yrangeEMG*(N1)+200+yrangeEEG*(16-j);
plot(t, (EEGData(:,j)+offsets(N1+j))*result)
end

end
hold off
channelLabels = {'TA','PL','MG','LG','RF','VM','LBF','Semi',...
'P4','CP2','FC5','C3','P3','C2','FC6','C4','CP6','F3','FC2','FC1', 'F4',...
'CP5','C1','CP1'};
% Ensure offsets are sorted in increasing order
[offsets_sorted, idx] = sort(offsets);
% disp(idx);
channelLabels_sorted = channelLabels(idx);

% Plot settings
set(gca, 'YTick', offsets_sorted, 'YTickLabel', channelLabels_sorted)
xlim([0 30])
ylim([-yrangeEMG yrangeEMG * N1 + yrangeEEG * N2 + 400])
```

获取到打点信息可以手动补回原来的位置。或者另外存进去。

### 生成event信息

需要手动构造需要Event 信息文件

#### 文件格式要求

事件信息文件使用 **纯文本格式**（`.txt`），每一行为一个事件记录，各字段以空格、逗号或制表符分隔。推荐使用**制表符分隔 (tab-separated)**，方便解析。

#### 必要字段及说明

| 字段名     | 数据类型 | 必需 | 描述                                                |
| ---------- | -------- | ---- | --------------------------------------------------- |
| `type`     | 字符串   | 是   | 事件类型标识符，例如 `'Stimulus'` 或 `'Response'`。 |
| `latency`  | 数字     | 是   | 事件在 EEG 数据中的采样点位置（单位：采样点）。     |
| `duration` | 数字     | 否   | 事件持续时间，以采样点为单位，若未知可填 `0`。      |
| `epoch`    | 数字     | 否   | 所属分段编号，仅当 EEG 数据是分段形式时需要填写。   |
| `urevent`  | 数字     | 否   | 链接到源事件数据的编号，用于溯源原始事件。          |

#### 示例内容 (TXT 格式)

文件可以简单存储为 `events.txt`，例如：

```
type    latency duration
a        512     100
b        1024    50
a        2048    100
```

### 剪切数据

在这个步骤直接把数据，依据打点信息，和每个事件的时长，进行剪切，只留下有用的部分。

## 使用EEGLAB进行处理

### 数据导入（set）

```matlab
EEG = pop_importdata('dataformat','ascii','nbchan',0,'data',filepath,'setname',eventFileName,'srate',1000,'pnts',0,'xmin',0,'chanlocs',locs_path);
```

`pop_importdata`

- 这是 EEGLAB 用于导入原始数据的核心函数之一。
- 它允许导入多种格式（如 ASCII、MATLAB 变量）并设置关键参数（如采样率、通道数）。

代码参数说明

| 参数名       | 示例值          | 作用说明                                                     |
| ------------ | --------------- | ------------------------------------------------------------ |
| `dataformat` | `'ascii'`       | 数据格式类型，`'ascii'` 表示数据以文本格式存储；其他值可以是 `'matlab'` 或原生格式。 |
| `nbchan`     | `0`             | 数据的通道数，`0` 表示自动检测通道数（常用）；您也可以根据实际情况直接填写通道数量。 |
| `data`       | `filepath`      | 数据文件路径，包含实际信号数据的文件路径变量；即每一行是一个时间点，列对应通道数据。 |
| `setname`    | `eventFileName` | 数据集的名称，显示在 EEGLAB 图形界面中，用于识别导入的 EEG 数据集。 |
| `srate`      | `1000`          | 数据采样率，单位为 Hz。例如，`1000` 表示每秒采样 1000 次。   |
| `pnts`       | `0`             | 每个通道的采样点数，`0` 表示从文件中自动检测。               |
| `xmin`       | `0`             | 数据起始时间（以秒为单位），`0` 表示时间从第一个采样点开始。 |
| `chanlocs`   | `locs_path`     | 通道位置信息文件路径，常用 `.loc` 或 `.ced` 文件定义通道的空间位置（头皮电极的位置映射）。 |

其中我的chanlocs文件长这样：

```txt
Number	labels	theta	radius	X	Y	Z	sph_theta	sph_phi	sph_radius	type	
1	TA	   	   	   	   	   	   	   	   	EMG	
2	PL	   	   	   	   	   	   	   	   	EMG	
3	MG	   	   	   	   	   	   	   	   	EMG	
4	LG	   	   	   	   	   	   	   	   	EMG	
5	RF	   	   	   	   	   	   	   	   	EMG	
6	VM	   	   	   	   	   	   	   	   	EMG	
7	LBF	   	   	   	   	   	   	   	   	EMG	
8	SEM	   	   	   	   	   	   	   	   	EMG	
9	P4	145	0.331	-78.6	-55.7	56.6	-145	30.4	112	EEG	
10	CP2	141	0.188	-47.1	-38.4	90.7	-141	56.2	109	EEG	
11	FC5	-76.4	0.405	18.6	77.2	24.5	76.4	17.1	83.1	EEG	
12	C3	-100	0.255	-11.6	65.4	64.4	100	44.1	92.5	EEG	
13	P3	-146	0.331	-78.8	 53	55.9	146	30.5	110	EEG	
14	C2	104	0.132	-9.62	-37.7	88.4	-104	66.3	96.6	EEG	
15	FC6	75.9	0.408	19.9	-79.5	24.4	-75.9	16.6	85.6	EEG	
16	C4	99.2	0.261	-10.9	-67.1	63.6	-99.2	43.1	93.1	EEG	
17	CP6	119	0.399	-46.1	-83.3	31.2	-119	18.1	100	EEG	
18	F3	-43.4	0.333	53.1	50.2	42.2	43.4	 30	84.4	EEG	
19	FC2	52.8	0.161	26.4	-34.8	78.8	-52.8	 61	90.1	EEG	
20	FC1	-52.6	0.157	 26	34.1	 80	52.6	61.8	90.7	EEG	
21	F4	43.7	0.341	54.3	-51.8	40.8	-43.7	28.5	85.5	EEG	
22	CP5	-120	0.397	-46.6	79.6	30.9	120	18.6	97.3	EEG	
23	C1	-105	0.126	-9.98	36.2	89.8	105	67.3	97.3	EEG	
24	CP1	-143	0.183	-47.3	35.5	91.3	143	57.1	109	EEG	
```

**注意注意： 原来的文件不长这样。但是直接讲原始的导入EEG会有错误，位置回旋转90度，需要每次导入的时候手动修正。或者修正完后导出修正后的位置图，存下来，后续每次加载使用。**

### 坏导插值

#### 画出波形图

1. 使用代码绘制：EEGLAB 提供的函数， **EEG 时域波形图** (`pop_plotdata`) 

   ```matlab
   pop_eegplot(EEG, 1, 1, 0); % 绘制数据的图形
   ```

   #### 参数说明

   - **`EEG`**: EEGLAB 的数据结构，包含导入的数据。
   - **`1`（连续信号模式）**: 绘制原始连续信号。
   - **`1`（频道索引标注）**: 在图上显示通道标注。
   - **`0`（分离窗口）**: 是否将每个通道分开显示在单独的窗口中。`0`表示在一个窗口显示所有通道。

2. 在图形界面进行绘图

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171828124.png" alt="image-20250117182757708" style="zoom: 67%;" />

#### 找出坏导

根绝图判断哪个通道的数据损坏，判断方法如下：

**数据波形异常**

- **信号平直**：通道数据完全为一条水平线，说明传感器可能已断开连接或信号丢失。
- **高幅度异常**：通道信号显示了远高于其他通道的持续高幅度振幅，通常是接触不良或设备问题。
- **高频噪声**：单个通道的信号中有明显不规则的高频信号。

**地理不一致性**

查看电极分布的头皮地图，损坏的通道通常在头皮拓扑图上呈现孤立的高/低信号区域，与相邻通道不一致。

#### 插值坏导

1. 用代码进行插值：

   ```matlab
   EEG_interp = pop_interp(EEG, selectedIndices, 'spherical')
   ```

   参数解释：

   - `EEG`: 这是你原始的 EEG 数据结构，包含了所有信号和信息
   - `selectedIndices`: 一个包含索引的数组，对应了需要进行插值的电极。
   - `'spherical'`: 这个参数指定了插值方法。在这里，选择了 `'spherical'` 插值方式。它是一种通过球面坐标系统进行插值的方法，适合当电极的位置遵循球面几何结构时。这种插值方法会考虑到电极的三维空间布局，依据其在球体表面的空间关系来进行插值，而不是简单地用线性方式连接相邻电极的值。

2. 手动插值

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171840066.png" style="zoom:67%;" />

   选择需要插值的通道：

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171842031.png" style="zoom:67%;" />

**注意：需要一次性对所有的通道进行插值，不可以分多次进行**

### 去除伪影和噪音

#### ICA（独立成分分析）

使用如下代码执行ICA

```matlab
EEG = pop_runica(EEG, 'icatype', 'runica', 'extended', 1, 'interrupt', 'on', 'chanind', EEG_chans, 'pca', restLen);
```

参数解释：

- `icatype`, runica：使用 RunICA 算法进行独立成分分析。
- `extended`, 1：启用扩展模式（增加维度，适用于多通道数据）。
- `interrupt`, on：允许中断 ICA 计算。
- `chanind`, EEG_chans：指定参与 ICA 计算的通道（因为EEG，EMG数据存在一起，所以要选出来EEG）。
- `pca`, restLen：使用 PCA 对数据进行降维，`restLen` 表示主成分数（EEG电极数量-插值过的坏导数量）。

该步骤的目标是从 EEG 数据中提取独立成分，以便去除如眼动、肌电等伪影，留下更多反映神经信号的成分。

或者使用手动的方式：

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171853703.png" style="zoom:67%;" />

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171855039.png)

选择EEG数据可以通过图中两种方式，前提是我已经给我的通道进行了类别标记。

执行过程中会弹出窗口，可以随时interrupt中断。

#### 标记伪影

给数据打上标签，对各种伪影类别进行标记

```matlab
EEG_temp = EEG;  % 使用一个临时的 EEG 数据避免直接修改原始数据
EEG_temp = pop_icflag(EEG_temp, [
    0.2 0.6;   % Brain: 大脑活动成分
    0.1 0.8;   % Muscle: 肌电伪影
    0.2 0.7;   % Eye: 眼动伪影
    0.3 0.7;   % Heart: 心电伪影
    0.4 0.6;   % Line Noise: 电源噪声
    0.1 0.9;   % Channel Noise: 信号通道噪声
    0.0 0.9    % Other: 其他伪影
]);
```

手动执行：
<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171906151.png" style="zoom:67%;" />

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171907300.png" style="zoom: 50%;" /><img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171907453.png" style="zoom:67%;" />

标记完之后会弹出来标记好的内容，这个图没什么特别的用处可以直接关掉，是自动分析伪影之后画出来的分类。

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171910670.png" style="zoom:67%;" />

然后使用flag components as artifact功能，自动标记伪影

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171918905.png" style="zoom:67%;" />

让给不同的类别设置阈值

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171919555.png" style="zoom:67%;" />

根据自己的数据设置需要的阈值。我自己的数据设置的是每个类别都是0.55，因为我的数据干扰因素很多。

#### 删除伪影

```matlab
rejected_comps = find(EEG_temp.reject.gcompreject > 0);
EEG_temp = pop_subcomp(EEG_temp, rejected_comps);
```

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202501171922714.png" style="zoom:67%;" />

至此，所有的数据处理部分都已经完成了。