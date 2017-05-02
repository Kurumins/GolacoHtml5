const conf = require('./gulp.conf');
const url = require('url');
const proxyMiddleware = require('proxy-middleware');

module.exports = function () {

  var proxyOptions = url.parse('https://www.golacogame.com.br');
  proxyOptions.route = '/golaco';

  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      routes: {
        '/bower_components': 'bower_components'
      },
      middleware: [proxyMiddleware(proxyOptions)]
    },
    open: true,
    notify: false,
  };
};
