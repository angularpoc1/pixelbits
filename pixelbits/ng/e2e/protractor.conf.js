"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var reporter = new HtmlScreenshotReporter({
    dest: 'reports',
    filename: 'index.html',
    cleanDestination: true,
    showSummary: true,
    showConfiguration: false,
    reportTitle: null,
    userCss: null,
    ignoreSkippedSpecs: true,
    captureOnlyFailedSpecs: true,
    reportOnlyFailedSpecs: false,
    showQuickLinks: true,
    reportFailedUrl: true,
    configurationStrings: {
        "My 1st Param": "firstParam",
        "My 2nd Param": "secondParam"
    },
    pathBuilder: function (currentSpec, suites, browserCapabilities) {
        // will return chrome/your-spec-name.png
        console.log(browserCapabilities);
        console.log(suites);
        return browserCapabilities.get('browserName') + '/' + currentSpec.fullName;
    },
    // metadataBuilder: function(currentSpec, suites, browserCapabilities) {
    //   return { id: currentSpec.id, os: browserCapabilities.get('browserName') };
    // },
    preserveDirectory: false,
    inlineImages: false
});
exports.config = {
    framework: 'jasmine',
    specs: ['**/*.js'],
    directConnect: true,
    chromeDriver: 'c:\\Users\\kangm\\AppData\\Roaming\\npm\\chromedriver.exe',
    firefoxPath: 'c:\\Users\\kangm\\AppData\\Roaming\\npm\\geckodriver.exe',
    suites: {
        welcome_page: ['./tests/welcome.spec.js'],
        smoke_test: ['./tests/inbox.spec.js'],
    },
    multiCapabilities: [
        // {
        //   browserName: 'chrome',
        //   chromeOptions: {
        //     mobileEmulation: {
        //       deviceName: 'BlackBerry Z30'
        //     }      
        //   }
        // },
        // {
        //   browserName: 'chrome',
        //   chromeOptions: {
        //     args: ['--window-size=3000,2000'] 
        //   }
        // },
        // {
        //   browserName: 'chrome',
        //   chromeOptions: {
        //     args: ['--window-size=640,1136'] ,
        //     // mobileEmulation: {
        //     //   deviceName: 'iPhone 5'
        //     // }
        //   }
        // },
        // {
        //   browserName: 'chrome',
        //   chromeOptions: {
        //     args: ['--window-size=1024,768'] 
        //   }
        // },
        // {
        //   browserName: 'chrome',
        //   
        //   chromeOptions: {
        //     mobileEmulation: {
        //       deviceName: 'Galaxy S5'
        //     }
        //   }
        // },
        {
            browserName: 'chrome',
            chromeOptions: {
                mobileEmulation: {
                    deviceName: 'iPhone 5'
                }
            }
        },
    ],
    jasmineNodeOpts: {
        showColors: true
    },
    // Setup the report before any tests start
    beforeLaunch: function () {
        return new Promise(function (resolve) {
            reporter.beforeLaunch(resolve);
        });
    },
    // Assign the test reporter to each running instance
    onPrepare: function () {
        jasmine.getEnv().addReporter(reporter);
    },
    // Close the report after all tests finish
    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};
