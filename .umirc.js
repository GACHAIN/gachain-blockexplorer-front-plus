import { resolve } from "path";

export default {
    plugins: [
        [
            "umi-plugin-react",
            {
                antd: true,
                dva: {
                    hmr: true
                },
                dynamicImport: {
                    webpackChunkName: true
                },
                // 使用约定式路由后需排除如下路由
                routes: {
                    exclude: [
                        /model\.(j|t)sx?$/,
                        /service\.(j|t)sx?$/,
                        /models\//,
                        /components\//,
                        /services\//
                    ]
                },
                // 禁用组件按需加载
                // dynamicImport: true,
                // dll: {
                //     exclude: [],
                //     include: [
                //         "dva",
                //         "dva/router",
                //         "dva/saga",
                //         "dva/fetch",
                //     ]
                // },
                // hardSource: /* isMac */process.platform === 'darwin',
                // 本地化
                locale: {
                    default: "zh-CN", //默认语言 zh-CN
                    antd: true,
                    enabled: true
                },
                library: "react",
                faskClick: true
            }
        ]
    ],
    proxy: {
        "/api/v1/exchange_rate": {
            target: "https://data.block.cc/",
            changeOrigin: true,
            pathRewrite: { "^/api/v1/exchange_rate": "/api/v1/exchange_rate" }
        }
    },

    publicPath: "./", // build 后的静态文件引入路径
    hash: true,
    // 开启hash路由
    history: "hash",
    ignoreMomentLocale: true,
    theme: {
        "@primary-color": "#00aee6" // 配置 ANTD 的主题颜色
    },
    alias: {
        assets: resolve(__dirname, "./src/assets"),
        "@components": resolve(__dirname, "./src/components"),
        "@models": resolve(__dirname, "./src/models"),
        "@services": resolve(__dirname, "./src/services"),
        public: resolve(__dirname, "public"),
        "@styles": resolve(__dirname, "./style"),
        utils: resolve(__dirname, "./src/utils"),
        config: resolve(__dirname, "./src/utils/config")
    },
    urlLoaderExcludes: [/\.svg$/],
    chainWebpack(config) {
        config.module
            .rule("svg")
            .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
            .use([
                {
                    loader: "babel-loader"
                },
                {
                    loader: "@svgr/webpack",
                    options: {
                        babel: false,
                        icon: true
                    }
                }
            ])
            .loader(require.resolve("@svgr/webpack"));
    }
};
