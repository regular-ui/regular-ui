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
 * Doc Watch
 * ------------------------------------------------------------
 */

gulp.task('doc-watch-js', function(done) {
    return gulp.src('./src/js/index.js')
        .pipe(webpack({
            watch: true,
            output: {
                filename: 'regular-ui.min.js',
                library: 'RGUI',
                libraryTarget: 'umd'
            },
            externals: {
                'regularjs': 'Regular',
                'marked': 'marked'
            }
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('doc-watch', function() {
    gulp.watch('doc-src/assets/**', function() {
        return gulp.src('./doc-src/assets/**').pipe(gulp.dest('./doc'));
    });

    gulp.watch(['src/mcss/**', 'doc-src/mcss/**'], ['doc-css']);
    gulp.watch(['src/js/**/*.js', 'doc-src/view/**', 'doc-src/sitemap.json'], ['doc-build']);
});