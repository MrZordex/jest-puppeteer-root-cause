const NodeEnvironment = require('jest-environment-node');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const os = require('os');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();

        // get the wsEndpoint
        const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
        if (!wsEndpoint) {
            throw new Error('wsEndpoint not found');
        }

        this.global.browser = await puppeteer.connect({
            browserWSEndpoint: wsEndpoint
        });

        // Using this, pages will be created in a pristine context.
        this.global.context = await this.global.browser.createIncognitoBrowserContext();

        this.global.closePage = async () => {
            if (this.global.page && !this.global.page.isClosed())
                await this.global.page.close();
        };

        this.global.createNewPage = async () => {
            this.global.page = await this.global.context.newPage();
        };

        await this.global.createNewPage();
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        super.runScript(script);
    }
}

module.exports = PuppeteerEnvironment;
