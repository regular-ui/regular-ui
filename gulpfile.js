var gulp = require('gulp');
var browserify = require('browserify');
var html2string = require('browserify-html2string');
var source = require('vinyl-source-stream');
var mcss = require('./lib/gulp-mcss.js');
var jshint = require('gulp-jshint');

gulp.task('browserify', function(done) {
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

gulp.task('mcss', function(done) {
	gulp.src('./src/mcss/core.mcss')
		.pipe(mcss({
			pathes: ["./node_modules"],
			importCSS: true,
		}))
		.pipe(gulp.dest('test/css'));

	gulp.src('./src/mcss/default.mcss')
		.pipe(mcss({
			pathes: ["./node_modules"],
			importCSS: true,
		}))
		.pipe(gulp.dest('test/css'));

	gulp.src('./src/mcss/flat.mcss')
		.pipe(mcss({
			pathes: ["./node_modules"],
			importCSS: true,
		}))
		.pipe(gulp.dest('test/css'));

	done();
});

gulp.task('watch', function() {
	gulp.watch(['src/js/**', 'test/app.*'], ['browserify']);
	gulp.watch(['src/mcss/**'], ['mcss']);
});

gulp.task('default', ['browserify', 'mcss', 'watch']);