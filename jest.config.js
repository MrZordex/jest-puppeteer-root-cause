module.exports = {
    globalSetup: './setup.js',
    globalTeardown: './teardown.js',
    testEnvironment: './puppeteer-environment.js',
    setupFilesAfterEnv: ['@testim/root-cause-jest/lib/forSetupFilesAfterEnv'],
    reporters: ['@testim/root-cause-jest/lib/reporter/default'],
};