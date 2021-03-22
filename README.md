# 2021-3-19
 * 异步队列压缩
 * 压缩进度条
 * 压缩完成渲染视图

最近有点事情要忙，暂时不更新了。

# image_compress

压缩png/jpge


## 主要目录结构

```
image_compress
├─src
|  ├─less less变量集合
|  ├─environments 环境配置
|  ├─assets 静态资源
|  ├─app 视图集合
|  |  ├─core 
|  |  |  ├─core.module.ts
|  |  |  ├─services
|  |  |  |    ├─index.ts
|  |  |  |    ├─electron 子进程配置
|  |  |  |    |    ├─electron.service.spec.ts
|  |  |  |    |    ├─lectron.service.ts
├─electron 主进程配置
|    ├─devtools.ts 扩展集合
|    ├─index.ts 集合导出
|    ├─protocol.ts 自定义协议集合

```


## 任务
- [x] 批量压缩 2000个
- [x] 压缩进度条
- [ ] 输出目录可配置
- [ ] 压缩中，继续拖入图片或者文件夹自动加入到队列中
- [ ] 现代化ui，每张图可单独优化
- [ ] 可另存为
- [ ] 可删除
- [ ] 同时压缩张数可配置(万一别人是神机呢)  默认 同时压缩10个(进程),
- [ ] 合适的logo