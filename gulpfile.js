var gulp = require('gulp');
var browserify = require('browserify');
var html2string = require('browserify-html2string');
var source = require('vinyl-source-stream');
var mcss = require('./lib/gulp-mcss.js');
var jshint = require('gulp-jshint');
var buildAll = require('./doc-build/buildAll.js');

// src/mcss => css -> test/ & doc/
// gulp.task('mcss-test', function(done) {
//     gulp.src('./src/mcss/core.mcss')
//         .pipe(mcss({
//             pathes: ["./node_modules"],
//             importCSS: true,
//         }))
//         .pipe(gulp.dest('test/css'));

//     gulp.src('./src/mcss/default.mcss')
//         .pipe(mcss({
//             pathes: ["./node_modules"],
//             importCSS: true,
//         }))
//         .pipe(gulp.dest('test/css'));

//     gulp.src('./src/mcss/flat.mcss')
//         .pipe(mcss({
//             pathes: ["./node_modules"],
//             importCSS: true,
//         }))
//         .pipe(gulp.dest('test/css'));

//     done();
// });

// src/mcss/ + doc-build/mcss/ => css -> doc/
gulp.task('mcss-doc', function(done) {
    gulp.src('./doc-build/mcss/core.mcss')
        .pipe(mcss({
            pathes: ["./node_modules"],
            importCSS: true,
        }))
        .pipe(gulp.dest('doc/css'));

    gulp.src('./doc-build/mcss/default.mcss')
        .pipe(mcss({
            pathes: ["./node_modules"],
            importCSS: true,
        }))
        .pipe(gulp.dest('doc/css'));

    gulp.src('./doc-build/mcss/flat.mcss')
        .pipe(mcss({
            pathes: ["./node_modules"],
            importCSS: true,
        }))
        .pipe(gulp.dest('doc/css'));

    done();
});

// test/app.js => index.js -> test/
gulp.task('browserify-test', function(done) {
    browserify(['./test/app.js'], {})
        .transform(html2string)
        .bundle()
        .on('error', function(err) {
            console.log('!!!!!!!!!!!! ' + err)
            done(null)
            this.end();
        })
        .pipe(source('index.js'))
        .pipe(gulp.dest('test/js'));

    done();
});

// src/core.js => regular-ui.js -> doc/js/
gulp.task('browserify-js', function(done) {
    browserify(['./src/js/core.js'], {})
        .transform(html2string)
        .bundle()
        .on('error', function(err) {
            console.log('!!!!!!!!!!!! ' + err)
            done(null)
            this.end();
        })
        .pipe(source('regular-ui.js'))
        .pipe(gulp.dest('doc/js/'));

    done();
});

// doc-build/* => * -> doc/
gulp.task('doc-build', function(done) {
    buildAll();
    done();
});



gulp.task('watch', function() {
    //gulp.watch(['src/mcss/**'], ['mcss-test']);
    gulp.watch(['src/mcss/**', 'doc-build/mcss/**'], ['mcss-doc']);
    gulp.watch(['src/js/**', 'test/app.*'], ['browserify-test']);
    gulp.watch(['src/js/**'], ['browserify-js']);
    gulp.watch(['doc-build/**'], ['doc-build']);
});

gulp.task('default', ['mcss-doc', 'browserify-test', 'browserify-js', 'doc-build', 'watch']);