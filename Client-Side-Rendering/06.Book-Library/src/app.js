import { html, render } from '../util.js';
import { getData } from './data.js';
import { editBook } from './edit.js';
import { deleteBook } from './delete.js';
import { createBook } from './create.js';

loadBooks();

export async function loadBooks() {
  const books = await getData();
  const body = document.querySelector('body');
  const template = data => html`
    <button id="loadBooks" @click=${loadBooks}>LOAD ALL BOOKS</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(data).map(
          book => html`
            <tr data-id="${book[0]}">
              <td>${book[1].title}</td>
              <td>${book[1].author}</td>
              <td>
                <button @click=${editBook}>Edit</button>
                <button @click=${deleteBook}>Delete</button>
              </td>
            </tr>
          `
        )}
      </tbody>
    </table>
    <section></section>
  `;

  render(template(books), body);
  addForm();
}

function addForm() {
  const section = document.querySelector('section');
  const template = html`<form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Submit" @click=${createBook} />
  </form>`;

  render(template, section);
}
