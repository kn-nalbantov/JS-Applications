window.onload = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData != null) {
    document.getElementById('guest').style.display = 'none';
    document.querySelector('.email span').textContent = userData.email;
    document.querySelector('#addForm .add').disabled = false;
  } else {
    document.getElementById('user').style.display = 'none';
  }

  document.getElementById('addForm').addEventListener('submit', addData);
  document.querySelector('.load').addEventListener('click', loadData);
  const p = document.createElement('p');
  p.textContent = 'Press Load Button to display Catches';
  document.getElementById('catches').replaceChildren(p);
  document.getElementById('logout').addEventListener('click', logoutUser);
};

let userData = JSON.parse(localStorage.getItem('userData'));
if (userData == null) {
  userData = {};
}

async function loadData() {
  try {
    const catches = document.getElementById('catches');
    const res = await fetch('http://localhost:3030/data/catches');
    if (res.status != 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();

    catches.replaceChildren();
    for (let fish of data) {
      const div = document.createElement('div');
      div.setAttribute('class', 'catch');
      div.innerHTML = `<label>Angler</label>
          <input type="text" class="angler" value="${fish.angler}">
          <label>Weight</label>
          <input type="text" class="weight" value="${fish.weight}">
          <label>Species</label>
          <input type="text" class="species" value="${fish.species}">
          <label>Location</label>
          <input type="text" class="location" value="${fish.location}">
          <label>Bait</label>
          <input type="text" class="bait" value="${fish.bait}">
          <label>Capture Time</label>
          <input type="number" class="captureTime" value="${fish.captureTime}">
          <button class="update" data-id="${fish._id}" ${userData.id == fish._ownerId ? '' : 'disabled'}>Update</button>
          <button class="delete" data-id="${fish._id}" ${userData.id == fish._ownerId ? '' : 'disabled'}>Delete</button>
          `;
      catches.appendChild(div);
    }
    document.querySelectorAll('.update').forEach(button => {
      button.addEventListener('click', updateData);
    });
    document.querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', deleteData);
    });
  } catch (err) {
    console.error(err);
  }
}

async function updateData(e) {
  try {
    const body = {
      angler: e.target.parentNode.children[1].value,
      weight: Number(e.target.parentNode.children[3].value),
      species: e.target.parentNode.children[5].value,
      location: e.target.parentNode.children[7].value,
      bait: e.target.parentNode.children[9].value,
      captureTime: Number(e.target.parentNode.children[11].value),
    };

    const options = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.token,
      },
      body: JSON.stringify(body),
    };

    const res = await fetch('http://localhost:3030/data/catches/' + e.target.dataset.id, options);
    if (res.ok != true) {
      const error = await res.json();
      throw new Error(error.message);
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteData(e) {
  const options = {
    method: 'delete',
    headers: {
      'X-Authorization': userData.token,
    },
  };

  try {
    const res = await fetch('http://localhost:3030/data/catches/' + e.target.dataset.id, options);
    if (res.ok != true) {
      const error = await res.json();
      throw new Error(error.message);
    }

    e.target.parentNode.remove();
  } catch (err) {
    console.error(err.message);
  }
}

async function addData(e) {
  e.preventDefault();
  const form = document.getElementById('addForm');

  const body = {
    angler: form.angler.value,
    weight: Number(form.weight.value),
    species: form.species.value,
    location: form.location.value,
    bait: form.bait.value,
    captureTime: Number(form.captureTime.value),
  };

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userData.token,
    },
    body: JSON.stringify(body),
  };

  const res = await fetch('http://localhost:3030/data/catches', options);
  const data = await res.json();

  loadData();
}

async function logoutUser() {
  try {
    const options = {
      method: 'get',
      headers: {
        'X-Authorization': userData.token,
      },
    };

    const res = await fetch('http://localhost:3030/users/logout', options);
    if (res.status != 204) {
      throw new Error('unsuccessful logout');
    }
    localStorage.removeItem('userData');
    window.location = './index.html';
  } catch (err) {
    console.error(err);
  }
}
