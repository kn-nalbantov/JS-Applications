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
    // browser = await chromium.launch({ headless: false, slowMo: 1500, devtools: true });
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

  describe('load books tests', async () => {
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

  describe('add books tests', async () => {
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

      await page.waitForTimeOut(15000)

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

    });

    it('input fields on the edit form show the author and title of the selected book', async () => {
      await page.route('**/jsonstore/collections/books*', route => {
        route.fulfill(json(mockData));
      });
      await page.goto(host);
      await page.click('text=Load All Books');
      await page.waitForSelector('text=Harry Potter');
      await page.click('[data-id=d953e5fb-a585-4d6b-92d3-ee90697398a0] >> text=Edit');
      await page.waitForSelector('text=Edit Form');

      const titleInput = await page.inputValue('form#editForm >> [name=title]');
      const authorInput = await page.inputValue('form#editForm >> [name=author]');

      expect(titleInput).to.be.equal("Harry Potter and the Philosopher's Stone");
      expect(authorInput).to.be.equal('J.K.Rowling');
    });

    it('sends put request with corect params to the back-end', async () => {
      await page.route('**/jsonstore/collections/books*', route => {
        route.fulfill(json(mockData));
      });
      await page.goto(host);
      await page.click('text=Load All Books');
      await page.waitForSelector('text=Harry Potter');
      await page.click('[data-id=d953e5fb-a585-4d6b-92d3-ee90697398a0] >> text=Edit');
      await page.waitForSelector('text=Edit Form');
      const [request] = await Promise.all([
        page.waitForRequest(request => request.method() == 'PUT'),
        await page.click('text=Save'),
      ]);
      expect(request.postData()).to.be.equal(
        JSON.stringify({ title: "Harry Potter and the Philosopher's Stone", author: 'J.K.Rowling' })
      );
      expect(request.method() == 'PUT').to.be.true;
    });
  });

  describe('delete book tests', async () => {
    it('shows confirmation dialog before deleting a book', async () => {
      await page.route('**/jsonstore/collections/books*', route => {
        route.fulfill(json(mockData));
      });
      await page.goto(host);
      await page.click('text=Load All Books');
      await page.waitForSelector('text=Harry Potter');

      let dialogMessage = '';
      page.on('dialog', async dialog => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });
      await page.click('[data-id=d953e5fb-a585-4d6b-92d3-ee90697398a0] >> text=Delete');

      expect(dialogMessage).to.contain('Are you sure');
    });

    it('sends a delete request to the backend', async () => {
      await page.route('**/jsonstore/collections/books*', route => {
        route.fulfill(json(mockData));
      });
      await page.goto(host);
      await page.click('text=Load All Books');
      await page.waitForSelector('text=Harry Potter');

      page.on('dialog', async dialog => await dialog.accept());

      const [request] = await Promise.all([
        page.waitForRequest(request => request.method() == 'DELETE'),
        await page.click('[data-id=d953e5fb-a585-4d6b-92d3-ee90697398a0] >> text=Delete'),
      ]);

      expect(request.method()).to.be.equal('DELETE');
    });
  });
});
