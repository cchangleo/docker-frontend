const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  //filename: 'index.html',
  template: './src/index.html',
  inject: 'root',
  hash: true
});

const plugins = [
  HtmlWebpackPluginConfig
];

module.exports = {

  mode: 'development',
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [      
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },      
      { test: /\.css$/, use: ['style-loader', 'css-loader'],
      }
    ]
  },


  plugins,
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    host: '0.0.0.0',
    port: 8080
  }
};
