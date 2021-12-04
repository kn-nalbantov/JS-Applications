import { html, page } from '../lib.js';

export const searchBar = html`
  <section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
      <input id="search-input" type="text" name="search" placeholder="Enter desired production year" />
      <button class="button-list searchBtn" @click=${onSearch}>Search</button>
    </div>
  </section>
`;

async function onSearch(e) {
  const search = e.target.parentNode.children[0].value;
  page.redirect('/search/' + search);
}
