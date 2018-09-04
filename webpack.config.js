const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const extractCSS = new ExtractTextPlugin({filename: 'css/css.css', disable: false, allChunks: true});
const extractSCSS = new ExtractTextPlugin({filename: 'css/style.css', disable: false, allChunks: true});
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // entry: ['./src/css/css.css', './src/css/style.scss', './src/index.js'],
  entry: ['./src/css/style.scss', './src/index.js'],
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: extractCSS.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader", "postcss-loader"]
      //   })
      // },
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
  devServer: {
    port: 9000
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
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
      }
    }
  },
  resolve: {
    alias: {
      'assets': path.resolve(__dirname, 'src/public/'),
    }
  },
  plugins: [
    // extractCSS,
    extractSCSS,
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    // new BundleAnalyzerPlugin(),
  ]
};
