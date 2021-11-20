import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const container = document.getElementById('allCats');
function loadCats() {
  const liElements = data =>
    data.map(
      cat => html` <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap" />
        <div class="info">
          <button class="showBtn" @click="${showStatus}">Show status code</button>
          <div class="status" style="display: none" id="${cat.id}">
            <h4>Status code${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
          </div>
        </div>
      </li>`
    );
  const template = html`<ul>
    ${liElements(cats)}
  </ul>`;

  render(template, container);
}

function showStatus(e) {
  if (e.target.textContent == 'Show status code') {
    e.target.textContent = 'Hide status code';
    e.target.parentNode.children[1].style.display = 'block';
  } else {
    e.target.textContent = 'Show status code';
    e.target.parentNode.children[1].style.display = 'none';
  }
}

loadCats();
