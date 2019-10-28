const merge = require("webpack-merge");
const devConfig = require("./webpack.config.dev");

const generateProxyConfig = require("./proxy-urls");
const loadAppEnv = require("./loadAppEnv");
const applicationEnv = loadAppEnv(process.env);

console.log(applicationEnv);

const backendUrl = JSON.parse(applicationEnv.NF_REMOTE_BACKEND_PROXY_ROOT);
const nodeUrl = JSON.parse(applicationEnv.NF_REMOTE_NODE_PROXY_ROOT);

console.assert(
  backendUrl,
  "Missing NF_REMOTE_BACKEND_PROXY_ROOT env variable. Add it to your .env file",
);
console.assert(nodeUrl, "Missing NF_REMOTE_NODE_PROXY_ROOT env variable. Add it to your .env file");

console.log("REMOTE_BACKEND_URL: ", backendUrl);
console.log("REMOTE_NODE_URL: ", nodeUrl);

const localDevConfig = merge(devConfig, {
  devServer: {
    proxy: generateProxyConfig(backendUrl, nodeUrl),
  },
});

module.exports = localDevConfig;
