var fs = require('fs');

if(!fs.existsSync('./structure.customized.js'))
    return;

var gulp = require('gulp');

var webpack = require('gulp-webpack');
var webpackConfig = require('../webpack.config.js');
var rm = require('gulp-rimraf');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sequence = require('run-sequence');
var all = require('gulp-all');
var mcss = require('gulp_mcss');

var structure = require('../structure.customized.js');
var customize = require('./gulp-customize.js');

/**
 * ------------------------------------------------------------
 * Customize Dist
 * ------------------------------------------------------------
 */

gulp.task('customize-js', function() {
    return gulp.src('./src/js/head.js')
        .pipe(customize(structure, 'js'))
        .pipe(rename('customized.js'))
        .pipe(gulp.dest('./src/js'))
        .pipe(webpack(webpackConfig))
        .pipe(rename('regular-ui.customized.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('customize-css', function() {
    var gulpCSS = function(theme) {
        return gulp.src('./src/mcss/head.mcss')
            .pipe(customize(structure, 'css', theme))
            .pipe(rename(theme + '.customized.mcss'))
            .pipe(gulp.dest('./src/mcss'))
            .pipe(mcss({
                pathes: ['./node_modules'],
                importCSS: true
            }))
            .pipe(rename('regular-ui.' + theme + '.customized.css'))
            .pipe(gulp.dest('./dist/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('./dist/css'));
    }
    
    return all(structure.themes.map(gulpCSS));
});

gulp.task('customize', ['customize-js', 'customize-css']);