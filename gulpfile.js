var gulp = require('gulp');
require('./gulp/dist.js');
require('./gulp/doc.js');
require('./gulp/watch.js');

gulp.task('default', ['doc-css', 'doc-build', 'watch']);