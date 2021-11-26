import { getDetails } from './data.js';
import { html } from './util.js';

export async function editPage(ctx) {
  const details = await getDetails(ctx.params.id);
  update(null, {});

  function update(errorMsg, errors) {
    ctx.render(template(details, onSubmit, errorMsg, errors));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = document.querySelector('form');
    const formData = [...new FormData(e.target).entries()];
    const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

    const missing = formData.filter(([k, v]) => k != 'material' && v == '');

    try {
      if (missing.length > 0) {
        const errors = missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), {});
        throw {
          error: new Error('Please fill all mandatory fields!'),
          errors,
        };
      }

      data.year = Number(data.year);
      data.price = Number(data.price);

      const res = await fetch('http://localhost:3030/data/catalog/' + ctx.params.id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': JSON.parse(sessionStorage.userData).accessToken,
        },
        body: JSON.stringify({
          make: form.make.value,
          model: form.model.value,
          year: form.year.value,
          description: form.description.value,
          price: form.price.value,
          img: form.img.value,
          material: form.material.value,
        }),
      });
      const result = await res.json();

      ctx.page.redirect(`/details/${result._id}`);

    } catch (err) {
      const message = err.message || err.error.message;
      update(message, err.errors || {});
    }
  }
}

const template = (data, onSubmit, errorMsg, errors) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Edit Furniture</h1>
      <p style=${errorMsg ? 'color: red' : ''}>${errorMsg ? errorMsg : 'Please fill all fields.'}</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input class=${errors.make ? 'form-control is-invalid' : 'form-control'} id="new-make" type="text" name="make" value=${data.make} />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input class=${errors.model ? 'form-control is-invalid' : 'form-control'} id="new-model" type="text" name="model" value=${data.model} />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input class=${errors.year ? 'form-control is-invalid' : 'form-control'} id="new-year" type="number" name="year" value=${data.year} />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description">Description</label>
          <input class=${errors.description ? 'form-control is-invalid' : 'form-control'} id="new-description" type="text" name="description" value=${data.description} />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input class=${errors.price ? 'form-control is-invalid' : 'form-control'} id="new-price" type="number" name="price" value=${data.price} />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input class=${errors.img ? 'form-control is-invalid' : 'form-control'} id="new-image" type="text" name="img" value=${data.img} />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material">Material (optional)</label>
          <input class=${errors.material ? 'form-control is-invalid' : 'form-control'} id="new-material" type="text" name="material" value=${data.material} />
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
      </div>
    </div>
  </form>
`;
