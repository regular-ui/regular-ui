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
 * Build Dist
 * ------------------------------------------------------------
 */

gulp.task('dist-clean', function(done) {
    del('./dist', done);
});

gulp.task('dist-copy', function(done) {
    return gulp.src('./src/font/*').pipe(gulp.dest('./dist/font'))
        && gulp.src([
            './node_modules/regularjs/dist/regular.min.js',
            './node_modules/marked/marked.min.js'
        ]).pipe(gulp.dest('./dist/vendor'));
});

gulp.task('dist-js', function(done) {
    return gulp.src('./src/js/index.js')
        .pipe(webpack({
            output: {
                filename: 'regular-ui.js',
                library: 'RGUI',
                libraryTarget: 'umd'
            },
            externals: {
                'regularjs': 'Regular',
                'marked': 'marked'
            }
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('dist-js-amd', function(done) {
    return gulp.src('./src/js/**/*.html').pipe(gulp.dest('./dist/js-amd'))
        && gulp.src('./src/js/**/*.js')
        .pipe(requireConvert())
        .pipe(gulp.dest('./dist/js-amd'));
});

gulp.task('dist-css', function(done) {
    var themes = ['default', 'flat', 'bootstrap'];

    var gulpCSS = function(theme) {
        return gulp.src('./src/mcss/' + theme + '.mcss')
            .pipe(mcss({
                pathes: ["./node_modules"],
                importCSS: true
            }))
            .pipe(rename('regular-ui.' + theme + '.css'))
            .pipe(gulp.dest('dist/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('dist/css'));
    }
    
    return gulpCSS(themes[0]) && gulpCSS(themes[1]) && gulpCSS(themes[2]);
});

gulp.task('dist', function(done) {
    sequence('dist-clean', ['dist-copy', 'dist-js', 'dist-js-amd', 'dist-css'], done);
});