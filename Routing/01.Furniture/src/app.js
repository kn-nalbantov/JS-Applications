import { catalogPage } from './catalog.js';
import { createPage } from './create.js';
import { detailsPage } from './details.js';
import { editPage } from './edit.js';
import { loginPage } from './login.js';
import { registerPage } from './register.js';
import { html, render, page } from './util.js';

page('/', catalogPage);
page('/index', catalogPage);
page('/details/:id', detailsPage);
page('/edit', editPage);
page('/create', createPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', catalogPage);
page('*', catalogPage);
page.start();
