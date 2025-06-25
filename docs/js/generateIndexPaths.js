const fs = require("fs");
const path = require("path");

const docsDir = "./docs/doc"; // 你的文档目录
const mdFiles = [];

function scanDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath); // 递归扫描子目录
    } else if (file.endsWith(".md")) {
      // 将路径的/docs/替换为''且将所有的\\替换为/,将.md替换为''
      const newPath = fullPath
        .replace("docs", "")
        .replace(/\\/g, "/")
        .replace(".md", "");
      mdFiles.push(newPath);
    }
  });
}

scanDir(docsDir);
console.log(JSON.stringify(mdFiles, null, 2));
