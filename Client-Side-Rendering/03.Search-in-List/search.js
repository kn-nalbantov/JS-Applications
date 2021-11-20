import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const container = document.getElementById('towns');
const searchText = document.getElementById('searchText');
const result = document.getElementById('result');

let matches = 0;
function hasMatched(currentTown) {
  if (currentTown.toLowerCase().includes(searchText.value.toLowerCase()) && searchText.value != '') {
    matches++;
    return true;
  }
  return false;
}

function search() {
  const town = data => data.map(t => html`<li class="${hasMatched(t) ? 'active' : ''}">${t}</li>`);
  const template = html`<ul>
    ${town(towns)}
  </ul>`;
  render(template, container);
}

search();

document.querySelector('button').addEventListener('click', () => {
  search();
  const matchTemplate = html`<p>${matches} matches found</p>`;
  render(matchTemplate, result);
  matches = 0;
  searchText.value = '';
});












