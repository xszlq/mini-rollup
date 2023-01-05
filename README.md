研究 rollup 打包以及 tree-shaking 原理  
本仓库代码基于 rollup 初版源码

## 核心实现

每个文件都是一个模块，是一个 Module 实例。核心有 Bundle 类、Ast 分析、Module

- 整体关系

  - Bundle 是门面，依赖 Module、MagicString
  - Module 依赖 ast 分析，结果都保存在成员变量里

- ast 分析
  - 转换 ast。基于 acorn 的 parse 把入口文件转成 ast
  - 标记 imports 的模块和 exports。遍历 ast，找到 import 和 export，但这时候并不会加载 import 模块。保存到 module.imports 和 module.exports.
  - 生成模块 scope。遍历 ast 节点，生成模块的 scope，并标记非模块内的 scope，保存到 module.\_dependsOn 对象内，这是 treeShaking 的关键，标记只使用了的模块。
- 生成代码
  - 加载依赖的模块。基于 ast 分析，递归加载依赖模块，并放到 module.imports[moduleName].module 对象下，这就形成了一种树形结构
  - 生成代码。基于 module.\_dependsOn 对象里用到的模块，加载对应代码（这是**_实现 treeShaking 的核心_**，未使用的代码不会放到 bundle 中）。

## 本地调试

- 安装依赖，yarn/ npm 都可以
- 添加断点，src 中 js 添加断点
- 运行，用 node 运行 demo 下的 test.js
