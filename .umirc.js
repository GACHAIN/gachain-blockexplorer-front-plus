import { resolve } from "path";

export default {
  sass:{},
  plugins: [
    [
      'umi-plugin-react', {
        antd: true,
        dva: {
          immer: true,
          hmr: true
        },
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
          ],
        },
        dynamicImport: false,
        dll: false,
        // hardSource: /* isMac */process.platform === 'darwin',
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
  outputPath: "./build",
  alias: {
    utils: resolve(__dirname, './src/utils'),
    config: resolve(__dirname, './src/utils/config')
  },
  ignoreMomentLocale: true,
  "theme": {
    "@primary-color": "#00aee6"
  },
}