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