import { catalogPage } from './catalog.js';
import { html, render } from './util.js';

export function showNav() {
  const nav = document.querySelector('nav');

  const navTemplateUser = html`
    <a id="catalogLink" href="index" class="active">Dashboard</a>
    <div id="user">
      <a id="createLink" href="create">Create Furniture</a>
      <a id="profileLink" href="my-furniture">My Publications</a>
      <a id="logoutBtn" href="javascript:void(0)" @click=${logout}>Logout</a>
    </div>
  `;

  const navTemplateGuest = html`
    <a id="catalogLink" href="index" class="active">Dashboard</a>
    <div id="guest">
      <a id="loginLink" href="login">Login</a>
      <a id="registerLink" href="register">Register</a>
    </div>
  `;

  render(sessionStorage.accessToken ? navTemplateUser : navTemplateGuest, nav);
}

async function logout() {
  await fetch('http://localhost:3030/users/logout', {
    method: 'get',
    headers: {
      'X-Authorization': sessionStorage.accessToken,
    },
  });
  sessionStorage.removeItem('accessToken');
  catalogPage();
}
