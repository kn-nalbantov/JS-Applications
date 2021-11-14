import { showComments } from './comments.js';

export function renderPosts(post) {
  const topics = document.querySelector('.topic-container');

  const div = document.createElement('div');
  div.setAttribute('class', 'topic-name-wrapper');
  div.innerHTML = `
        <div class="topic-name">
            <a href="/posts/${post.topicName}" class="normal">
                <h2>${post.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${post.username}</span></p>
                    </div>
                </div>


            </div>
        </div>
    `;

  div.addEventListener('click', e => {
    e.preventDefault();
    showComments(post);
  });
  topics.appendChild(div);
}
