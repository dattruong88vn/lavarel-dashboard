var path = require("path")
require("./build_config/entries")
module.exports = {
  mode: "none",
  entry: entries,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/app"),
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      Commons: path.resolve(__dirname, "src/Commons"),
      components: path.resolve(__dirname, "src/components"),
      config: path.resolve(__dirname, "src/config"),
      context: path.resolve(__dirname, "src/context"),
      env: path.resolve(__dirname, "src/env"),
      modules: path.resolve(__dirname, "src/modules"),
      pages: path.resolve(__dirname, "src/pages"),
      src_redux: path.resolve(__dirname, "src/redux"),
      services: path.resolve(__dirname, "src/services"),
      themes: path.resolve(__dirname, "src/themes"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[a|c]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}
