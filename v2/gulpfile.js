// gulpfile.js
// ************************************************************************************

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var argv = require('yargs').argv;
var browserSync = require('browser-sync').create();

// ************************************************************************************

// - Live Reload
gulp.task('browserSync', function() {
  browserSync.init({ server: { baseDir: '' } })
});

// - Sass Transpiler + Autoprefixer
gulp.task('sass', function() {
  var sass = require('gulp-sass');
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');

  gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(sourcemaps.write('.'))
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
  var useref = require('gulp-useref');
  var uglify = require('gulp-uglify');
  var minifyCss = require('gulp-minify-css');

  if (argv.f) {
    console.log("Production build.");
    return gulp.src('src/index.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulpIf('*.css', minifyCss()))
      .pipe(gulp.dest(''))
      .pipe(browserSync.reload({ stream: true }));
  } else {
    return gulp.src('src/index.html')
      .pipe(useref())
      .pipe(gulp.dest(''))
      .pipe(browserSync.reload({ stream: true }));
  }
});
