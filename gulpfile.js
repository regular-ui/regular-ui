var gulp = require('gulp');
gulp.THEMES = ['simple', 'default', 'flat', 'bootstrap'];

require('./gulp/all.js');
require('./gulp/customize.js');
require('./gulp/dist.js');
require('./gulp/doc.js');
require('./gulp/watch.js');
require('./gulp/test.js'); 
// use npm test

gulp.task('default', ['doc-build', 'watch']);