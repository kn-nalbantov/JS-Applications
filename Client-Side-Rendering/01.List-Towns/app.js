import {render, html} from '../node_modules/lit-html/lit-html.js';

const container = document.getElementById('root');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    
    const towns = form.towns.value.split(', ');
    const template = html`<ul>${towns.map(t => html`<li>${t}</li>`)}</ul>`;
    render(template, container);
}