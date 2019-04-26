// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//   entry: './src/index.js',
//   plugins: [
//     new webpack.ProvidePlugin({
//       $: "jquery",
//       jQuery: "jquery"
//     })
//   ],
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'html/js/')
//   }
// };

const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    'main': './src/index.js',
    'readingbuddy': './src/js/readingbuddy.js',
  },
  output: {
    path: path.resolve(__dirname, 'html/js/'),
    filename: "[name].js",
  },
  module: {
    rules: [
    //   {
    //     test: /\.scss$/,
    //     use: [
    //       {
    //         loader: MiniCssExtractPlugin.loader
    //       },
    //       "css-loader",
    //       'sass-loader'
    //     ]
    //   },
    //   {
    //     test: /\.m?js$/,
    //     exclude: /(node_modules|bower_components)/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env']
    //       }
    //     }
    //   },
/*      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        },{
          loader: 'expose-loader',
          options: '$'
        }]
      }*/
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       output: {
    //         comments: false,
    //       },
    //     },
    //   })
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
