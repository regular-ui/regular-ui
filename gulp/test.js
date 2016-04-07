var gulp = require('gulp');

var rename = require('gulp-rename');
var mcss = require('gulp_mcss');
// var sass = require('gulp-sass');
var shell = require('gulp-shell');
var through = require('through2');
var sequence = require('run-sequence');
var all = require('gulp-all');

var structure = require('../structure.js');

function clear() {
    return through.obj(function(file, enc, cb) {
        var str = file.contents.toString();
        var dest = str
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/ *([>=,:;\{\}\[\]]) */g, '$1')   // > mcss bug
            // .replace(/([>,:;\{\[])\s*/g, '$1')   // > mcss bug
            // .replace(/\s*([\}\]])/g, '$1')
            .replace(/\n{2,}/g, '\n')
            .replace(/'/g, '"')
            .replace(/0\./g, '.')
            .replace(/#([\da-fA-F])([\da-fA-F])([\da-fA-F]);/g, '#$1$1$2$2$3$3;')
            .replace(/white/g, '#ffffff')
            .replace(/ +(\d+%)/g, '$1')
            .replace(/(\d+%.*;)\s+/g, '$1')
            .replace(/url\(\s*(?!['"])(.*)\)/g, 'url("$1")')    // mcss bug
            .replace(/@import\s{2,}/g, '@import ')    // mcss bug
            .replace(/\}\s+\}/g, '}}')    // mcss bug
        ;

        file.contents = new Buffer(dest);
        cb(null, file);
    });
}

gulp.task('test-mcss', function() {
    return all(structure.themes.map(function(theme) {
        return gulp.src('./src/mcss/' + theme + '.mcss')
            .pipe(mcss({
                pathes: ['./node_modules'],
                format: 3
            }))
            .pipe(clear())
            .pipe(rename({suffix: '.mcss'}))
            .pipe(gulp.dest('./test/mcss2scss'))
    }));
});

gulp.task('test-scss', function() {
    return all(structure.themes.map(function(theme) {
        return gulp.src('./dist/scss/' + theme + '.scss')
            .pipe(sass({
                includePaths: ['./node_modules'],
                outputStyle: 'compact'
            }))
            .pipe(clear())
            .pipe(rename({suffix: '.scss'}))
            .pipe(gulp.dest('./test/mcss2scss'));
    }));
});

gulp.task('test-diff', shell.task(
    structure.themes.map(function(theme) {
        return 'diff test/mcss2scss/' + theme + '.mcss.css test/mcss2scss/' + theme + '.scss.css > test/mcss2scss/' + theme + '.diff'
    }),
    {ignoreErrors: true}
));

gulp.task('test-mcss2scss', function(done) {
    sequence(['test-mcss', 'test-scss'], 'test-diff', done);
});





// var mocha = require('gulp-mocha');
// var karma = require('gulp-karma');

// gulp.task('mocha', function() {
//     return gulp.src('./test/spec/**/*.js', {read: false})
//         .pipe(mocha())
// });

// gulp.task('karma', function() {
//     return gulp.src('./test/spec/**/*.js', {read: false})
//         .pipe(karma({
//             configFile: 'karma.conf.js',
//             action: 'run'
//         }))
//         .on('error', function(err) {
//             throw err;
//         });
// });
