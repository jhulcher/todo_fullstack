var path = require("path");

var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: "./frontend/Todo.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  plugins: [
    new InlineEnviromentVariablesPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_component)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
    devtool: 'source-map',
    resolve: {
      extensions: ["", ".js", ".jsx"]
  }
};
