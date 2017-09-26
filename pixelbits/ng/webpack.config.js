const webpack = require('webpack');
const path = require('path');
const ngTools = require('@ngtools/webpack');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    app: 'src/main.ts',
    vendor: 'src/vendor.ts',
    polyfills: 'src/polyfills.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundles/[name].[hash].bundle.js',
    publicPath: ''
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ngTools.AotPlugin({
      tsConfigPath: 'tsconfig.json',
      entryModule: path.resolve(__dirname, 'src/app/app.module#AppModule')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true, //debug


      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      },
      minimize: true,
      sourceMap: true
    }),

    new CommonsChunkPlugin({
      names: ["app", "vendor", "polyfills"],
      minChunks: Infinity
    }),
    new ExtractTextPlugin('css/styles.[hash].css'),


    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/index.html',
      template: __dirname + '/src/index.html'
    })

  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: '@ngtools/webpack' },
      { test: /\.scss$/, exclude: [path.join(__dirname, 'src/app')], loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.scss$/, include: [path.join(__dirname, 'src/app')], loaders: ['to-string-loader', 'css-loader'] },
      { test: /\.css$/, /* exclude: [path.join(__dirname, 'src/app')],*/ use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      {
        test: /\.html$/, loader: 'html-loader', options: {
          minimize: true,
          removeAttributeQuotes: false,
          caseSensitive: true,
          customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
          customAttrAssign: [/\)?\]?=/]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  }
}
