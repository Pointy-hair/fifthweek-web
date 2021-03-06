// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-11-19 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/snapjs/snap.js',
      'bower_components/angular-snap/angular-snap.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/ng-focus/ng-focus.js',
      'bower_components/angular-elastic/elastic.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/lodash/lodash.js',
      'bower_components/marked/lib/marked.js',
      'bower_components/to-markdown/dist/to-markdown.js',
      'bower_components/ng-videosharing-embed/build/ng-videosharing-embed.min.js',
      //'bower_components/angular-payments/lib/angular-payments.min.js',
      'bower_components/moment/moment.js',
      'bower_components/medium-editor/dist/js/medium-editor.js',
      'bower_components/angular-medium-editor/dist/angular-medium-editor.js',
      'bower_components/sir-trevor-js/sir-trevor.debug.js',
      'app/scripts/app.js',
      'app/scripts/**/*.js',
      'app/modules/**/*.js',
      'app/**/*.html',
      'test/mock/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
      'app/scripts/authComplete.js',
      'app/scripts/startup.js',
      'app/scripts/analytics/startup-analytics.js'
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'ChromeNoSandbox'
    ],

    customLaunchers: {
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox'] // Requirement for Travis.
      }
    },

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-chrome-launcher',
      'karma-safari-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    preprocessors: {
      'app/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'webApp.views'
    }

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
