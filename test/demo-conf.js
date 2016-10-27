exports.config = {
    allScriptsTimeout: 15000,

    specs:['doc/testjs/demo1.js'],


    multiCapabilities: [
        {
            browserName: 'chrome'
        }
    ],

    baseUrl: 'http://localhost:8080/',
    framework: 'jasmine2',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 50000000
    },

    ignoreSynchronization: true,

    onPrepare: function() {
        var Jasmine2HtmlReporter = require('./index.js');
         jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './report/doc',
            takeScreenshotsOnlyOnFailures:'./report/doc'
        }));
    }
};