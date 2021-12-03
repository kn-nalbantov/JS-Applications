import { deleteBookById, getBookById, getBookLikes, getBookLikesByUserId, likeBook } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const data = await getBookById(id);
  const userData = getUserData();
  let userId;
  let likedByUser;
  if (userData) {
      userId = userData.id
      likedByUser = await getBookLikesByUserId(id, userId);
  }
  const likes = await getBookLikes(id);
  ctx.updateUserNav();
  ctx.render(detailsTemplate(data, onDelete, userId, onLike, likes, likedByUser));
  
  async function onDelete(e) {
      e.preventDefault();
      
      const message = confirm('Are you sure you want to delete this book?');
      if (message) {
          await deleteBookById(id);
          ctx.page.redirect('/');
      }
  }

  async function onLike() {
      await likeBook({bookId: id});
      ctx.page.redirect('/details/' + id);
  }
}

const detailsTemplate = (data, onDelete, userId, onLike, likes, likedByUser) => html`
  <section id="details-page" class="details">
    <div class="book-information">
      <h3>${data.title}</h3>
      <p class="type">Type: ${data.type}</p>
      <p class="img"><img src=${data.imageUrl} /></p>
      <div class="actions">
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
        ${data._ownerId == userId ? html`<a class="button" href="/edit/${data._id}">Edit</a>
        <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>` : null}

        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        ${userId && userId != data._ownerId ? html`<a class="button likeBtn" href="javascript:void(0)" style=${likedByUser == 1 ? 'display: none' : 'display: block'} @click=${onLike}>Like</a>` : null}

        <!-- ( for Guests and Users )  -->
        <div class="likes">
          <img class="hearts" src="/images/heart.png" />
          <span id="total-likes">Likes: ${likes}</span>
        </div>
        <!-- Bonus -->
      </div>
    </div>
    <div class="book-description">
      <h3>Description:</h3>
      <p>
        ${data.description}
      </p>
    </div>
  </section>
`;
