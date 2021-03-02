const os = require('os');
const rimraf = require('rimraf');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function () {
    let pages = await global.__BROWSER_GLOBAL__.pages()
    await Promise.all(pages.map(page => page.close()))
    await global.__BROWSER_GLOBAL__.close();

    // clean-up the wsEndpoint file
    rimraf.sync(DIR);
};
