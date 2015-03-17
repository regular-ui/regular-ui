var gulp = require('gulp');
var browserify = require('browserify');
var html2string = require('browserify-html2string');
var source = require('vinyl-source-stream');
var mcss = require('./lib/gulp-mcss.js');

gulp.task('browserify', function(done) {
	browserify(['./src/js/index.js'], {})
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

gulp.task('mcss', function(){
	gulp.src('./src/mcss/index.mcss')
		.pipe(mcss({
			pathes: ["./node_modules"],
			importCSS: true,
		}))
		.pipe(gulp.dest('test/css'));
});

gulp.task('watch', function() {
	gulp.watch(['src/js/**'], ['browserify']);
	gulp.watch(['src/mcss/**'], ['mcss']);
});

gulp.task('default', ['watch']);