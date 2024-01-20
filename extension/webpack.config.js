const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");


const API_URL = {
  production: JSON.stringify("https://bias-buster-backend.vercel.app/"),
  development: JSON.stringify("http://localhost:5000")
};
const ENVIRONMENT = process.env.NODE_ENV === "production" ? "production" : "development";


module.exports = {
  entry: "./main.js",
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
        { from: "main.html" },
        { from: "main.css" },
        { from: "tailwind-build.css" },
        { from: "DINRoundPro.ttf" },
        { from: "manifest.json" },
        { from: "icon.png" },
      ],
    }),
    new webpack.DefinePlugin({
      "API_URL": API_URL[ENVIRONMENT]
    }),
  ],
};
