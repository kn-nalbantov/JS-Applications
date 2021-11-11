import { showHome } from './home.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';

const views = {
  homeLink: showHome,
  loginLink: showLogin,
  registerLink: showRegister,
};

const nav = document.querySelector('nav');

nav.addEventListener('click', e => {
  const view = views[e.target.id];
  if (typeof view == 'function') {
    e.preventDefault();
    view();
  }
});

showHome();