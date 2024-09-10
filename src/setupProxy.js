const { legacyCreateProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    legacyCreateProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
  app.use(
    '/webhook',
    legacyCreateProxyMiddleware({
      target: 'https://webhook.site/4366a0dc-83c8-464a-8095-a729f2735561',
      changeOrigin: true,
    })
  );
};