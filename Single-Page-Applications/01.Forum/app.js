import { showHome } from './src/home.js';
import { renderPosts } from './src/posts.js';

//initialization
showHome();
getPosts();

document.querySelector('.public').addEventListener('click', createTopic);
document.querySelector('.cancel').addEventListener('click', clearFields);
document.querySelector('nav a').addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
})
const form = document.querySelector('form');
const topicName = form.topicName;
const username = form.username;
const postText = form.postText;

async function createTopic(e) {
  e.preventDefault();
  try {
    const body = {
      topicName: topicName.value,
      username: username.value,
      postText: postText.value,
    };
    if (body.topicName == '' || body.username == '' || body.postText == '') {
      throw new Error('All fields are required!');
    }
    topicName.value = '';
    username.value = '';
    postText.value = '';
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', options);
    const data = await res.json();

    renderPosts(data);
  } catch (err) {
    alert(err.message);
  }
}

function clearFields(e) {
  e.preventDefault();
  topicName.value = '';
  username.value = '';
  postText.value = '';
}

async function getPosts() {
  const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
  const data = await res.json();

  for (let post in data) {
    renderPosts(data[post]);
  }
}
