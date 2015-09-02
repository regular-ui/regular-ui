var gulp = require('gulp');

var webpack = require('gulp-webpack');
var webpackConfig = require('../webpack.config.js');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sequence = require('run-sequence');

/**
 * ------------------------------------------------------------
 * Watch
 * Only the files in `./doc` will be changed while watching.
 * ------------------------------------------------------------
 */

gulp.task('doc-watch-copy', function(done) {
    return gulp.src('./doc-src/assets/**').pipe(gulp.dest('./doc'));
})

var webpackConfig2 = {};
for(var key in webpackConfig)
    webpackConfig2[key] = webpackConfig[key];
webpackConfig2.watch = true;

gulp.task('doc-watch-js', function(done) {
    return gulp.src('./src/js/index.js')
        .pipe(webpack(webpackConfig2))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./doc/js'));
});

gulp.task('doc-watch-css', function(done) {
    var themes = ['default', 'flat', 'bootstrap'];

    var gulpCSS = function(theme) {
        // Should Merge
        return gulp.src('./doc-src/mcss/' + theme + '.mcss')
            .pipe(mcss({
                pathes: ["./node_modules"],
                importCSS: true
            }))
            .pipe(rename('doc.' + theme + '.min.css'))
            .pipe(minifycss())
            .pipe(gulp.dest('./doc/css'));
    }
    
    return gulpCSS(themes[0]) && gulpCSS(themes[1]) && gulpCSS(themes[2]);
});

gulp.task('doc-watch', function() {
    gulp.watch('doc-src/assets/**', ['doc-watch-copy']);
    gulp.watch(['src/mcss/**', 'doc-src/mcss/**'], ['doc-watch-css']);
    gulp.watch(['src/js/**/*.js', 'doc-src/view/**', 'doc-src/sitemap.json'], ['doc-build']);
});

gulp.task('watch', ['doc-watch-js', 'doc-watch']);