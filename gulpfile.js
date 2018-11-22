(function() {

  'use strict';

  // Include Gulp & Plugins
  var gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      cleanCSS     = require('gulp-clean-css'),
      autoprefixer = require('gulp-autoprefixer'),
      runSequence  = require('run-sequence'),
      concat       = require('gulp-concat'),
      rename       = require('gulp-rename'),
      jshint       = require('gulp-jshint'),
      uglify       = require('gulp-uglify'),
      plumber      = require('gulp-plumber'),
      gutil        = require('gulp-util'),
      replace      = require('gulp-replace'),
      fs           = require('fs');

  var onError = function( err ) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
  };

  // SASS
  gulp.task('sass', function () {
    return gulp.src('./assets/sass/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./assets/css'));
  });

  gulp.task('inlinecss', function() {
    return gulp.src(['partials/inline-css.hbs'])
    .pipe(replace('@inline_css', fs.readFileSync('assets/css/main.min.css')))
    .pipe(gulp.dest('partials/compiled'));
  });

  // JavaScript
  gulp.task('js', function(){
    return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/jquery.fitvids/jquery.fitvids.js',
      './node_modules/evil-icons/assets/evil-icons.min.js',
      './assets/js/scripts/jquery.ghostHunter.min.js',
      './assets/js/app.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'));
  });

  // Watch
  gulp.task('watch', function() {
    gulp.watch('./assets/sass/**/*.scss', ['build_css']);
    gulp.watch('./assets/js/app.js', ['js']);
  });

  // Build CSS
  gulp.task('build_css', [], function() {
    runSequence('sass', 'inlinecss');
  });

  // Build
  gulp.task('build', [], function() {
    runSequence('build_css', 'js');
  });

  // Default
  gulp.task('default', ['watch'], function() {
    gulp.start('build');
  });

})();