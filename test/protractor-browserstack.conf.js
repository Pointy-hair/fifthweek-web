var CommonWorkflows = require('./e2e/common-workflows.js');
var commonWorkflows = new CommonWorkflows();
var minute = 60 * 1000;

var bsConfig = {
  'build': 'E2E Tests - ' + new Date().toISOString(),
  'project': 'Fifthweek',
  'debug': false
};

exports.config = {
  seleniumAddress: 'http://hub.browserstack.com/wd/hub',
  baseUrl: 'http://localhost:9001',

  specs: ['e2e/spec/**/*.spec.js'],

  // We cannot run any file upload tests until BrowserStack upgrade to Selenium 2.45.0
  exclude: [
    'e2e/spec/**/compose-file-form.spec.js',
    'e2e/spec/**/compose-image-form.spec.js',
    'e2e/spec/**/creator-backlog-form.spec.js',
    'e2e/spec/**/creator-timeline-form.spec.js',
    'e2e/spec/**/account-settings-form.spec.js',
    'e2e/spec/**/customize-landing-page-form.spec.js'
  ],

  allScriptsTimeout: minute,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 5 * minute, // Need to allow slightly longer for BrowserStack tests.
    includeStackTrace: true
  },

  maxSessions: 2,
  // Capabilities to be passed to the webdriver instance.

  multiCapabilities: [
    {
      'os': 'Windows',
      'os_version': '7',
      'browserName': 'IE',
      'browser_version': '10',
      'build': bsConfig.build,
      'project': bsConfig.project,
      'resolution': '1280x1024',
      'browserstack.debug': bsConfig.debug,
      'browserstack.tunnel': 'true',
      'browserstack.user': process.env.BROWSER_STACK_USERNAME,
      'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY
    },
    {
      'os': 'Windows',
      'os_version': '7',
      'browserName': 'Firefox',
      'browser_version': '34',
      'build': bsConfig.build,
      'project': bsConfig.project,
      'resolution': '1280x1024',
      'browserstack.debug': bsConfig.debug,
      'browserstack.tunnel': 'true',
      'browserstack.user': process.env.BROWSER_STACK_USERNAME,
      'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY
    },
    {
      'os': 'Windows',
      'os_version': '8.1',
      'browserName': 'IE',
      'browser_version': '11',
      'build': bsConfig.build,
      'project': bsConfig.project,
      'resolution': '1280x1024',
      'browserstack.debug': bsConfig.debug,
      'browserstack.tunnel': 'true',
      'browserstack.user': process.env.BROWSER_STACK_USERNAME,
      'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY
    },
    {
      'os': 'Windows',
      'os_version': '8.1',
      'browserName': 'Chrome',
      'browser_version': '39',
      'build': bsConfig.build,
      'project': bsConfig.project,
      'resolution': '1280x1024',
      'browserstack.debug': bsConfig.debug,
      'browserstack.tunnel': 'true',
      'browserstack.user': process.env.BROWSER_STACK_USERNAME,
      'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY
    },
    //{
    //  'os': 'OS X',
    //  'os_version': 'Yosemite',
    //  'browserName': 'Safari',
    //  'browser_version': '8',
    //  'build': bsConfig.build,
    //  'project': bsConfig.project,
    //  'resolution': '1280x1024',
    //  'browserstack.debug': bsConfig.debug,
    //  'browserstack.tunnel': 'true',
    //  'browserstack.user': process.env.BROWSER_STACK_USERNAME,
    //  'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY
    //},
    {
      'os': 'OS X',
      'os_version': 'Yosemite',
      'browserName': 'Chrome',
      'browser_version': '39',
      'build': bsConfig.build,
      'project': bsConfig.project,
      'resolution': '1280x1024',
      'browserstack.debug': bsConfig.debug,
      'browserstack.tunnel': 'true',
      'browserstack.user': process.env.BROWSER_STACK_USERNAME,
      'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY
    },
    {
      'os': 'OS X',
      'os_version': 'Yosemite',
      'browserName': 'Firefox',
      'browser_version': '34',
      'build': bsConfig.build,
      'project': bsConfig.project,
      'resolution': '1280x1024',
      'browserstack.debug': bsConfig.debug,
      'browserstack.tunnel': 'true',
      'browserstack.user': process.env.BROWSER_STACK_USERNAME,
      'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY
    }
  ],

  onPrepare: function () {
    var path = require('path');
    var HtmlReporter = require('protractor-html-screenshot-reporter');
    require('jasmine-reporters');

    jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'reports',
      preserveDirectory: true,
      takeScreenShotsOnlyForFailedSpecs: true,
      pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
        var hasFailures = results.failedCount > 0;
        return path.join(
          hasFailures ? 'failure' : 'success',
          capabilities.caps_.platform + '-' + capabilities.caps_.browserName + '-' + capabilities.caps_.version,
          descriptions.join(', ').substring(0, 250));
      }
    }));

    var window = browser.manage().window();
    window.setSize(1280, 850);
    return commonWorkflows.getRoot();
  }
};
