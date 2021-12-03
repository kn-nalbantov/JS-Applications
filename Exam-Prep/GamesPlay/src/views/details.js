import { deleteGame, getComments, getGameById, postComment } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function detailsPage(ctx) {
  const userData = getUserData();
  let userId;
  if (userData) {
    userId = userData.id;
  }
  const id = ctx.params.id;
  const comments = await getComments(id);
  const data = await getGameById(id);
  ctx.updateUserNav();
  ctx.render(detailsTemplate(data, userId, onDelete, comments, onCommentSubmit));

  async function onDelete() {
    const msg = confirm('Are you sure you want to delete this game?');
    if (msg) {
      await deleteGame(id);
      ctx.page.redirect('/');
    }
  }

  async function onCommentSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const comment = formData.get('comment');
    if (comment == '') {
        return alert('Comment field is required!');
    }

    await postComment(id, comment);
    ctx.page.redirect('/details/' + id);
  }
}

const detailsTemplate = (data, userId, onDelete, comments, onCommentSubmit) => html`
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src=${data.imageUrl} />
        <h1>${data.title}</h1>
        <span class="levels">MaxLevel: ${data.maxLevel}</span>
        <p class="type">${data.category}</p>
      </div>

      <p class="text">${data.summary}</p>

      <!-- Bonus ( for Guests and Users ) -->
      <div class="details-comments">
        <h2>Comments:</h2>
        ${comments.length == 0
          ? html`<p class="no-comment">No comments.</p>`
          : html`<ul>
              ${comments.map(commendCard)}
            </ul>`}
      </div>

      <!-- Edit/Delete buttons ( Only for creator of this game )  -->
      ${data._ownerId == userId
        ? html`<div class="buttons">
            <a href="/edit/${data._id}" class="button">Edit</a>
            <a href="javascript:void(0)" class="button" @click=${onDelete}>Delete</a>
          </div>`
        : null}
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${userId && userId != data._ownerId
      ? html`<article class="create-comment">
          <label>Add new comment:</label>
          <form class="form" @submit=${onCommentSubmit}>
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment" />
          </form>
        </article>`
      : null}
  </section>
`;

const commendCard = comment => html`
  <li class="comment">
    <p>Content: ${comment.comment}</p>
  </li>
`;
