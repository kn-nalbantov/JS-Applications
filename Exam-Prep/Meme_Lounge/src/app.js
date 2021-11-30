import * as api from './data.js';
import { page, render } from './lib.js';
import { allMemes } from './views/all-memes.js';
import { homePage } from './views/home.js';

/* debug */
window.api = api;

const root = document.querySelector('main');

page(decorateContext);
page('/', homePage);
page('/all-memes', allMemes);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);

    next();
}