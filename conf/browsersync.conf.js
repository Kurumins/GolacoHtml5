const conf = require('./gulp.conf');
const url = require('url');
const proxyMiddleware = require('proxy-middleware');

module.exports = function () {

  var proxyOptions = url.parse('https://www.golacogame.com.br');
  proxyOptions.route = '/golaco';

  var proxyOptions2 = url.parse('https://o2games-golaco.s3.amazonaws.com/matches');
  proxyOptions2.route = '/matches';

  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      routes: {
        '/bower_components': 'bower_components'
      },
      middleware: [
        proxyMiddleware(proxyOptions),
        proxyMiddleware(proxyOptions2),
        function(req, res, next) {
          // req.url = '/index.html';
          req.method = 'GET';
          next();
        }
      ]
    },
    open: true,
    notify: false,
  };
};
