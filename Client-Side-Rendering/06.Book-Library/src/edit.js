import { html, render } from '../util.js';
import { loadBooks } from './app.js';

export function editBook(e) {
  const section = document.querySelector('section');

  const template = html`
    <form id="edit-form">
      <input type="hidden" name="id" />
      <h3 data-id=${e.target.parentNode.parentNode.dataset.id}>Edit book</h3>
      <label>TITLE</label>
      <input type="text" name="title" .value=${e.target.parentNode.parentNode.children[0].textContent} />
      <label>AUTHOR</label>
      <input type="text" name="author" .value=${e.target.parentNode.parentNode.children[1].textContent} />
      <input type="submit" value="Save" @click=${onEdit} />
    </form>
  `;

  render(template, section);
}

async function onEdit(e) {
  e.preventDefault();
  const title = e.target.parentNode.title;
  const author = e.target.parentNode.author;
  const id = e.target.parentNode.children[1].dataset.id;

  const body = {
    title: title.value,
    author: author.value,
  };

  const options = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  await fetch('http://localhost:3030/jsonstore/collections/books/' + id, options);
  loadBooks();
}
