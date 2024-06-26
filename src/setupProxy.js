const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://dcp.prismcodehub.com/control/",
      headers: {
        Connection: "keep-alive",
      },
      changeOrigin: true,
    })
  );
};
