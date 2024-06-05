# 轻量级更新脚本

## 简介

​ 通过简单的配置，就可以一行命令将当前项目打包到服务端完成前端项目的更新，适用于个人项目

​ 避免本地打包，再 🔗ssh 等后面一系列的繁琐操作，大幅提高更新效率

## 使用教程

1. **全局安装依赖**

```bash
npm i quickupdate -g
```

2. **在项目中创建配置文件`update.config.cjs`**

```js
/**
 * 更新配置
 * @param {String} objName 当前更新名称
 * @returns
 */
module.exports = (objName) => {
  return {
    host: '0.0.0.0', // 填写服务器地址
    username: 'root', // 服务器用户名
    password: '123456', // 服务器密码
    port: '22', // 端口号
    buildCmd: 'npm run build', // 更新命令名称
    buildPath: '/admin', // 你的项目打包路径例如 /dist
    uploadDir: '/usr/share/nginx ', // 在服务器的文件存放路径，例如填写的
    objname: objName, // 固定写法 是更新脚本后面的名称（下面会见到）
    backObject: '', // 备份的文件夹名称 如果更新命令是 quickupdate dist 这里填写了dist，将会将历史线上代码自动备份到dist_back中 如果不填就不会在服务器上备份
  }
}
```

3. **开始第一次命令更新**

> 假设你的项目在服务器中的路径为 /usr/share/nginx/admin，配置文件 uploadDir 填写为/usr/share/nginx，则更新命令为

```bash
quickupdate admin 或者 qup admin // qup为quickupdate的简写
```

之后将会出现询问

```
您正在将代码更新到服务器,回车将会继续执行
```

按回车即可，之后变回执行打包 发送到服务器的脚本，结束后将会看到

```
总共 x.xx MB,完成源代码压缩
程序zip上传成功,判断线上是否需要备份
当前无需备份,直接解压上传压缩包
项目包完成解压,admin项目部署成功了!
项目更新时长12.663s
本地缓存zip清除完毕
线上项目.DS_Store删除完成
```

如果看到这个就恭喜您更新成功了，完成了一行命令将本地代码打包到服务器

### 注意！

- 不要忘记将写入敏感信息的文件`update.config.cjs`加入`.gitignore`，否则你的敏感信息将会被上传到代码库中！！

- 如果发现上传到服务端的 zip 文件没有没解压，请前往服务器中测试 unzip 命令是否存在（输入 unzip 然后回车），如果提示`unzip: command not found`，就执行命令进行安装`yum install -y unzip zip`。

## 高阶配置

### 限制更新名称

> 命令中最后附带的更新名称将会被传回你的配置函数，所以可以在函数中可以进行逻辑校验

```js
let whiteList = ['dist']
/**
 * 更新配置
 * @param {String} objName 当前更新名称
 * @returns
 */
module.exports = (objName) => {
  if (!whiteList.includes(objName)) {
    console.log('当前项目不存在您输入的更新命令,请检查更新名称')
    process.exit(0)
  }
  return {
    // ....
  }
}
```

### 多环境部署

> 假设您的前端项目存在多个环境 你希望可以通过命令备份正式环境代码，其他环境忽略，这可以启用参数 backObject

```js
let whiteList = ['dist', 'dist-pre']
/**
 * 更新配置
 * @param {String} objName 当前更新名称
 * @returns
 */
module.exports = (objName) => {
  if (!whiteList.includes(objName)) {
    console.log('当前项目不存在您输入的更新命令,请检查更新名称')
    process.exit(0)
  }
  return {
    // ....
    backObject: 'dist',
  }
}
```

祝你开发愉快！
