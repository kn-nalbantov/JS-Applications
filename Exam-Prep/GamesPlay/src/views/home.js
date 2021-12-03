import { getRecentGames } from '../data.js';
import { html } from '../lib.js';

export async function homePage(ctx) {
  let data = await getRecentGames();
  if (data.length > 3) {
      data.length = 3;
  }
  ctx.updateUserNav(); 
  ctx.render(homeTemplate(data));
}

const homeTemplate = (data) => html`
  <section id="welcome-world">
    <div class="welcome-message">
      <h2>ALL new games are</h2>
      <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero" />

    <div id="home-page">
      <h1>Latest Games</h1>

      <!-- Display div: with information about every game (if any) -->


      <!-- Display paragraph: If there is no games  -->
      ${data.length == 0 ? html`<p class="no-articles">No games yet</p>` : data.map(gameCard)}
    </div>
  </section>
`;

const gameCard = game => html`
  <div class="game">
    <div class="image-wrap">
      <img src=${game.imageUrl} />
    </div>
    <h3>${game.title}</h3>
    <div class="rating"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></div>
    <div class="data-buttons">
      <a href="/details/${game._id}" class="btn details-btn">Details</a>
    </div>
  </div>
`;
