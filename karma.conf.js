module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['mocha', 'common_js'],
        files: [
            './test/spec/**/*.js',
            './test/spec/**/*.html',
            './src/js/**/*.js',
            './src/js/**/*.html',
            './dist/css/regular-ui.default.min.css',
            {pattern: './dist/font/**', included: false, watched: false}
        ],
        preprocessors: {
            './test/spec/**/*.html': ['common_js'],
            './test/spec/**/*.js': ['common_js'],
            './src/js/**/*.html': ['common_js'],
            './src/js/**/*.js': ['common_js', 'coverage']
        },
        reporters: ['progress', 'coverage'],
        common_js: {
            transforms: {
                'html-browserify': true
            }
        },
        coverageReporter: {
            dir: 'tmp/coverage',
            type: 'html' 
        }
    });
};