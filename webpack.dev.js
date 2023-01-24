const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack'); 

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins:[
  new webpack.DefinePlugin({
    "process.env.API_URL": JSON.stringify("https://demo.digitaldemocracynow.com/api")
  })
]

});