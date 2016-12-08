import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const config = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    './lib/windowProcess/style/bootstrap',
    '!style!css!postcss!./lib/windowProcess/style',
    'babel-polyfill',
    './lib/windowProcess/index'
  ],

  output: {
    publicPath: '../app/dist/'
  },
  externals: {
    common: 'common'
  },

  module: {
    loaders: [{
      test: [/.+\.svg/, /.+\.eot/, /.+\.ttf/, /.+\.woff/, /.+\.woff2/],
      loader: 'file?name=dist/fonts/[name].[ext]'
    }]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.IS_BUNDLED': 'on',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  target: 'electron-renderer'
});

export default config;
