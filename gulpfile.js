'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

// compile scss to css
gulp.task('css', function () {
    return gulp.src('./css/*.css')
        .pipe(browserSync.stream());
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// serve
gulp.task('serve', function () {
    browserSync.init({
        server: './'
    });

    gulp.watch('./css/**/*.css', gulp.series('css'));
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./js/scripts.js', gulp.series('minify-js'));
    gulp.watch('./index.html').on('change', browserSync.reload);
});

// default task
gulp.task('default', gulp.series('serve'));