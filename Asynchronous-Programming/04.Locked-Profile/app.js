function lockedProfile() {
    const main = document.getElementById('main');
    fetch('http://localhost:3030/jsonstore/advanced/profiles')
      .then(res => res.json())
      .then(data => {
        main.innerHTML = '';
        for (let user in data) {
            main.innerHTML += `<div class="profile">
            <img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user1Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user1Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user1Username" value="${data[user].username}" disabled readonly />
            <div id="user1HiddenFields">
                <hr>
                <label>Email:</label>
                <input type="email" name="user1Email" value="${data[user].email}" disabled readonly />
                <label>Age:</label>
                <input type="email" name="user1Age" value="${data[user].age}" disabled readonly />
            </div>
            <button>Show more</button>
        </div>`
        }
       document.querySelectorAll('.profile button').forEach(profileBtn => {
           profileBtn.addEventListener('click', showMore);
       }) 
    })
    .catch(err => console.error(err));
    
    function showMore(e) {
        const hideButton = document.createElement('button');
        hideButton.textContent = 'Hide it';
        hideButton.addEventListener('click', hideInfo);
        const unlocked = e.target.parentNode.children[4];
        if (unlocked.checked) {
            e.target.parentNode.children[9].style.display = 'block';
            e.target.parentNode.replaceChild(hideButton, e.target);
        }

        function hideInfo(ev) {
            if (unlocked.checked) {
                ev.target.parentNode.children[9].style.display = 'none';
                ev.target.parentNode.replaceChild(e.target, ev.target);
            }
        }
    }
}