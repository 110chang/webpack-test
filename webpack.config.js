var webpack = require("webpack");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  entry: {
    commons : ['./src/js/print.js'],
    app    : './src/js/app.js',
    foo    : './src/js/foo.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist/js', // 実体のパス
    publicPath: '/js', // web rootからのパス
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
    new CleanWebpackPlugin(['dist/js'], {
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
    loaders: [
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  }
};