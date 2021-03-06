import { editGame, getGameById } from '../data.js';
import { html } from '../lib.js';

export async function editPage(ctx) {
  const id = ctx.params.id;
  const data = await getGameById(id);
  ctx.updateUserNav();
  ctx.render(editTemplate(data, onSubmit));

  async function onSubmit(e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const title = formData.get('title');
      const category = formData.get('category');
      const maxLevel = formData.get('maxLevel');
      const imageUrl = formData.get('imageUrl');
      const summary = formData.get('summary');

      if (title == '' || category == '' || maxLevel == '' || imageUrl == '' || summary == '') {
          return alert('All fields are required!');
      }

      await editGame(id, title, category, maxLevel, imageUrl, summary);
      ctx.page.redirect('/details/' + id);
  }
}

const editTemplate = (data, onSubmit) => html`
  <section id="edit-page" class="auth">
    <form id="edit" @submit=${onSubmit}>
      <div class="container">
        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" value=${data.title} />

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" value=${data.category} />

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" value=${data.maxLevel} />

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" value=${data.imageUrl} />

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary">${data.summary}</textarea>
        <input class="btn submit" type="submit" value="Edit Game" />
      </div>
    </form>
  </section>
`;
