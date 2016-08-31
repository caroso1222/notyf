var gulp = require('gulp')
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', function () {
  return del(['./dist'])
})

gulp.task('script', function () {
  gulp.src('./src/notyf.js')
    .pipe(uglify())
    .pipe(rename('notyf.min.js'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('style', function () {
  gulp.src(['./src/notyf.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(cssnano())
    .pipe(rename('notyf.min.css'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['clean'], function () {
  gulp.start('script', 'style')
  gulp.watch('./src/notyf.scss', ['style'])
  gulp.watch('./src/notyf.js', ['script'])
})

gulp.task('watch', function () {
  gulp.watch('./src/notyf.scss', ['style'])
  gulp.watch('./src/notyf.js', ['script'])
})
