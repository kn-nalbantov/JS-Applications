import { catalogPage } from './catalog.js';
import { showNav } from './nav.js';
import { html, render } from './util.js';

export function loginPage() {
  displayLogin();
  showNav();
}

function displayLogin() {
  const container = document.querySelector('.container');
  const template = html`
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
      </div>
    </div>
    <form>
      <div class="row space-top">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class="form-control" id="email" type="text" name="email" />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class="form-control" id="password" type="password" name="password" />
          </div>
          <input type="submit" class="btn btn-primary" value="Login" @click=${onSubmit} />
        </div>
      </div>
    </form>
  `;
  render(template, container);
}

async function onSubmit(e) {
  e.preventDefault();

  try {
    const form = document.querySelector('form');
    const email = form.email.value;
    const password = form.password.value;
    if (email == '' || password == '') {
      throw new Error('All fields are required!');
    }
    const res = await fetch('http://localhost:3030/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.status != 200) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const data = await res.json();
    sessionStorage.setItem('accessToken', data.accessToken);
    catalogPage();
  } catch (err) {
    alert(err.message);
  }
}
