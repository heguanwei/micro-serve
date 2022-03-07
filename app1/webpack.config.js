const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const fs = require('fs');
let os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = (webpackConfigEnv, argv) => {
    let defaultConfig = {};
    // defaultConfig = singleSpaDefaults({
    //     orgName: "app1",
    //     projectName: "program",
    //     webpackConfigEnv,
    //     argv,
    // });

    return merge(defaultConfig, {
        // modify the webpack config however you'd like to by adding to this object
        entry: './src/app1-program.js',
        output: {
            filename: 'app1-program.js',
            chunkFilename: 'app1-program.js',
        },
        resolve: {
            // extensions: [".js", ".jsx", ".css", ".json"],
            // 配置别名可以加快webpack查找模块的速度
            alias: {
                '@': resolveApp('src'),
            }
        },
        module: {
            // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'happypack/loader?id=happy-babel'
                    }],
                },
                {
                    test: /\.(less|css)$/,
                    // exclude: [/node_modules/],
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader'},
                        { loader: 'less-loader'}
                    ],
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new HappyPack({
                id: 'happy-babel',
                loaders: ['babel-loader?cacheDirectory=true'],
                threadPool: happyThreadPool
            }),
        ],
    });
};
