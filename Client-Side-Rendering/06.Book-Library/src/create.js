import { loadBooks } from './app.js';

export async function createBook(e) {
  try {
    e.preventDefault();
    const title = e.target.parentNode.title.value;
    const author = e.target.parentNode.author.value;

    if (author == '' || title == '') {
      throw new Error('All fields are required!');
    }

    await fetch('http://localhost:3030/jsonstore/collections/books/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author }),
    });

    e.target.parentNode.title.value = '';
    e.target.parentNode.author.value = '';
    loadBooks();
  } catch (err) {
    alert(err.message);
  }
}
