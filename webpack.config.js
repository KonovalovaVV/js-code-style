const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const outputDirectory = path.join(__dirname, 'lib');
const sourceDirectory = path.join(__dirname, 'src');

module.exports = {
  entry: path.join(sourceDirectory, 'test.js'),
  output: {
    filename: 'main.js',
    path: outputDirectory,
  },
  devServer: {
    compress: true,
    port: 9000,
    contentBase: outputDirectory,
  },
  watch: true,
  module: {
    rules: [{
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(sourceDirectory, 'testFixed.html')
    }),
  ]
};