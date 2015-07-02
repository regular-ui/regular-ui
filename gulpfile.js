var gulp = require('gulp');
var browserify = require('browserify');
var html2string = require('browserify-html2string');
var sequence = require('run-sequence');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rm = require('gulp-rimraf');
var mcss = require('./lib/gulp-mcss.js');
var jshint = require('gulp-jshint');
var buildAll = require('./doc-src/buildAll.js');

gulp.task('clean', function(done) {
    return gulp.src('./doc/*', { read: false }) // much faster
    .pipe(rm());
});

gulp.task('copy',  function() {
    return gulp.src(['./doc-src/assets/**'], {
        base: './doc-src/assets'
    }).pipe(gulp.dest('./doc'));
});

// src/mcss/ + doc-src/mcss/ => css -> doc/
gulp.task('mcss-doc', function(done) {
    gulp.src('./doc-src/mcss/default.mcss')
        .pipe(mcss({
            pathes: ["./node_modules"],
            importCSS: true,
        }))
        .pipe(gulp.dest('doc/css'));

    gulp.src('./doc-src/mcss/flat.mcss')
        .pipe(mcss({
            pathes: ["./node_modules"],
            importCSS: true,
        }))
        .pipe(gulp.dest('doc/css'));

    gulp.src('./doc-src/mcss/bootstrap.mcss')
        .pipe(mcss({
            pathes: ["./node_modules"],
            importCSS: true,
        }))
        .pipe(gulp.dest('doc/css'));

    done();
});

// src/core.js => regular-ui.js -> doc/js/
gulp.task('browserify-js', function(done) {
    return browserify(['./src/js/index.js'], {debug: true})
        .transform(html2string)
        .bundle()
        .on('error', function(err) {
            console.log('!!!!!!!!!!!! ' + err)
            done(null);
        })
        .pipe(source('regular-ui.js'))
        .pipe(buffer())
        // .pipe(codefixed())
        .pipe(sourcemaps.init({loadMaps: true}))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('doc/js/'));
});

// doc-src/* => * -> doc/
gulp.task('doc-src', function(done) {
    return buildAll();
});

gulp.task('sequence', function(done) {
    sequence(['mcss-doc', 'browserify-js', 'doc-src'], done);
});

gulp.task('watch', function() {
    gulp.watch(['doc-src/assets/**'], ['copy']);
    gulp.watch(['src/js/**'], ['browserify-js']);
    gulp.watch(['src/mcss/**', 'doc-src/mcss/**'], ['mcss-doc']);
    gulp.watch(['src/js/**', 'doc-src/view/**', 'doc-src/sitemap.json'], ['doc-src']);
});

gulp.task('default', ['sequence', 'watch']);