const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");

module.exports = merge(base, {
  mode: "development", // 开发模式
  devServer: {
    open: true, // 编译完自动打开浏览器
    port: 8080,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                "postcss-preset-env": {},
              },
            },
          },
          "less-loader",
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // Adds CSS to the DOM by injecting a <style> tag
          {
            loader: "css-loader", // Interprets @import and url() like import/require() and will resolve them
            options: {
              importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            },
          },
          "postcss-loader", // Processes CSS with PostCSS
        ],
        exclude: /node_modules/, // 排除 node_modules 目录
      },
    ],
  },
});
