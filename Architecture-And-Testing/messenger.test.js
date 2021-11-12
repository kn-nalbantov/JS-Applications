const expect = require('chai').expect;
const { chromium } = require('playwright-chromium');

/* VS Code Live server extensiton
is used to resolve the host and the following tests
*/
const host = 'http://127.0.0.1:5500/02.Book-Library/';

let page, browser;
const mockData = {
  'd953e5fb-a585-4d6b-92d3-ee90697398a0': {
    author: 'J.K.Rowling',
    title: "Harry Potter and the Philosopher's Stone",
  },
  'd953e5fb-a585-4d6b-92d3-ee90697398a1': {
    author: 'Svetlin Nakov',
    title: 'C# Fundamentals',
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

describe('Book-Library tests', async function () {
  this.timeout(60000);

  before(async () => {
    // browser = await chromium.launch({headless: false, slowMo: 1500});
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

  describe('load books tests', async function () {
    it('loads books', async () => {
      await page.route('**/jsonstore/collections/books*', route => {
        route.fulfill(json(mockData));
      });
      await page.goto(host);
      await page.click('text=Load All Books');
      await page.waitForSelector('text=Harry Potter');

      const rows = await page.$$eval('tr', rows => rows.map(r => r.textContent));

      expect(rows[1]).to.contain('Harry Potter');
      expect(rows[1]).to.contain('Rowling');
      expect(rows[2]).to.contain('C#');
      expect(rows[2]).to.contain('Nakov');
    });
  });

  describe('add books tests', async function () {
    it('adds books via post request', async () => {
      await page.route('**/jsonstore/collections/books*', route => {
        route.fulfill(json({ title: 'Title', author: 'Author' }));
      });
      await page.goto(host);
      await page.fill('form#createForm >> input[name="title"]', 'Title');
      await page.fill('form#createForm >> input[name="author"]', 'Author');

      const [request] = await Promise.all([
        page.waitForRequest(request => request.method() == 'POST'),
        page.click('form#createForm >> text=Submit'),
      ]);

      const data = JSON.parse(request.postData());
      expect(request.method()).to.be.equal('POST');
      expect(data.title).to.be.equal('Title');
      expect(data.author).to.be.equal('Author');
    });

    it('alerts an error message if input fields are blank', async () => {
      await page.goto(host);
      await page.fill('form#createForm >> input[name="title"]', '');
      await page.fill('form#createForm >> input[name="author"]', '');

      let alertMessage = '';
      page.on('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.dismiss();
      });
      await page.click('form#createForm >> text=Submit');

      expect(alertMessage).to.be.equal('All fields are required!');
    });
  });

  describe('edit books tests', async () => {
    it('the correct form becomes visible upon clicking edit', async () => {
      await page.route('**/jsonstore/collections/books*', route => {
        route.fulfill(json(mockData));
      });
      await page.goto(host);
      await page.click('text=Load All Books');
      await page.waitForSelector('text=Harry Potter');
      await page.click('[data-id=d953e5fb-a585-4d6b-92d3-ee90697398a0] >> text=Edit');

      expect(await page.isVisible('form#editForm')).to.be.true;

        // await page.waitForTimeOut(15000)
    });

    it.only('input fields on the edit form show the author and title of the selected book', async () => {
      await page.route('**/jsonstore/collections/books*', route => {
        route.fulfill(json(mockData));
      });
      await page.goto(host);
      await page.click('text=Load All Books');
      await page.waitForSelector('text=Harry Potter');
      await page.click('[data-id=d953e5fb-a585-4d6b-92d3-ee90697398a0] >> text=Edit');


      const searchValue = await page.$eval('form#editForm >> text=Harry', el => el.value);

    //   await page.waitForTimeOut(15000)

    });

    it('put request with corect params is sent to the back-end', async () => {
      //
    });
  });

  it('deletes a book', async () => {
    //
  });
});
