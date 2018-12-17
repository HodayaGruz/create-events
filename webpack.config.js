const path = require('path');
const HWP = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')},
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({filename: 'style.css'}),
        new HWP(
           {template: path.resolve(__dirname,'public/index.html')}
        )
    ]
}