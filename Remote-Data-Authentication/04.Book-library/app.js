document.getElementById('loadBooks').addEventListener('click', loadBooks);
const tbody = document.querySelector('tbody');
const form = document.querySelector('form');
form.addEventListener('submit', createBook);

document.querySelectorAll('tbody td button').forEach(button => {
  if (button.textContent == 'Edit') {
    button.addEventListener('click', editBook);
  } else {
    button.addEventListener('click', deleteBook);
  }
});

async function loadBooks() {
  try {
    const res = await fetch('http://localhost:3030/jsonstore/collections/books');
    if (res.status != 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();

    for (let book in data) {
      const title = data[book].title;
      const author = data[book].author;
      renderBook(title, author);
    }
  } catch (err) {
    console.error(err);
  }
}

function renderBook(title, author) {
  const tr = document.createElement('tr');
  const titleTd = document.createElement('td');
  titleTd.textContent = title;
  const authorTd = document.createElement('td');
  authorTd.textContent = author;

  const buttonsTd = document.createElement('td');
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', editBook);
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', deleteBook);

  buttonsTd.appendChild(editBtn);
  buttonsTd.appendChild(deleteBtn);
  tr.appendChild(titleTd);
  tr.appendChild(authorTd);
  tr.appendChild(buttonsTd);
  tbody.appendChild(tr);
}

function editBook() {
  console.log('edited');
}

function deleteBook() {
  console.log('deleted');
}

async function createBook(e) {
  e.preventDefault();

  try {
    const title = form.title;
    const author = form.author;
    const book = {
      title: title.value,
      author: author.value,
    };
    if (book.title == '' || book.author == '') {
      throw new Error('Both fields are required.');
    }

    title.value = '';
    author.value = '';

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    };

    const res = await fetch('http://localhost:3030/jsonstore/collections/books', options);
    if (res.status != 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    renderBook(data.title, data.author);
  } catch (err) {
    alert(err.message);
  }
}
