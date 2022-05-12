#! /usr/bin/env node
let upload = require("../index");

let objName = process.argv[2]; // 更新名字
if (!objName) {
  console.error("请输入更新名称");
  process.exit(0);
}

upload(objName);
