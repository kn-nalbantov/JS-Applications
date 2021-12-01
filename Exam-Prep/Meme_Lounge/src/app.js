import { logout } from './api.js';
import * as api from './data.js';
import { page, render } from './lib.js';
import { clearUserData, getUserData } from './util.js';
import { allMemes } from './views/all-memes.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

/* debug */
window.api = api;

const root = document.querySelector('main');
document.querySelector('.logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/all-memes', allMemes);
page('/login', loginPage);
page('/register', registerPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function onLogout() {
    logout();
    clearUserData();
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}