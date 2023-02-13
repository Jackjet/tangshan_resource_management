'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  plugins: [
    new webpack.ProvidePlugin({
      layer: 'layui-layer',
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common.js',
      minChunks: 2
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.less'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      showdown: resolve('src/lib/showdown.js')
    },
    modules: [
      'node_modules',
      resolve(''),
      resolve('src')
    ]
  },
  module: {
    rules: [
      /* {
         test: /\.(js|vue)$/,
         loader: 'eslint-loader',
         enforce: 'pre',
         include: [resolve('src'), resolve('test')],
         options: {
           formatter: require('eslint-friendly-formatter')
         }
       },*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'),
        resolve('/node_modules/element-ui/src'),
        resolve('/node_modules/element-ui/packages'),
        resolve('/node_modules/_crypto-js@4.1.1@crypto-js/enc-base64url.js')]
      },
      {
        test: /\.less$/,
        include: [resolve('src')],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            }, {
              loader: "less-loader"
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  }
}
