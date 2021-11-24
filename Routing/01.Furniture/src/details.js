import { getDetails } from './data.js';
import { showNav } from './nav.js';
import { html, render } from './util.js';

export function detailsPage(ctx) {
  console.log(ctx.params.id);
  displayDetails(ctx.params.id);
  showNav();
}

async function displayDetails(id) {
  const details = await getDetails(id);
  console.log(details);
  const container = document.querySelector('.container');
  const template = data => html`
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Furniture Details</h1>
      </div>
    </div>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img src="${data.img}" />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        <div>
          <a href="”#”" class="btn btn-info">Edit</a>
          <a href="”#”" class="btn btn-red">Delete</a>
        </div>
      </div>
    </div>
  `;
  render(template(details), container);
}
