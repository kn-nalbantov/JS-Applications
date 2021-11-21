import { loadBooks } from './app.js';

export async function deleteBook(e) {
  const id = e.target.parentNode.parentNode.dataset.id;
  if (window.confirm('Are you sure you want to delete?' + e.target.parentNode.parentNode.children[0].textContent)) {
    await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
      method: 'delete',
    });
  }
  loadBooks();
}
