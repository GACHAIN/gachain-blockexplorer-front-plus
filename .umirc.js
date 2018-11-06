import { resolve } from "path";

export default {
  plugins: [
    [
      'umi-plugin-react', {
        antd: true,
        dva: {
          immer: true,
          hmr: true
        },
        // 使用约定式路由后需排除如下路由
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
          ],
        },
        // 禁用组件按需加载
        dynamicImport: false,
        dll: false,
        // hardSource: /* isMac */process.platform === 'darwin',
        // 本地化
        locale: {
          default: 'zh-CN', //默认语言 zh-CN
          antd: true,
          enabled: true
        },
        library: 'react',
        faskClick: true,
      }
    ],
  ],
  publicPath: './', // build 后的静态文件引入路径
  // hash: true,
  history: 'hash',
  ignoreMomentLocale: true,
  theme: {
    "@primary-color": "#00aee6" // 配置 ANTD 的主题颜色
  },
  alias: {
    assets: resolve(__dirname, './src/assets'),
    components: resolve(__dirname, './src/components'),
    models: resolve(__dirname, './src/models'),
    services: resolve(__dirname, './src/services'),
    utils: resolve(__dirname, './src/utils'),
    config: resolve(__dirname, './src/utils/config'),
  }
}