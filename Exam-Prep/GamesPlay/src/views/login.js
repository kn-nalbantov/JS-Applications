import { login } from '../api.js';
import { html } from '../lib.js';

export function loginPage(ctx) {
  ctx.updateUserNav();
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    await login(email, password);
    ctx.page.redirect('/');
  }
}

const loginTemplate = onSubmit => html`
  <section id="login-page" class="auth">
    <form id="login" @submit=${onSubmit}>
      <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" />

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password" />
        <input type="submit" class="btn submit" value="Login" />
        <p class="field">
          <span>If you don't have profile click <a href="#">here</a></span>
        </p>
      </div>
    </form>
  </section>
`;
