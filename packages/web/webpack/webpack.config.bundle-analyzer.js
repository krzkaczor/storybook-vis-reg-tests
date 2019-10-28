const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const merge = require("webpack-merge");

const prodConfig = require("./webpack.config.prod");

const bundleAnalyzerConfig = merge(prodConfig, {
  plugins: [new BundleAnalyzerPlugin()],
});

module.exports = bundleAnalyzerConfig;
