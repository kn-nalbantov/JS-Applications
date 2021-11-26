import { getDetails } from './data.js';
import { html } from './util.js';

export async function detailsPage(ctx) {
  let userId = '';
  if (sessionStorage.userData) {
    userId = JSON.parse(sessionStorage.userData)._id;
  }

  const details = await getDetails(ctx.params.id);
  ctx.render(template(details, onDelete, userId));

  async function onDelete(e) {
    e.preventDefault();

    await fetch('http://localhost:3030/data/catalog/' + e.target.dataset.id, {
      method: 'delete',
      headers: {
        'X-Authorization': JSON.parse(sessionStorage.userData).accessToken,
      },
    });

    ctx.page.redirect('/');
  }
}

const template = (data, onDelete, userId) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Furniture Details</h1>
    </div>
  </div>
  <div class="row space-top">
    <div class="col-md-4">
      <div class="card text-white bg-primary">
        <div class="card-body">
          <img src=".${data.img}" />
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
      ${userId == data._ownerId
        ? html`<div>
            <a href=${`/edit/${data._id}`} class="btn btn-info">Edit</a>
            <a href="javascript:void(0)" class="btn btn-red" @click=${onDelete} data-id=${data._id}>Delete</a>
          </div>`
        : null}
    </div>
  </div>
`;
