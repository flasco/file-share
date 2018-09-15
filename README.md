# file-share
a webApp powered by react &amp; dva &amp; antd

## init-version
最开始的初始化项目在branch: `init-version`中，构建项目可以直接clone该分支然后修改remote origin

## todoList
- [x] 搭建好项目的结构
- [ ] 明确项目的pages
- [x] 完善用户面板
- [x] 完善首页
- [ ] 完善搜索结果页 [doing]
- [ ] 完善搜索结果详情页 [important]
- [ ] 完善个人中心页
- [ ] 完善文件管理页
- [ ] 

## dependencies
```bash
node 7.6+
```

## project development process
下载好本项目之后需要执行下面的命令
```bash
yarn install # 安装项目依赖
```
值得一提的是如果想强行通过husky的commit检测的话，在commit参数之后加一个 -n就可以强行提交了

```bash
git commit -m "test" -n # just like this
```

## commit rules

* feat: 新功能(feature)
* fix：bug修复
* merge: 合并分支
* docs：文档修改
* style：缩进，空格，换行，大小写等调整（不影响代码运行的变动）
* refactor：代码重构（代码结构调整，不影响功能）
* perf：性能优化（improve performance）
* test：增加测试
* chore：系统构建，打包