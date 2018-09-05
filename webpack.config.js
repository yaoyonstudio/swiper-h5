/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSCSS = new ExtractTextPlugin({filename: 'css/style.[hash].css', disable: false, allChunks: true});
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PRODUCTION = process.env.NODE_ENV === 'production'

console.log(process.env.NODE_ENV)

const config = {
  entry: ['./src/css/style.scss', './src/index.js'],
  output: {
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          publicPath: '/',
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: path.posix.join('assets', 'img/[name].[ext]')
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        enforce: "pre",
        use: [
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    extractSCSS,
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
  ]
}

if (PRODUCTION) {
  console.log('production mode')
  config.plugins.push(new BundleAnalyzerPlugin())
} else {
  console.log('development mode')
  config.devtool = 'inline-source-map'
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new webpack.NamedModulesPlugin())
  
  config.devtool = "#eval-source-map"
  config.devServer = {
    watchContentBase: true,
    contentBase: path.join(__dirname, "src"),
    compress: true,
    port: 9000,
    hot: true,
    inline: true
  }
}

module.exports = config
