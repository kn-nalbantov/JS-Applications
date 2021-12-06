import { getListingsBySearchQuery } from '../data.js';
import { html } from '../lib.js';

export async function searchPage(ctx) {
  const params = ctx.querystring.split('=')[1];
  let data = [];
  if (params) {
    data = await getListingsBySearchQuery(decodeURIComponent(params));
  }
  ctx.render(searchTemplate(params, data, onSearch));

  async function onSearch(e) {
    const search = e.target.parentNode.children[0].value;
    ctx.page.redirect('/search?query=' + encodeURIComponent(search));
  }
}

const searchTemplate = (params = '', data, onSearch) => html`
  <section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
      <input id="search-input" type="text" name="search" value=${params} />
      <button class="button-list searchBtn" @click=${onSearch}>Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">${data.length == 0 ? html`<p class="no-cars">No results.</p>` : data.map(carCard)}</div>
  </section>
`;

const carCard = car => html`
  <div class="listing">
    <div class="preview">
      <img src=${car.imageUrl} />
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
      <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
      </div>
      <div class="data-buttons">
        <a href="/details/${car._id}" class="button-carDetails">Details</a>
      </div>
    </div>
  </div>
`;
