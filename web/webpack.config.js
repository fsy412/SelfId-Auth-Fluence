const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // skip compile file under node_modules
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      title: 'vue development'
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      // http: 'stream-http',
      // https: 'https-browserify',
      // os: 'os-browserify/browser',
      process: 'process/browser',
      // vm: 'vm-browserify'
    })
  ],

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      // '@': resolve('src')
    },
    fallback: {
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      fs: false,
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      process: require.resolve('process/browser'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify')
    }
  },
  experiments: {
    // asyncWebAssembly: true,
    // buildHttp: true,
    // executeModule: true,
    // layers: true,
    // lazyCompilation: true,
    // outputModule: true,
    // syncWebAssembly: true,
    topLevelAwait: true,
  },


  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080
  }
}