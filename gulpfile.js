var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');


gulp.task('sass', function(done) {
  gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('css/'))
    .on('end', done);
});

gulp.task('styles', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/'))
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['styles']);
});
