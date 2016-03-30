var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var plumber = require('gulp-plumber');

gulp.task('1-8', function() {
    gulp.src('stage-1/task-8/stylus/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('stage-1/task-8/css'));
});

var task18 = gulp.watch(['stage-1/task-8/stylus/*.styl'], ['1-8']);

task18.on('change', function(event) {
    console.log('file' + event.path + ' was ' + event.type + ', running tasks...');
});