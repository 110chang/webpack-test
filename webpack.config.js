var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  cache: true,
  entry: {
    commons : ['./src/js/print.js'],
    app     : './src/js/app.js',
    foo     : './src/js/foo.js'
  },
  output: {
    filename   : '[name].bundle.js',
    path       : __dirname + '/dist/js', // 実体のパス
    publicPath : '/js', // web rootからのパス
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'dist'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CleanWebpackPlugin(['dist/js', 'dist/css'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new CommonsChunkPlugin({
      name: 'commons',
      minChunks: Infinity
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-2']
      }
    }]
  }
}, {
  cache: true,
  entry: {
    style: './src/css/style.sass',
    foo: './src/css/foo.css'
  },
  output: {
    filename : '[name].css',
    path     : __dirname + '/dist/css'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css')
    }, {
      test: /\.(scss|sass)$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}];
