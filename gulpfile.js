var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

gulp.task('sass', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', ['browserSync', 'sass', 'dist'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass', 'dist']);
  gulp.watch('src/*.html', ['dist']);
  gulp.watch('src/*.js', ['dist']);
});

gulp.task('dist', function() {
  return gulp.src('src/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCss()))
    .pipe(gulp.dest(''))
    .pipe(browserSync.reload({ stream: true }))
});
