const path = require('path')
const webpack = require('webpack')
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3030',
        'webpack/hot/only-dev-server', //HRM更新时刷新整个页面，如果是only-dev-server是手动刷新
        `${__dirname}/app/main.js`,
    ],
    output: {
        filename: '[name].bundle.js',
        path: `${__dirname}/build`,
        publicPath: '/build/'
        // webpack-dev-server服务上的文件是相对publicPath这个路径的，用于设置热加载的服务器
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 启用 HMR
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ],
    resolve: {
        // 定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
        extensions: ['.js','.json', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
                       //fonts loader
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    devServer: {
        hot: true,
        host: 'localhost',
        port: 3030,
        contentBase: path.resolve(__dirname, 'build')
    }
}