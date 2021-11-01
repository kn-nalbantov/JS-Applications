function attachEvents() {
  document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
  const select = document.getElementById('posts');
  document.getElementById('btnViewPost').addEventListener('click', viewPost);
  const postTitle = document.getElementById('post-title');
  const postBody = document.getElementById('post-body');
  const postComments = document.getElementById('post-comments');

  async function loadPosts() {
    try {
      const res = await fetch('http://localhost:3030/jsonstore/blog/posts');
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      const data = await res.json();

      for (let post in data) {
        const option = document.createElement('option');
        option.setAttribute('data-body', data[post].body); //stored for later use
        option.value = post;
        option.textContent = data[post].title;
        select.appendChild(option);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function viewPost(e) {
    try {
      const selectedIndex = e.target.parentNode.children[2].selectedIndex;
      const selectedPostId = e.target.parentNode.children[2][selectedIndex].value;

      const res = await fetch(`http://localhost:3030/jsonstore/blog/comments/`);
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      const data = await res.json();

      const comments = Object.values(data).filter(x => x.postId == selectedPostId);

      while (postComments.hasChildNodes()) {
        postComments.firstChild.remove();
      }
      postTitle.textContent = '';
      postBody.textContent = '';

      comments.forEach(comment => {
        const li = document.createElement('li');
        li.setAttribute('id', comment.id);
        li.textContent = comment.text;
        postComments.appendChild(li);
      });

      postTitle.textContent = e.target.parentNode.children[2][selectedIndex].textContent;
      postBody.textContent = e.target.parentNode.children[2][selectedIndex].dataset.body;
      /*
      postBody.textContent could alternatively be acquired by another GET request to
      http://localhost:3030/jsonstore/blog/posts
      and then filtering by selectedPostId
      */
    } catch (err) {
      console.error(err);
    }
  }
}

attachEvents();
