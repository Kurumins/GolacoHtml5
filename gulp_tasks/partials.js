const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const angularTemplatecache = require('gulp-angular-templatecache');
const rename = require('gulp-rename');

const conf = require('../conf/gulp.conf');

gulp.task('partials', partials);

function partials() {
  return gulp.src(conf.path.src('app/**/*.html'))
    .pipe(htmlmin(conf.htmlmin))
    .on('error', conf.errorHandler('htmlmin'))
    .pipe(rename({dirname: '/'}))
    .pipe(angularTemplatecache('templateCacheHtml.js', {
      module: conf.ngModule,
      root: ''
    }))
    .on('error', conf.errorHandler('angularTemplatecache'))
    .pipe(gulp.dest(conf.path.tmp()));
}
