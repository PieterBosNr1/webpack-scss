var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var webpack = require("webpack");

module.exports = {
  watch: true,
  entry: ["./app.js", "./scss/main.scss", "./scss/main.1.scss"],
  output: {
    filename: "dist/bundle.js"
  },
  module: {
    rules: [
      /*
      your other rules for JavaScript transpiling go in here
      */
      {
        // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: "css-loader?importLoaders=1"
        }),
        options: {
          includePath: "./css/plain_css.css"
        }
      },
      {
        // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        exclude: [/node_modules/], // sassLoader will include node_modules explicitly
        loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      }
    ]
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins: [
    new ExtractTextPlugin({
      // define where to save the file
      filename: "dist/[name].bundle.css",
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, "node_modules")]
        }
      }
    })
  ]
};
