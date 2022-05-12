# 轻量级更新脚本

## 简介

​	通过简单的配置，就可以一行命令将当前项目打包到服务端完成前端项目的更新，适用于个人项目



## 使用教程

1. **全局安装依赖**

```bash
npm i quickupdate -g
```



2. **在项目中创建配置文件`update.config.js`**

```js
/**
 * 获取更新配置
 * @param {String} objName 当前更新名称 
 * @returns
 */
module.exports = (objName) => {
  return {
    host: '0.0.0.0', // 填写服务器地址
    username: 'root', // 服务器用户名
    password: 'nihaokeai1216.', // 服务器密码
    buildCmd: 'npm run build', // 更新命令名称
    buildPath: '/admin', // 你的项目打包路径例如 /dist
    uploadDir: '/usr/share/nginx ', // 在服务器的文件存放路径，例如填写的
    objname: objName, // 固定写法 是执行更新脚本后面的名称（下面会见到）
    backObject: '', // 备份的文件夹名称 将会被自动备份都h5_back中 如果不填就不会再服务器上备份
  }
}

```

3. **开始第一次通过命令完成更新**

> 假设你的项目在服务器中的路径为 /usr/share/nginx/admin，则更新命令为

```bash
quickupdate admin
```

