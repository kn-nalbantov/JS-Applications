import { html } from './util.js';

export function loginPage(ctx) {
  ctx.render(template(onSubmit));

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
      ctx.updateUserNav();
      ctx.page.redirect('/');
    } catch (err) {
      alert(err.message);
    }
  }
}

const template = onSubmit => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
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
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>
`;

