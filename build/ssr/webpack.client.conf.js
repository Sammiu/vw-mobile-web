'use strict'
const utils = require('../utils')
const webpack = require('webpack')
const config = require('../../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('../webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../../config/dev.env'),
      'process.env.VUE_ENV': 'client'
    }),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // 热加载必备
    new webpack.HotModuleReplacementPlugin(),
    // 友好错误提示
    new FriendlyErrorsPlugin({
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
    }),
    new VueSSRClientPlugin()
  ]
})

module.exports = devWebpackConfig
