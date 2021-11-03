function attachEvents() {
  document.getElementById('btnLoad').addEventListener('click', loadContacts);
  document.getElementById('btnCreate').addEventListener('click', createContact);
  const phonebookUl = document.getElementById('phonebook');
  const personInput = document.getElementById('person');
  const phoneInput = document.getElementById('phone');

  const url = 'http://localhost:3030/jsonstore/phonebook/';
  async function loadContacts() {
    try {
      phonebookUl.replaceChildren();
      const res = await fetch(url);
      if (res.status != 200) {
          throw new Error(res.statusText);
      }
      const data = await res.json();

      for (let contact in data) {
        const li = document.createElement('li');
        li.textContent = `${data[contact].person}: ${data[contact].phone}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteContact);

        li.appendChild(deleteButton);
        phonebookUl.appendChild(li);

        async function deleteContact() {
          const delRes = await fetch(url + data[contact]._id, { method: 'delete' });
          if (delRes.status != 200) {
            throw new Error(res.statusText);
        }
          const delData = await delRes.json();

          li.replaceWith('');
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function createContact() {
    try {
        const body = {
            person: personInput.value,
            phone: phoneInput.value,
          };
          if (body.person == '' || body.phone == '') {
              throw new Error('Both fields are required.');
          }
      
          const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          };
          const res = await fetch(url, options);
          if (res.status != 200) {
            throw new Error(res.statusText);
        }
          const data = await res.json();

          personInput.value = '';
          phoneInput.value = '';

          loadContacts();
      
        } catch (err) {
            alert(err.message);
        }
    }
}

attachEvents();
