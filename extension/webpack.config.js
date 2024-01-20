const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");


const API_URL = {
  production: JSON.stringify("https://bias-buster-backend.vercel.app"),
  development: JSON.stringify("http://localhost:5000")
};
const ENVIRONMENT = process.env.NODE_ENV === "production" ? "production" : "development";


module.exports = {
  entry: [
    "./src/main.js",
    "./src/tailwind.css",
  ],
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true,
  },
  resolve: {
    alias: {
      node_modules: path.join(__dirname, "node_modules"),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/main.css" },
        { from: "src/DINRoundPro.ttf" },
        { from: "src/manifest.json" },
        { from: "src/icon.png" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "tailwind.css",
      ignoreOrder: true
    }),
    new HTMLWebpackPlugin({
      inject: false,
      filename: "main.html",
      template: "./src/main.html",
    }),,
    new webpack.DefinePlugin({
      "API_URL": API_URL[ENVIRONMENT]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
};
