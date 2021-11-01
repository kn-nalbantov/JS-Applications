async function solution() {
  try {
    const main = document.getElementById('main');
    const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
  
    const data = await res.json();
  
    const moreContentIds = [];
  
    for (let article of data) {
      moreContentIds.push(article._id);
    }
  
    const list = [];
    moreContentIds.forEach(id => {
      let newRes = fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
      list.push(newRes);
    });
  
    const responses = await Promise.all(list);
  
    const content = [];
    responses.forEach(r => {
      let newContent = r.json();
      content.push(newContent);
    });
  
    const moreContent = await Promise.all(content);
  
    for (let i = 0; i < data.length; i++) {
      main.innerHTML += `<div class="accordion">
          <div class="head">
              <span>${data[i].title}</span>
              <button class="button" id="${data[i]._id}">More</button>
          </div>
          <div class="extra">
              <p>${moreContent[i].content}</p>
          </div>
      </div>`;
    }
  
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', showMore);
    });
  
    function showMore(e) {
      const lessButton = document.createElement('button');
      lessButton.textContent = 'Less';
      lessButton.setAttribute('class', 'button');
      lessButton.addEventListener('click', showLess);
  
      e.target.parentNode.parentNode.children[1].style.display = 'block';
      e.target.parentNode.replaceChild(lessButton, e.target);
      function showLess(ev) {
        ev.target.parentNode.parentNode.children[1].style.display = 'none';
        ev.target.parentNode.replaceChild(e.target, ev.target);  
      }
    } 
  } catch (err) {
      console.error(err);
  }
}

solution();
