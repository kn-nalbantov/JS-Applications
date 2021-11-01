function attachEvents() {
  document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
  const select = document.getElementById('posts');
  document.getElementById('btnViewPost').addEventListener('click', viewPost);

  async function loadPosts() {
    try {
      const res = await fetch('http://localhost:3030/jsonstore/blog/posts');
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      console.log(data);

      for (let post in data) {
        // console.log(typeof post);
        const option = document.createElement('option');
        option.value = data[post].id;
        option.textContent = data[post].title;
        select.appendChild(option);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function viewPost(e) {
    const selectedIndex = e.target.parentNode.children[2].selectedIndex;
    const selectedPostId = e.target.parentNode.children[2][selectedIndex].value;
    console.log(selectedPostId); //-MSbypx-13fHPDyzNRtf

    const res = await fetch(`http://localhost:3030/jsonstore/blog/comments/-MSbypx-13fHPDyzNRtf`);

    const data = await res.text();

    console.log(data);
  }
}

attachEvents();
