var path = require('path')
var glob = require('glob')
var autoprefixer = require('autoprefixer')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var projectRoot = path.resolve(__dirname, '../')
var entries = getEntry('./src/pages/**/*.js')
var chunks = Object.keys(entries)
//var ExtractTextPlugin = require('extract-text-webpack-plugin')

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: entries,
  externals: {
   "BMap": "BMap"
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].[hash:7].js'
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss','.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      // require('autoprefixer')({
      //   browsers: ['>0.1%','last 6 versions', 'ie >= 9'],
      //   // flexbox:true,
      //   // remove: false
      // })
      autoprefixer({
        browsers:  ['last 20 versions', '> 1%','iOS >= 7'],
        flexbox:false,
        //remove: false
      })
    ]
  },
  plugins: [
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks:chunks,  // chunks是需要提取的模块
      minChunks: chunks.length
    }),
    // 配置提取出的样式文件
    //new ExtractTextPlugin('static/css/base.css')
  ]
}

//获取入口js文件
// function getEntry(globPath) {
//   var entries = {},
//     basename, tmp, pathname;

//   glob.sync(globPath).forEach(function (entry) {
//     basename = path.basename(entry, path.extname(entry));
//     pathname = basename.split("_")[0];
//     entries[pathname] = entry;
//   });
//   return entries;
// }
function getEntry(globPath) {
  var entries = {},
  basename, tmp, pathname;
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    //tmp = entry.split('/').splice(-3);
    pathname = basename.split("_")[0]; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  return entries;
}
