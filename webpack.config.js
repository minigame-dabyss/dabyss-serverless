const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dirname } = require('path');

module.exports = {
  bail: true,
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  // devtool: slsw.lib.webpack.isLocal ? 'eval-source-map' : 'source-map',
  devtool: 'nosources-source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts', '.js'],
    symlinks: false,
    cacheWithContext: false
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack')
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      }
    ],
  },
  plugins: [

  ],
};
