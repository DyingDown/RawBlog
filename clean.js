const fs = require('fs');
const path = require('path');

// 定义需要跳过的文件夹
const dirsToSkip = ['theme-last-guide', 'project', 'books'];

// public 目录的路径
const publicDir = path.join(__dirname, 'public');

// 清理文件夹的函数
function cleanDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!dirsToSkip.includes(file)) {
        cleanDir(fullPath);  // 递归清理子目录
        fs.rmdirSync(fullPath);  // 删除空文件夹
      }
    } else {
      fs.unlinkSync(fullPath);  // 删除文件
    }
  });
}

cleanDir(publicDir);  // 执行清理
console.log('清理完成，跳过了指定文件夹。');
