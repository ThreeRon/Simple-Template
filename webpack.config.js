const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/script/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.bundle.js'
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {loader: 'style-loader'},
      //     {loader: 'css-loader', options: {importLoaders: 1}},
      //     {loader: 'postcss-loader'},
      //     {loader: 'stylus-loader'}
      //   ]
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'stylus-loader']
        })
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loaders: ['url-loader?limit=20000&name=image/[name].[ext]']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    // html模版
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      }
    })
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: "./dist", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true
  }
};

module.exports = config;