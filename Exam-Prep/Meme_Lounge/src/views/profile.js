import { getUserMemes } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

export async function profilePage(ctx) {
  const userData = getUserData();
  const id = userData.id;
  const data = await getUserMemes(id);
  ctx.render(profileTemplate(data, userData));
}

const profileTemplate = (data, userData) => html`
  <section id="user-profile-page" class="user-profile">
    <article class="user-info">
      <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender == 'male' ? 'male' : 
    'female'}.png" />
      <div class="user-content">
        <p>Username: ${userData.username}</p>
        <p>Email: ${userData.email}</p>
        <p>My memes count: ${data.length}</p>
      </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
      ${data.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : data.map(memeCard)}
    </div>
  </section>
`;

const memeCard = (meme) => html`
  <div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl} />
    <a class="button" href="/details/${meme._id}">Details</a>
  </div>
`;
