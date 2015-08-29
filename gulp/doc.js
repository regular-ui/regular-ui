var gulp = require('gulp');

var webpack = require('gulp-webpack');
var rm = require('gulp-rimraf');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sequence = require('run-sequence');

var mcss = require('../lib/gulp-mcss.js');
var buildAll = require('../doc-src/buildAll.js');

/**
 * ------------------------------------------------------------
 * Build Doc
 * ------------------------------------------------------------
 */

gulp.task('doc-clean', function(done) {
    return gulp.src('./doc', {read: false}).pipe(rm());
});

gulp.task('doc-copy', function(done) {
    return gulp.src('./doc-src/assets/**').pipe(gulp.dest('./doc'))
        && gulp.src('./src/font/*').pipe(gulp.dest('./doc/font'))
        && gulp.src([
            './node_modules/regularjs/dist/regular.min.js',
            './node_modules/marked/marked.min.js'
        ]).pipe(gulp.dest('doc/js'));
});

gulp.task('doc-js', function(done) {
    return gulp.src('./src/js/index.js')
        .pipe(webpack({
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
        .pipe(gulp.dest('doc/js'));
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
    sequence('doc-clean', ['doc-copy', 'doc-js', 'doc-css', 'doc-build'], done);
});