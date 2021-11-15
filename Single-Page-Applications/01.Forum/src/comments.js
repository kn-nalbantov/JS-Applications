const container = document.querySelector('.container');

export async function showComments(post) {
  let timestamp = new Date();
  const comments = await getComments(post._id);
  const renderComments = comments
    .map(x => (x = `
  <div class="user-comment">
  <div class="topic-name-wrapper">
  <div class="topic-name">
      <p><strong>${x.username}</strong> commented on <time>${timestamp.toLocaleString()}</time></p>
      <div class="post-content">
          <p>${x.commentText}</p>
      </div>
  </div>
</div>
</div>
  `))
    .join('');

  const div = document.createElement('div');
  div.setAttribute('class', 'theme-content');

  div.innerHTML = `
        <div class="theme-title" data-id="${post._id}">
            <div class="theme-name-wrapper">
                    <div class="theme-name">
                        <h2>${post.topicName}</h2>

                    </div>

                </div>
            </div>
            <!-- comment  -->

            <div class="comment">
                <div class="header">
                    <img src="./static/profile.png" alt="avatar">
                    <p><span>${post.username}</span> posted on <time>${timestamp.toLocaleString()}</time></p>

                    <p class="post-content">${post.postText}</p>
                </div>
                ${renderComments}   
            </div>

            <div class="answer-comment">
                <p><span>currentUser</span> comment:</p>
                <div class="answer">
                    <form>
                        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                        <div>
                            <label for="username">Username <span class="red">*</span></label>
                            <input type="text" name="username" id="username">
                        </div>
                        <button>Post</button>
                    </form>
                </div>
            </div>
        </div>
    `;

  div.addEventListener('click', onSubmit);
  
  container.replaceChildren(div);



      async function onSubmit(e) {
        e.preventDefault();
        if (e.target.tagName == 'BUTTON') {
          try {
            if (e.target.parentNode.postText.value == '' || e.target.parentNode.username.value == '') {
              throw new Error('All fields are required!');
            }
      
            const body = {
              commentText: e.target.parentNode.postText.value,
              username: e.target.parentNode.username.value,
              postID: e.target.parentNode.parentNode.parentNode.parentNode.children[0].dataset.id,
            };
      
            const options = {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            };
            await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', options);
      
            await showComments(post);
            e.target.parentNode.postText.value = '';
            e.target.parentNode.username.value = '';
          } catch (err) {
            alert(err.message);
          }
        }
      }
}



async function getComments(postID) {
  try {
    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    const data = await res.json();

    const filtered = Object.values(data).filter(x => x.postID == postID);
    return filtered;
  } catch (err) {
    console.error(err);
  }
}
