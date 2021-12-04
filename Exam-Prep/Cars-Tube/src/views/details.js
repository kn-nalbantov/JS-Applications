import { deleteListing, getListingById } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  let userId;
  const userData = getUserData();
  if (userData) {
    userId = userData.id;
  }
  const data = await getListingById(id);
  ctx.render(listingsTemplate(data, userId, onDelete));

  async function onDelete() {
      const msg = confirm('Are you sure you want to delete this listing?');
      if (msg) {
          await deleteListing(id);
          ctx.page.redirect('/listings');
      }
  }
}

const listingsTemplate = (data, userId, onDelete) => html`
  <section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
      <img src=${data.imageUrl} />
      <hr />
      <ul class="listing-props">
        <li><span>Brand:</span>${data.brand}</li>
        <li><span>Model:</span>${data.model}</li>
        <li><span>Year:</span>${data.year}</li>
        <li><span>Price:</span>${data.price}$</li>
      </ul>

      <p class="description-para">${data.description}</p>

      ${data._ownerId == userId
        ? html`<div class="listings-buttons">
            <a href="/edit/${data._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" class="button-list" @click=${onDelete}>Delete</a>
          </div>`
        : null}
    </div>
  </section>
`;
