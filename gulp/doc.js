var path = require('path');
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var umd = require('gulp-umd');
var requireConvert = require('gulp-require-convert');

var browserify = require('browserify');
var html2string = require('browserify-html2string');
var sequence = require('run-sequence');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var named = require('vinyl-named');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var rm = require('gulp-rimraf');
var del = require('del');
var mcss = require('../lib/gulp-mcss.js');
var jshint = require('gulp-jshint');
var buildAll = require('../doc-src/buildAll.js');

/**
 * ------------------------------------------------------------
 * Build Doc
 * ------------------------------------------------------------
 */

gulp.task('doc-clean', function(done) {
    del('./doc', done);
});

gulp.task('doc-copy', function(done) {
    return gulp.src('./doc-src/assets/**').pipe(gulp.dest('./doc'))
        && gulp.src('./src/font/*').pipe(gulp.dest('./doc/font'))
        && gulp.src(['./dist/js/*', './dist/vendor/*']).pipe(gulp.dest('./doc/js'));
});

gulp.task('doc-css', function(done) {
    var themes = ['default', 'flat', 'bootstrap'];

    var gulpCSS = function(theme) {
        return gulp.src('./doc-src/mcss/' + theme + '.mcss')
            .pipe(mcss({
                pathes: ["./node_modules"],
                importCSS: true
            }))
            .pipe(rename('doc.' + theme + '.min.css'))
            .pipe(minifycss())
            .pipe(gulp.dest('doc/css'));
    }
    
    return gulpCSS(themes[0]) && gulpCSS(themes[1]) && gulpCSS(themes[2]);
});

gulp.task('doc-build', function(done) {
    return buildAll(done);
});

gulp.task('doc', function(done) {
    sequence('doc-clean', ['doc-copy', 'doc-css', 'doc-build'], done);
});