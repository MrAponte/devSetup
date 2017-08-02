const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const del = require('del');

// Live reload changes to Scss files and convert to CSS
gulp.task('sass', () => {
  return gulp.src('src/scss/master.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('dist/css'))
})

// Live reload in browser
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})

// Listen for changes
gulp.task('watch', ['browserSync', 'sass', 'babel'], () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/js/**/*.js', ['babel']);
})

// ES6 conversions
gulp.task('babel', () => {
  return gulp.src('src/js/master.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// Push html files to dist folder
gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// Push html files to dist folder
gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
})

// Delete Dist folder for new/updated files
gulp.task('clean:dist', () => {
  return del.sync('dist');
})

gulp.task('default', ['clean:dist', 'watch', 'babel', 'html', 'images'], () => {})
