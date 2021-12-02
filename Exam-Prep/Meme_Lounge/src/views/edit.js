import { getMemeById, updateMeme } from '../data.js';
import { html } from '../lib.js';

export async function editPage(ctx) {
  const id = ctx.params.id;
  const data = await getMemeById(id);
  ctx.render(editTemplate(data, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');

    if (title == '' || description == '' || imageUrl == '') {
      return alert('All fields are required!');
    }

    await updateMeme(id, { title, description, imageUrl });
    ctx.page.redirect('/details/' + id);
  }
}

const editTemplate = (data, onSubmit) => html`
  <section id="edit-meme">
    <form id="edit-form" @submit=${onSubmit}>
      <h1>Edit Meme</h1>
      <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" value=${data.title} />
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description">
                            ${data.description}
                        </textarea
        >
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${data.imageUrl} />
        <input type="submit" class="registerbtn button" value="Edit Meme" />
      </div>
    </form>
  </section>
`;
