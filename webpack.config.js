var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/Todo.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
    devtool: 'source-map',
    resolve: {
      extensions: ["", ".js", ".jsx"]
  }
};
