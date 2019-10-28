const localDevConfig = require("./webpack.config.dev-remote");

localDevConfig.devServer.host = process.env.NF_SERVE_ON_NETWORK;
module.exports = localDevConfig;
