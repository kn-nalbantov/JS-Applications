document.getElementById('loadBooks').addEventListener('click', loadBooks);
const tbody = document.querySelector('tbody');
const form = document.querySelector('form');
form.addEventListener('submit', createBook);

window.onload = () => {
  loadBooks();
}

async function loadBooks() {
  try {
    const res = await fetch('http://localhost:3030/jsonstore/collections/books');
    if (res.status != 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();

    tbody.replaceChildren();
    // renderBook('Harry Poter', 'J. K. Rowling');
    // renderBook('Game of Thrones', 'George R. R. Martin');
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

function editBook(e) {
  form.children[0].textContent = 'Edit FORM';
  const oldTitle = (form.title.value = e.target.parentNode.parentNode.children[0].textContent);
  form.author.value = e.target.parentNode.parentNode.children[1].textContent;

  form.removeEventListener('submit', createBook);
  form.addEventListener('submit', submitEditedBook);

  async function submitEditedBook(e) {
    e.preventDefault();

    try {
      const title = form.title.value;
      const author = form.author.value;

      const options = {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
      };
      const res = await fetch('http://localhost:3030/jsonstore/collections/books/' + (await getID(oldTitle)), options);
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      const data = await res.json();

      loadBooks();
      
      form.children[0].textContent = 'FORM';
      form.title.value = '';
      form.author.value = '';
      form.removeEventListener('submit', submitEditedBook);
      form.addEventListener('submit', createBook);
    } catch (err) {
      console.error(err);
    }

  }
}

async function getID(title) {
  try {
    const resID = await fetch('http://localhost:3030/jsonstore/collections/books/');
    if (resID.status != 200) {
      throw new Error(res.statusText);
    }
    const dataID = await resID.json();

    for (let book in dataID) {
      if (dataID[book].title == title) {
        return book;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteBook(e) {
  const title = e.target.parentNode.parentNode.children[0].textContent;
  try {
    const options = {
      method: 'delete',
    };
    const res = await fetch('http://localhost:3030/jsonstore/collections/books/' + (await getID(title)), options);
    if (res.status != 200) {
      throw new Error(res.statusText);
    }
    loadBooks();
  } catch (err) {
    console.error(err);
  }
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
