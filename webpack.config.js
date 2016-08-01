var webpack = require('webpack');
var merge = require('webpack-merge');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var TARGET = process.env.npm_lifecycle_event;

var common = {
  cache: false,
  entry: {
    commons : ['./src/js/print.js', './src/css/commons.sass'],
    app     : './src/js/app.js',
    foo     : './src/js/foo.js'
  },
  output: {
    filename   : 'js/[name].bundle.js',
    path       : __dirname + '/dist/', // 実体のパス
    publicPath : '/', // web rootからのパス
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-2']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css')
    }, {
      test: /\.(scss|sass)$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }]
  }
};

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new CommonsChunkPlugin({
        name: 'commons',
        minChunks: Infinity
      }),
      new ExtractTextPlugin('css/[name].css')
    ],
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new CleanWebpackPlugin(['dist/js', 'dist/css'], {
        root    : __dirname,
        verbose : true,
        dry     : false
      }),
      new CommonsChunkPlugin({
        name: 'commons',
        minChunks: Infinity
      }),
      new ExtractTextPlugin('css/[name].css')
    ]
  });
}
