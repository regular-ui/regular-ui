var gulp = require('gulp');

var webpack = require('gulp-webpack');
var webpackConfig = require('../webpack.config.js');
var requireConvert = require('gulp-require-convert');
var rm = require('gulp-rimraf');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sequence = require('run-sequence');

var structure = require('../structure.js');
var customize = require('./gulp-customize.js');
var mcss = require('../lib/gulp-mcss.js');

/**
 * ------------------------------------------------------------
 * Customize Dist
 * ------------------------------------------------------------
 */

gulp.task('all-js', function() {
    return gulp.src('./src/js/head.js')
        .pipe(customize(structure, 'js'))
        .pipe(rename('index.js'))
        .pipe(gulp.dest('./src/js'));
});

gulp.task('all-css', function() {
    var gulpCSS = function(theme) {
        return gulp.src('./src/mcss/head.mcss')
            .pipe(customize(structure, 'css', theme))
            .pipe(rename(theme + '.mcss'))
            .pipe(gulp.dest('./src/mcss'));
    }
    
    return structure.themes.map(gulpCSS).pop();
});

gulp.task('all', ['all-js', 'all-css']);