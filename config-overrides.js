const { paths } = require('react-app-rewired');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = paths.servedPath;
const path = require('path');

const {
  override,
} = require('customize-cra');

module.exports = {
  webpack: override(
    // customize-cra plugins here
    (config, _) => {
      config.devtool = 'source-map';
      return config;
    },
  ),

  devServer: configFunction => (proxy, allowedHost) => {
    return config;
  },

  paths: (paths, env) => {
    return paths;
  }
}
