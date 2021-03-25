
## 2021-2-24 安装扩展

```
window 用户根目录+ /AppData/Local/Google/Chrome/User Data/Profile 3/Extensions/[扩展id]/[扩展版本号]_0
mac 用户根目录+ /Library/Application Support/Google/Chrome/Default/Extensions/[扩展id]/[扩展版本号]_0

session.defaultSession.loadExtension(chrome扩展地址);

```

## 2021-2-24 无法加载本地图片
1. 关闭安全协议

new BrowserWindow 时添加 webPreferences: { webSecurity: false }

2. 添加自定义协议

```

protocol.interceptFileProtocol("file", (req, callback) => {
    const url = req.url.substr(8);
    callback(decodeURI(url));
});
```



## 2021-3-3 imagemin在electron里面有兼容问题 

```

"imagemin-jpegtran"
"imagemin-pngquant"

在electron里面有兼容问题 无法解决 再寻找其他插件
```

## electron-store

electron-store@7 出现 该问题
`ERROR in node_modules/conf/dist/source/index.d.ts:5:5 Private identifiers are only available when targeting ECMAScript 2015 and higher.`

降级到5.1.0即可


## electron 打开文件夹
使用shell模块  调用 showItemInFolder


## url模块提示废弃 改用 URL类
[官网地址](http://nodejs.cn/api/url.html#url_the_whatwg_url_api)
