import { deleteById, getMemeById } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const data = await getMemeById(id);

  const userData = getUserData();
  const isOwner = userData && data._ownerId == userData.id;

  ctx.render(detailsTemplate(data, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete this meme?');

    if (choice) {
        await deleteById(id);
        ctx.page.redirect('/all-memes');
    }
}
}

const detailsTemplate = (data, isOwner, onDelete) => html`
  <section id="meme-details">
    <h1>Meme Title: ${data.title}</h1>
    <div class="meme-details">
      <div class="meme-img">
        <img alt="meme-alt" src=${data.imageUrl} />
      </div>
      <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${data.description}</p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${isOwner
          ? html`<a class="button warning" href="/edit/${data._id}">Edit</a> <button class="button danger" @click=${onDelete}>Delete</button>`
          : null}
      </div>
    </div>
  </section>
`;

