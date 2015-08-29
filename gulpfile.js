var gulp = require('gulp');
require('./gulp/dist.js');
require('./gulp/doc.js');
require('./gulp/doc-watch.js');

gulp.task('default', ['doc-watch', 'doc-watch-js']);