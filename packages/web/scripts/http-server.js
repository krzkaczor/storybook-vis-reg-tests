const { join } = require("path");
const express = require("express");
const https = require("https");
const proxy = require("http-proxy-middleware");
const fallback = require("express-history-api-fallback");
const fs = require("fs");

const webpackDevConfig = require("../webpack/webpack.config.dev-remote");
const routesConfig = webpackDevConfig.devServer.proxy;

const sslOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const PORT = 9090;

const app = express();

Object.keys(routesConfig).forEach(path => {
  const config = routesConfig[path];

  // webpack-dev-server uses under the hood http-proxy-middleware, so we can just pass config object without any changes
  app.use(path, proxy(config));
});

// match only main route
app.use("/", express.static(join(__dirname, "../dist"), { extensions: ["html"] }));
app.use(fallback("index.html", { root: join(__dirname, "../dist") }));

console.log(`Serving on ${PORT}`);
https.createServer(sslOptions, app).listen(PORT);
