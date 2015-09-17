var gulp = require('gulp');

var webpack = require('gulp-webpack');
var webpackConfig = require('../webpack.config.js');
var rm = require('gulp-rimraf');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sequence = require('run-sequence');

var structure = require('../structure.js');
var customize = require('./gulp-customize.js');
var mcss = require('../lib/gulp-mcss.js');
var buildAll = require('../doc-src/buildAll.js');

/**
 * ------------------------------------------------------------
 * Build Doc
 * ------------------------------------------------------------
 */

gulp.task('doc-clean', function() {
    return gulp.src('./doc', {read: false}).pipe(rm());
});

gulp.task('doc-copy-assets', function() {
    return gulp.src('./doc-src/assets/**').pipe(gulp.dest('./doc'));
});

gulp.task('doc-copy-font', function() {
    return gulp.src('./src/font/**').pipe(gulp.dest('./doc/font'));
});

gulp.task('doc-copy-vendor', function() {
    return gulp.src([
        './node_modules/regularjs/dist/regular.min.js',
        './node_modules/marked/marked.min.js'
    ]).pipe(gulp.dest('./doc/vendor'));
});

gulp.task('doc-copy', ['doc-copy-assets', 'doc-copy-font', 'doc-copy-vendor']);

gulp.task('doc-js', function() {
    return gulp.src('./src/js/head.js')
        .pipe(customize(structure, 'js'))
        .pipe(rename('index.js'))
        .pipe(gulp.dest('./src/js'))
        .pipe(webpack(webpackConfig))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./doc/js'));
});

gulp.task('doc-css-mcss', function() {
    var gulpCSS = function(theme) {
        return gulp.src('./src/mcss/head.mcss')
            .pipe(customize(structure, 'css', theme))
            .pipe(rename(theme + '.mcss'))
            .pipe(gulp.dest('./src/mcss'))
            .pipe(mcss({
                pathes: ["./node_modules"],
                importCSS: true
            }))
            .pipe(rename('regular-ui.' + theme + '.css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('./doc/css'))
    }

    return structure.themes.map(gulpCSS).pop();
});

gulp.task('doc-css', ['doc-css-mcss'], function() {
    var gulpCSS = function(theme) {
        return gulp.src('./doc-src/mcss/' + theme + '.mcss')
            .pipe(mcss({
                pathes: ["./node_modules"],
                importCSS: true
            }))
            .pipe(rename('doc.' + theme + '.min.css'))
            .pipe(minifycss())
            .pipe(gulp.dest('./doc/css'));
    }
    
    return structure.themes.map(gulpCSS).pop();
});

gulp.task('doc-build', function(done) {
    return buildAll(done);
});

gulp.task('doc', function(done) {
    sequence('doc-clean', ['doc-copy', 'doc-js', 'doc-css', 'doc-build'], done);
});

/**
 * ------------------------------------------------------------
 * Sync to GitHub Page
 * If start `page` task, `doc` task will be running in advance.
 * ------------------------------------------------------------
 */

gulp.task('page-clean', function() {
    return gulp.src([
        '../regular-ui.github.io/*',
        '!../regular-ui.github.io/README.md'
    ], {read: false}).pipe(rm({force: true}));
});

gulp.task('page-copy', function() {
    return gulp.src('./doc/**').pipe(gulp.dest('../regular-ui.github.io'));
});

gulp.task('page', function(done) {
    sequence(['doc', 'page-clean'], ['page-copy'], done);
});