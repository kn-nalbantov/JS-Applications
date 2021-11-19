import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const container = document.getElementById('towns');
function search() {
  const town = data => data.map(t => html`<li>${t}</li>`);
  const template = html`<ul>
    ${town(towns)}
  </ul>`;
  render(template, container);
}

search();