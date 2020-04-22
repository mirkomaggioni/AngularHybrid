var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
var path = require('path');

var DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') !== -1;
var DEV = DEV_SERVER || process.env.DEV;

module.exports = {
  mode: DEV ? 'development' : 'production',
  entry: {
    "hybridapp": "./app/bootstrap.ts"
  },

  devtool: DEV ? 'eval' : 'source-map',

  output: {
    path: path.resolve(__dirname, "transpiled"),
    filename: "[name].js"
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  watch: true,

  plugins: [
    new AngularCompilerPlugin({
      "tsConfigPath": 'tsconfig.json',
      "mainPath": 'app/bootstrap.ts',
      "sourceMap": true
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.template.html',
      filename: '../index.html'
    })
  ],

  module: {
    rules: [
      { test: /\.tsx?$/, use: ["source-map-loader"], enforce: 'pre' },
      { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, use: ["@ngtools/webpack"] }
    ]
  },

  externals: {
    angular: 'angular'
  },

  devServer: {
    proxy: [
      {
        context: ['/odata', '/api'],
        target: 'http://localhost:8092/',
        secure: false
      }
    ]
  }
};