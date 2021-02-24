
## 安装扩展

```
window 用户根目录+ /AppData/Local/Google/Chrome/User Data/Profile 3/Extensions/[扩展id]/[扩展版本号]_0
mac 用户根目录+ /Library/Application Support/Google/Chrome/Default/Extensions/[扩展id]/[扩展版本号]_0

session.defaultSession.loadExtension(chrome扩展地址);

```

## 无法加载本地图片
1. 关闭安全协议

new BrowserWindow 时添加 webPreferences: { webSecurity: false }

2. 添加自定义协议

```
protocol.interceptFileProtocol("file", (req, callback) => {
    const url = req.url.substr(8);
    callback(decodeURI(url));
});
```