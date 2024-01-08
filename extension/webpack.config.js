const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./main.js",
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
  ],
};
