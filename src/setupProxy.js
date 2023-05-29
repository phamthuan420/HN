const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/public-api',
    createProxyMiddleware({
      target: 'https://www.helprange.com',
      changeOrigin: true,
    })
  );
};
