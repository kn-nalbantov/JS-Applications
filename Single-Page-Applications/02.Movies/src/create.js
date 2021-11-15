import { showView } from './dom.js';
import { showHome } from './home.js';

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onCreate);
section.remove();

export function showCreate() {
    showView(section);
}

async function onCreate(event) {
    event.preventDefault();

    const title = form.title.value;
    const description = form.description.value;
    const img = form.imageUrl.value;

    try {
        if (title == '' || description == '' || img == '') {
            throw new Error('All fields required!');
        }

        const { token } = JSON.parse(sessionStorage.getItem('userData'));

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({title, description, img})
        }
        await fetch('http://localhost:3030/data/movies', options)

        form.reset();
        showHome();
    } catch (err) {
        alert(err.message);
    }
}

