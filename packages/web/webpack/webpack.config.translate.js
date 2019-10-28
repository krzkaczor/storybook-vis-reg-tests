const merge = require("webpack-merge");
const devRemoteConfig = require("./webpack.config.dev-remote");

const loadAppEnv = require("./loadAppEnv");
const applicationEnv = loadAppEnv(process.env);

if (!applicationEnv.NF_TRANSLATION_ID) {
  throw new Error("Missing NF_TRANSLATION_ID env variable. Add it to your .env file");
}

const localDevConfig = merge(devRemoteConfig, {
  devServer: {
    headers: { "Content-Security-Policy": "" },
  },
});

module.exports = localDevConfig;
