// Karma configuration
// Generated on Thu Nov 03 2016 18:42:59 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'www/lib/ionic/js/ionic.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'www/js/*.js',
      'www/tests/*.js',
      'www/tests/stateMock.js',
      'www/lib/ngCordova/dist/ng-cordova.js',
      'www/lib/ngCordovaMocks/dist/ngCordovaMocks.js'
    ],


    // list of files to exclude
    exclude: [ 'www/js/ng-cordova-beacon.min.js',
               'www/tests/webserver.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'www/js/*.js': ['coverage'],
      'www/tests/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress','coverage'],
    // reporters: ['dots','json-result', 'junit', 'coverage'],
    reporters: ['dots','json-result', 'coverage'],

    coverageReporter: {
      // specify a common output directory
      dir: 'build/reports/coverage',
      reporters: [{ type: 'cobertura', subdir: '.', file: 'cobertura.xml' }]},

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    jsonResultReporter: {
  outputFile: "karma-result.json",
  isSynchronous: "true"
},

//        junitReporter: {
//   outputFile: 'test-results.xml'
// },
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
