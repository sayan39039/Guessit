const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
webpack
module.exports={
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer:{
        hot: true,
        port: 9000,
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.environment': JSON.stringify('DEV')
        }),
        new ReactRefreshWebpackPlugin(),
    ]
}