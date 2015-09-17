var gulp = require('gulp');
gulp.THEMES = ['simple', 'default', 'flat', 'bootstrap'];

require('./gulp/dist.js');
require('./gulp/customize.js');
require('./gulp/doc.js');
require('./gulp/watch.js');
// require('./gulp/test.js'); use npm test

gulp.task('default', ['watch']);