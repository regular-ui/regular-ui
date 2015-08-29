var gulp = require('gulp');

var webpack = require('gulp-webpack');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sequence = require('run-sequence');

/**
 * ------------------------------------------------------------
 * Watch
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
        .pipe(gulp.dest('doc/js'));
});

gulp.task('doc-watch', function() {
    gulp.watch('doc-src/assets/**', function() {
        return gulp.src('./doc-src/assets/**').pipe(gulp.dest('./doc'));
    });

    gulp.watch(['src/mcss/**', 'doc-src/mcss/**'], ['doc-css']);
    gulp.watch(['src/js/**/*.js', 'doc-src/view/**', 'doc-src/sitemap.json'], ['doc-build']);
});

gulp.task('watch', ['doc-watch-js', 'doc-watch']);