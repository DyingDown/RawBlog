---
title: HEXO主题开发——构建主题框架
date: 2020-12-18 17:04:40
tags: [hexo-theme-last, develope]
categories: Hexo Theme
postImage: https://s1.ax1x.com/2020/04/26/JcuThQ.png
description: 主题重构Day1-2，详细地写一些搭建环境和框架遇到的bug，以己如何解决方法。详细记录了一些开发时的心理状态作为日后的乐趣。
isCarousel: true
---

## 前言

之前想写主题，纯粹是因为HEXO没发现我喜欢的主题，于是就想自己设计。但是抓耳挠腮了一两星期，仍然不知道怎么开始。最后大佬给我推荐了[melody的作者的博文](https://molunerfinn.com/make-a-hexo-theme/#用Yeoman来生成主题结构)，受益匪浅。

从他文章里看到了Yeoman，可以快速创建一个基本的框架。终于，我这个小白结束了手足无措的两星期。有了它给我创建好的框架，我就会比葫芦画瓢往里面添加了。

于是，这次从重构，仍然沿袭melody的文章的一些方法创建基本的框架。

## 环境的安装

先创建一个干净的环境。新开一个博客文件，init文件，配置上传的地点。

由于主题还用`pug`和`stylus`渲染引擎，所以安装引擎

并且还需要`hexo-server`和`hexo-browsersync`帮助预览，所以也安装

```
yarn add hexo-server hexo-browsersync hexo-renderer-jade hexo-renderer-stylus
```

安装完之后，再`hexo s`会出现如下的：

```
INFO  Validating config
INFO  Start processing
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
[Browsersync] Access URLs:
 ----------------------------------
          UI: http://localhost:3001
 ----------------------------------
 UI External: http://localhost:3001
 ----------------------------------
```

这里就发现`Browsersync`生效了。

然后就是生成框架了。还是直接用Yeoman来自动创建一下，方便。

```
npm install yo -g
npm install generator-hexo-theme -g
```

### yo 不是内部或者外部命令

但是我发现这次装这个遇到了bug。装完说yo不是内部或者外部命令。。。

我记得我第一遍可是非常顺利的，一下就装上了。然后查了一下，说要配置环境变量。Windows太麻烦了，而且找到了一个方法后，配置完了，重启了还是不生效。。。

我以为是因为我之前用的Linux，才那么顺利，于是又切换到Linux去，发现还是command not found……

而且到了Linux里，还说环境变量的问题，然后我又试了，还是不对。我又用用yarn进行安装，这回没报错，但是还是not found

在Linux下我又尝试了好多方法。。。失败告终，太难过了，凌晨量点半在这解决问题，搞不出来怎么能睡到着。。。之前为啥听顺利的啊？

第二天终于解决了那个问题。在Windows上，原来是我环境变量添加完之后，一直没最终确定而是直接叉掉了，所以一直每天加上….

具体如何添加，就是再`C:\Users\XXX\AppData\Roaming\npm`里找一下看有没有`yo.cmd`，要是有就直接把这个路径添加到系统变量`PATH`里面。确定之后重启。如果没有，就找你的`yo.cmd`在哪个目录下，就去把哪个路径添加到环境变量里。

### hexo 报错

好不容易解决了这个问题。然后我发现，hexo命令又不好使了。。。

```
internal/modules/cjs/loader.js:983
  throw err;
  ^

Error: Cannot find module 'C:\Users\o_oyao\AppData\Roaming\npm\node_modules\hexo-cli\bin\hexo'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:980:15)
    at Function.Module._load (internal/modules/cjs/loader.js:862:27)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:74:12)
    at internal/main/run_main_module.js:18:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
```

我这次甚至搜不到解决方法了。。。第一次遇见这种问题。。。

我想起来，可能是为了解决上一个bug我uninstall了一下npm。然后我去看我的npm文件夹，发现里面去确实没有hexo相关的东西而且只剩下了yo。

然后尝试用`npm install hexo-cli -g`，发现报错了。

```
npm ERR! code ENOTFOUND
npm ERR! errno ENOTFOUND
npm ERR! network request to https://registry.npm.taobao.org/hexo failed, reason: getaddrinfo ENOTFOUND registry.npm.taobao.org
npm ERR! network This is a problem related to network connectivity.
npm ERR! network In most cases you are behind a proxy or have bad network settings.
npm ERR! network
npm ERR! network If you are behind a proxy, please make sure that the
npm ERR! network 'proxy' config is set properly.  See: 'npm help config'

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\o_oyao\AppData\Roaming\npm-cache\_logs\2020-12-19T04_21_26_487Z-debug.log
```

看起来貌似是我之前配置的淘宝源的问题。好吧，我不知道怎么解决，来试试用yarn装吧。

然而yarn给我卡在了这一步

```
[4/4] Building fresh packages...
[6/7] ⠐ hexo-math
[7/7] ⠐ yo
[-/7] ⠈ waiting...
[-/7] ⠈ waiting...
[-/7] ⠈ waiting...
```

接着开始尝试从新添加一边淘宝镜像

```
npm --registry https://registry.npm.taobao.org install express
```

再次安装，报错：

```
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.3 (node_modules\hexo-cli\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

npm ERR! code EEXIST
npm ERR! path C:\Users\o_oyao\AppData\Roaming\npm\node_modules\hexo-cli\bin\hexo
npm ERR! dest C:\Users\o_oyao\AppData\Roaming\npm\hexo
npm ERR! EEXIST: file already exists, cmd shim 'C:\Users\o_oyao\AppData\Roaming\npm\node_modules\hexo-cli\bin\hexo' -> 'C:\Users\o_oyao\AppData\Roaming\npm\hexo'
npm ERR! File exists: C:\Users\o_oyao\AppData\Roaming\npm\hexo
npm ERR! Remove the existing file and try again, or run npm
npm ERR! with --force to overwrite files recklessly.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\o_oyao\AppData\Roaming\npm-cache\_logs\2020-12-19T04_32_40_565Z-debug.log
```

这次我发现`hexo`和`hexo-cli`文件都出现在了npm目录下一瞬间，然后就又消失了。然后就是会出现那个报错。

仔细阅读报错（虽然完全读不懂），但是我发现里面有一句话：`with --force to overwrite files recklessly`。然后结合前面的报错，说什么什么已存在（明明不存在啊。。。），然后就觉得，既然它认为存在，那就强制overwrite一下呗。

```
npm install hexo-cli -g --force
```

然后，果然成功了！！！！

```
npm WARN using --force I sure hope you know what you are doing.
C:\Users\o_oyao\AppData\Roaming\npm\hexo -> C:\Users\o_oyao\AppData\Roaming\npm\node_modules\hexo-cli\bin\hexo
+ hexo-cli@4.2.0
added 66 packages from 338 contributors in 7.271s
```

这是成功的信息，并且npm文件夹下面成功出现了`hexo-cli`文件夹。

再测试`hexo`命令，这次是真的有了。

## yo创建框架

```
yo hexo-theme
```

第三步会让你选，你要什么什么东西，反正我也没看懂，也不知道到底有什么用，记得上次貌似没有遇见这个问题。然后为了保险起见，全选了。（你的话你就自己看着办了）。

```
--=[ generator-hexo-theme ]=--
? What is the theme name? last
? Which template language to use? pug
? Which stylesheet language to use? styl
? Other technical features Hexo scripts directory (hexo plugins), EditorConfig file .editorconfig, node npm package.json
   create package.json
   create layout\archive.pug
   create layout\category.pug
   create layout\index.pug
   create layout\page.pug
   create layout\post.pug
   create layout\tag.pug
   create layout\includes\layout.pug
   create layout\includes\recent-posts.pug
   create source\favicon.ico
   create source\css\last.styl
   create source\js\last.js
   create scripts\readme.md
   create .editorconfig
   create _config.yml
```

OK，到这里算事生成主题框架了，注意，一定要在themes文件里的主题文件夹里（我的是hexo-theme-last）执行这个命令，不然就创建错位置了。

最后再预览一下，就能看到页面框架了。复制几篇博文进去。