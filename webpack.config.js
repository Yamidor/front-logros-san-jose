const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: './src/index.js',
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'bundle.js'
    },
    mode:'development',
    resolve:{
        extensions:['.js','.jsx','.ts', 'tsx', 'json']
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            { 
                test: /\.(ts|tsx)$/, 
                loader: "ts-loader" 
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  'css-loader'
                ]
            },
            { test: /\.json$/, type: 'json', loader: 'json-loader' },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'./index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css',
        })
    ],
    devServer:{
        allowedHosts:path.join(__dirname,'dist'),
        compress:true,
        port:3005,
        historyApiFallback: true
    }
}