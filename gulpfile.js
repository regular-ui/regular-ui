var gulp = require('gulp');
require('./gulp/dist.js');
require('./gulp/doc.js');
require('./gulp/watch.js');
// require('./gulp/test.js'); use npm test

gulp.task('default', ['doc-css', 'doc-build', 'watch']);