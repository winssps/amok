# amok


## 项目说明：

- 基于 [Node.js](https://nodejs.org)、[MongoDB](https://www.mongodb.org)、[OSS文件存储系统](https://oss.console.aliyun.com/) 开发的系统
- 基于 [Antd](https://ant.design/index-cn)、[Webpack](http://webpack.github.io)，[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md) 构建前端
- 基于 ECMAScript 6、jsx ，前端使用dva使用的jsx编程风格，后端使用ES6语法。

## 目录结构：


##  安装部署：

克隆文件：
```
git clone git@github.com:winssps/amok.git
cd amok
```

后端服务：
```
1. 安装 `Node.js[必须]` `MongoDB[必须](最新版)` 
2. 启动 MongoDB 和 
3. 进入根目录下执行 `yarn install` 安装项目所需依赖包
3. 执行 `yarn start` 启动后端服务
```

前端服务：
```
1. 首次启动项目未找到 build 文件
2. 进入 app 目录下执行 `yarn install` 安装项目所需依赖包
3. 执行 `yarn start` 编译前端页面相关文件
4. 打开浏览器访问 `http://localhost:8000`
```



##  贡献

有任何意见或建议都欢迎提 issue

##  License

MIT
