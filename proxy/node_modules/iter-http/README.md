## 基于nodejs的http服务器

### 基本功能
1. 能开启web服务，加载各种web资源
2. 能自动分配可用端口，也可以配置端口
3. 能加载json文件并模拟网速
4. 启动时能自动打开默认浏览器浏览，方便调试
5. 支持常用文件的MIME类型
6. 可配置主页
7. 允许跨域请求，方便其它项目测试时调用模拟接口的JSON数据
8. host默认为本地IP(方便生成二维码手机扫描预览)
9. 支持304指定资源的缓存响应
10. 支持对特定文件启用Gzip压缩
11. 支持全局快捷命令调用
12. 支持断点续传

### 安装
```
npm install iter-http -g
```
这里一定要安装到全局，才可以在任意目录下开启http服务
安装时也会自动安装依赖包 `minimist` 用于解析命令参数

### 显示帮助
```
iter-http --help
Usage:
  iter-http --help // print help information
  iter-http // random a port, current folder as root 随机一个可用端口，以当前目录为根目录
  iter-http 8888 // 8888 as port 指定一个端口
  iter-http -p 8989 // 8989 as port 指定一个端口
  iter-http -h index.htm // index.htm as home page 指定一个home页名称
  iter-http -d dist // dist as root 指定root根目录的名称
```