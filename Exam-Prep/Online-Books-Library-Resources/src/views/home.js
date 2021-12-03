import { getAllBooks } from '../data.js';
import { html } from '../lib.js';

export async function homePage(ctx) {
  const data = await getAllBooks();
  ctx.updateUserNav();
  ctx.render(homeTemplate(data));
}

const homeTemplate = data => html`
  <section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${data.length == 0 ? html`<p class="no-books">No books in database!</p>` : html`<ul class="other-books-list">${data.map(bookCard)}</ul>`}
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
