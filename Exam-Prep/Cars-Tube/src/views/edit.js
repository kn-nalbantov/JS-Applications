import { editListing, getListingById } from '../data.js';
import { html } from '../lib.js';

export async function editPage(ctx) {
  const id = ctx.params.id;
  const data = await getListingById(id);
  ctx.render(editTemplate(data, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const brand = formData.get('brand');
    const model = formData.get('model');
    const description = formData.get('description');
    const year = formData.get('year');
    const imageUrl = formData.get('imageUrl');
    const price = formData.get('price');

    if (brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {
      return alert('All fields are required!');
    }
    if (Number(price) < 0) {
      return alert('Price must be a positive number!');
    }
    if (Number(year) < 0) {
      return alert('Year must be a positive number!');
    }

    await editListing(id, brand, model, description, Number(year), imageUrl, Number(price));
    ctx.page.redirect('/details/' + id);
  }
}

const editTemplate = (data, onSubmit) => html`
  <section id="edit-listing">
    <div class="container">
      <form id="edit-form" @submit=${onSubmit}>
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr />

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" value=${data.brand} />

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" value=${data.model} />

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" value=${data.description} />

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" value=${data.year} />

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${data.imageUrl} />

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" value=${data.price} />

        <hr />
        <input type="submit" class="registerbtn" value="Edit Listing" />
      </form>
    </div>
  </section>
`;
