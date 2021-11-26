import { catalogPage } from './catalog.js';
import { createPage } from './create.js';
import { getDataByOwnerId, getData } from './data.js';
import { detailsPage } from './details.js';
import { editPage } from './edit.js';
import { loginPage } from './login.js';
import { registerPage } from './register.js';
import { render, page } from './util.js';

const container = document.querySelector('.container');

page(decorateContext);
page('/', catalogPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/create', createPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', catalogPage);
page('*', catalogPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = content => render(content, container);
  ctx.updateUserNav = updateUserNav;

  next();
}

function updateUserNav() {
  const userData = sessionStorage.getItem('userData');
  if (userData) {
    document.getElementById('user').style.display = 'inline-block';
    document.getElementById('guest').style.display = 'none';
  } else {
    document.getElementById('user').style.display = 'none';
    document.getElementById('guest').style.display = 'inline-block';
  }
}

document.getElementById('logoutBtn').addEventListener('click', onLogout);
async function onLogout() {
  await fetch('http://localhost:3030/users/logout', {
    method: 'get',
    headers: {
      'X-Authorization': JSON.parse(sessionStorage.userData).accessToken,
    },
  });
  sessionStorage.removeItem('userData');
  updateUserNav();
  page.redirect('/');
}

/* debugging */
window.getDataByOwnerId = getDataByOwnerId;
window.getData = getData;
