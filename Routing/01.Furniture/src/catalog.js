import { getData } from './data.js';
import { showNav } from './nav.js';
import { html, render } from './util.js';

export function catalogPage() {
  displayCatalog();
  showNav();
}

async function displayCatalog() {
  const furniture = await getData();
  console.log(furniture);
  const container = document.querySelector('.container');
  const template = data => html`
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
      </div>
    </div>
    <div class="row space-top">
      ${data.map(
        item => html`
          <div class="col-md-4">
            <div class="card text-white bg-primary">
              <div class="card-body">
                <img src="${item.img}" />
                <p>${item.description}</p>
                <footer>
                  <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                  <a href="details/${item._id}" class="btn btn-info">Details</a>
                </div>
              </div>
            </div>
          </div>
        `
      )}
    </div>
  `;
  render(template(furniture), container);
}

/*

<div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img src="./images/table.png" />
            <p>Description here</p>
            <footer>
              <p>Price: <span>235 $</span></p>
            </footer>
            <div>
              <a href="#" class="btn btn-info">Details</a>
            </div>
          </div>
        </div>
      </div>


*/
