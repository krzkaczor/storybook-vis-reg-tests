const { mapValues } = require("lodash");

/**
 * Unified local proxy configuration. Add new urls here.
 *
 * Params:
 * backendUrl: string
 *
 * NOTE: if backendUrl === http://localhost we assume it's local setup and links are slightly different (services run on different ports)
 */
function generateProxyConfig(backendUrl, nodeUrl, targetAddress = "localhost") {
  const base = {
    "/node": {
      targetLocal: `http://${targetAddress}:8545`,
      targetRemote: nodeUrl,
      pathRewrite: { "^/node": "" },
    },
    "/api/signature": {
      targetLocal: `http://${targetAddress}:5000`,
      targetRemote: backendUrl + "signature",
      pathRewrite: { "^/api/signature": "" },
    },
    "/api/wallet": {
      targetLocal: `http://${targetAddress}:5001`,
      targetRemote: backendUrl + "wallet",
      pathRewrite: { "^/api/wallet": "" },
    },
    "/api/user": {
      targetLocal: `http://${targetAddress}:5002`,
      targetRemote: backendUrl + "user",
      pathRewrite: { "^/api/user": "" },
    },
    "/api/kyc": {
      targetLocal: `http://${targetAddress}:5003`,
      targetRemote: backendUrl + "kyc",
      pathRewrite: { "^/api/kyc": "" },
    },
    "/api/eto-listing": {
      targetLocal: `http://${targetAddress}:5009`,
      targetRemote: backendUrl + "eto-listing",
      pathRewrite: { "^/api/eto-listing": "" },
    },
    "/api/analytics-api": {
      targetLocal: `http://${targetAddress}:5018`,
      targetRemote: backendUrl + "analytics-api",
      pathRewrite: { "^/api/analytics-api": "" },
    },
    "/api/document-storage": {
      targetLocal: `http://${targetAddress}:5015`,
      targetRemote: backendUrl + "document-storage",
      pathRewrite: { "^/api/document-storage": "" },
    },
    "/api/newsletter": {
      targetLocal: `http://${targetAddress}:5014`,
      targetRemote: backendUrl + "newsletter",
      pathRewrite: { "^/api/newsletter": "" },
    },
    "/api/external-services-mock": {
      targetLocal: `http://${targetAddress}:1337`,
      targetRemote: backendUrl + "external-services-mock",
      pathRewrite: { "^/api/external-services-mock": "" },
    },
    "/api/gas": {
      targetLocal: `http://${targetAddress}:5013`,
      targetRemote: backendUrl + "gas",
      pathRewrite: { "^/api/gas": "" },
    },
    "/api/immutable-storage": {
      targetLocal: `http://${targetAddress}:5012`,
      targetRemote: backendUrl + "immutable-storage",
      pathRewrite: { "^/api/immutable-storage": "" },
    },
  };

  return mapValues(base, value => {
    const isRemote = backendUrl !== `http://${targetAddress}`;

    const proxyConfig = {
      pathRewrite: value.pathRewrite,
      target: isRemote ? value.targetRemote : value.targetLocal,
      changeOrigin: isRemote,
    };
    return proxyConfig;
  });
}

module.exports = generateProxyConfig;
