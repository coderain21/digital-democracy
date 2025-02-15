const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require('webpack'); 


module.exports = {

  entry: "./src/index.js",
  output: {
    filename: "bundle.[fullhash].js",
    path: path.join(__dirname, "/dist"),
    publicPath: "/", 
  },
   performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    })
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    port:3000
  },
  module: {
    rules: [
      {
        test: /\.jsx|js?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader")
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|jpg|gif$/,
        exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        use: ["file-loader"],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        use: ['@svgr/webpack']
      }
      
    ],
  },
};