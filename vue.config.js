// 1. npm run build 打包代码
// 2. 把代码给后端
// 3. 后端把前端代码放入后端工程
// 4. 后端重启后端服务
// * 容器出问题的就是下面的配置。一定要是根路径下
module.exports = {
  publicPath: '/jingdong'
}