import { html } from './util.js';

export function registerPage(ctx) {
  ctx.render(template(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const form = document.querySelector('form');
      const email = form.email.value;
      const password = form.password.value;
      const rePass = form.rePass.value;
      if (password != rePass) {
        throw new Error("Passwords don't match!");
      }
      if (email == '' || password == '' || rePass == '') {
        throw new Error('All fields are required!');
      }
      const res = await fetch('http://localhost:3030/users/register', {
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
      sessionStorage.setItem('userData', JSON.stringify(data));
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
      <h1>Register New User</h1>
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
        <div class="form-group">
          <label class="form-control-label" for="rePass">Repeat</label>
          <input class="form-control" id="rePass" type="password" name="rePass" />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </div>
    </div>
  </form>
`;
