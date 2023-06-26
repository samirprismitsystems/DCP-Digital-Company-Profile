const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost/digital-company-profile/control/",
      headers: {
        Connection: "keep-alive",
      },
      changeOrigin: true,
    })
  );
};
