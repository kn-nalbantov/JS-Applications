import { getData, getDataByOwnerId } from './data.js';
import { html, until } from './util.js';

export function catalogPage(ctx) {
  const userpage = ctx.pathname == '/my-furniture';
  ctx.render(template(loadItems(userpage), userpage));
}

const template = (data, userpage) => html`
  <div class="row space-top">
    <div class="col-md-12">
      ${userpage
        ? html`<h1>My Furniture</h1>
            <p>This is a list of your publications.</p>`
        : html`<h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>`}
    </div>
  </div>
  <div class="row space-top">${until(data)}</div>
`;

const itemTemplate = item => html`
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
`;

async function loadItems(userpage) {
  let items = [];
  if (userpage) {
    const ownerId = JSON.parse(sessionStorage.userData)._id;
    items = await getDataByOwnerId(ownerId);
  } else {
    items = await getData();
  }

  return items.map(itemTemplate);
}
