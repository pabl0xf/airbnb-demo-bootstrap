const conf = require('./gulp.conf');
var proxyMiddleware = require('http-proxy-middleware');
module.exports = function () {
   var middleware = undefined;
   middleware = proxyMiddleware('/v2', {target: 'https://api.airbnb.com', changeOrigin: true})
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
       middleware: middleware,
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    open: false
  };
};
