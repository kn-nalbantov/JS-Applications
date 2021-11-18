import {html, render} from '../node_modules/lit-html/lit-html.js';
import {cats} from './catSeeder.js';

console.log(cats);

const container = document.getElementById('allCats');
function loadCats() {
    
    const liElements = (data) => data.map(cat => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap" />
        <div class="info">
            <button class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="100">
                <h4>Status code${cat.statusCode}</h4>
                <p>Continue</p>
            </div>
        </div>
    </li>`);
    const template = html`<ul><li>${liElements(cats)}</li></ul>`;

    render(template, container);
}

loadCats();