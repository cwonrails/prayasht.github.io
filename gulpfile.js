// gulpfile.js
// ************************************************************************************

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();

// ************************************************************************************

// - Live Reload
gulp.task('browserSync', function() {
  browserSync.init({ server: { baseDir: '' } })
});

// - Sass Transpiler
gulp.task('sass', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.reload({ stream: true }))
});

// - Watcher & Server
gulp.task('serve', ['browserSync', 'sass', 'dist'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass', 'dist']);
  gulp.watch('src/*.html', ['dist']);
  gulp.watch('src/js/*.js', ['dist']);
});

// - Distribution
gulp.task('dist', function() {
  return gulp.src('src/index.html')
    .pipe(useref())
    // Uncomment these for full uglification
    // .pipe(gulpIf('*.js', uglify()))
    // .pipe(gulpIf('*.css', minifyCss()))
    .pipe(gulp.dest(''))
    .pipe(browserSync.reload({ stream: true }))
});
