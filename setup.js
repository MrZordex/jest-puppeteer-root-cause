const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

const setup = async function () {    
    const browser = await puppeteer.launch({
        args: [
            '--disable-features=site-per-process',
            '--disable-web-security',
            '--disable-software-rasterizer',
            '--no-gpu'
        ],
        dumpio: true,
        headless: false
    });

    // store the browser instance so we can teardown it later
    // this global is only available in the teardown but not in TestEnvironments
    // eslint-disable-next-line no-underscore-dangle
    global.__BROWSER_GLOBAL__ = browser;

    // use the file system to expose the wsEndpoint for TestEnvironments
    await mkdirp(DIR);
    await fs.writeFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};

module.exports = setup;