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

1. 批量压缩 2000个
2. 现代化ui
3. 占用少的空间(尽量不进行缓存)
4. 每张图可单独优化
5. 可另存为
6. 可删除
7. 输出目录可配置
8. 队列压缩 张数可配置(万一别人是神机呢)  默认 100,
9. 吸顶压缩进度条
10. 合适的logo
11. imagemin, imagemin-jpegoptim, imagemin-pngquant 的安装坑,
  需要在cmd里单独安装(我感觉会在mac环境有bug)
  先暂时这么用,如果出问题就把各个系统环境下的exe程序提取出来
  用node来运行程序