import { getBooksByUserId } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function profilePage(ctx) {
  const id = await getUserData().id;
  const data = await getBooksByUserId(id);
  ctx.updateUserNav();
  ctx.render(profileTemplate(data));
}

const profileTemplate = data => html`
  <section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${data.length == 0 ? html`<p class="no-books">No books in database!</p>` : html`<ul class="my-books-list">${data.map(bookCard)}</ul>`}
  </section>
`;

const bookCard = book => html`
  <li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl} /></p>
    <a class="button" href="/details/${book._id}">Details</a>
  </li>
`;
