import { register } from '../api.js';
import { html } from '../lib.js';

export function registerPage(ctx) {
  ctx.updateUserNav();  
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const repeatPass = formData.get('repeatPass');
    if (username == '' || password == '') {
      return alert('All fields are required!');
    }
    if (password != repeatPass) {
      return alert('Passwords don\'t match!');
    }

    await register(username, password);
    ctx.page.redirect('/listings');
  }
}

const registerTemplate = onSubmit => html`
  <section id="register">
    <div class="container">
      <form id="register-form" @submit=${onSubmit}>
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <p>Username</p>
        <input type="text" placeholder="Enter Username" name="username" required />

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" required />

        <p>Repeat Password</p>
        <input type="password" placeholder="Repeat Password" name="repeatPass" required />
        <hr />

        <input type="submit" class="registerbtn" value="Register" />
      </form>
      <div class="signin">
        <p>Already have an account? <a href="#">Sign in</a>.</p>
      </div>
    </div>
  </section>
`;
