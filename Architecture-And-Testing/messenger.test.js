const expect = require('chai').expect;
const { chromium } = require('playwright-chromium');

/* VS Code Live server extensiton
is used to resolve the host and the following tests
*/
const host = 'http://127.0.0.1:5500/01.Messenger/';

const mockData = {
  '-LxHVtajG3N1sU714pVj': {
    'author': 'Spami',
    'content': 'Hello, are you there?',
  },
  '-LxIDxC-GotWtf4eHwV8': {
    'author': 'Garry',
    'content': 'Yep, whats up :?',
  },
  '-LxIDxPfhsNipDrOQ5g_': {
    'author': 'Spami',
    'content': 'How are you? Long time no see? :)',
  },
  '-LxIE-dM_msaz1O9MouM': {
    'author': 'George',
    'content': 'Hello, guys! :))',
  },
  '-LxLgX_nOIiuvbwmxt8w': {
    'author': 'Spami',
    'content': 'Hello, George nice to see you! :)))',
  },
};

function json(data) {
  return {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}

let page, browser;

describe('Messenger tests', async function () {
  this.timeout(60000);

  before(async () => {
    // browser = await chromium.launch({ headless: false, slowMo: 1500 });
    browser = await chromium.launch();
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  describe('load messages tests', async () => {
    it('shows all messeges after clicking refresh button', async () => {
      await page.route('**/jsonstore/messenger*', route => {
        route.fulfill(json(mockData));
      });
      await page.goto(host);
      await page.click('text=Refresh');
      const txtArea = await page.inputValue('textarea');

      expect(txtArea).to.contain('Spami: Hello');
    });
  });

  describe('load messages tests', async () => {
    it('sends post request to the database after clicking send', async () => {
      await page.goto(host);
      const [request] = await Promise.all([
        page.waitForRequest(request => request.method() == 'POST'),
        page.click('text=Send'),
      ]);
      expect(request.method() == 'POST').to.be.true;
    });

    it('post request body contains the right parameters', async () => {
      await page.goto(host);
      await page.fill('input[id="author"]', 'Someone');
      await page.fill('input[id="content"]', 'Hello');

      const [request] = await Promise.all([
        page.waitForRequest(request => request.method() == 'POST'),
        page.click('text=Send'),
      ]);

      expect(request.postData()).to.be.equal(JSON.stringify({ author: 'Someone', content: 'Hello' }));
    });
  });
});
