const gulp = require('gulp');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

const conf = require('../conf/gulp.conf');

gulp.task('styles', styles);

function styles() {
  return gulp.src(conf.path.src('**/!(_)*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})).on('error', conf.errorHandler('Sass'))
    // .pipe(sass({
    //   outputStyle: 'expanded',
    //   includePaths: './bower_components'
    // })).on('error', conf.errorHandler('Sass'))
    .pipe(concat('app.css'))
    .pipe(postcss([autoprefixer()])).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(sourcemaps.write())
    .pipe(rename({dirname: 'styles/'}))
    .pipe(gulp.dest(conf.path.tmp()))
    .pipe(browserSync.stream());
}
