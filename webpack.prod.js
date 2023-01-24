const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack'); 

 module.exports = merge(common, {
   mode: 'production',
   plugins:[
   new webpack.DefinePlugin({
     "process.env.API_URL": JSON.stringify("http://localhost:8000")
   })
]
 });