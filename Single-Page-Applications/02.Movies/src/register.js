import { updateNav } from './app.js';
import { showView } from './dom.js';
import { showHome } from './home.js';

const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);
section.remove();

export function showRegister() {
    showView(section);
}

async function onRegister(event) {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    const repeatPassword = form.repeatPassword.value;

    try {
        if (email == '') {
            throw new Error('Email field required!');
        }

        if (password.length < 6) {
            throw new Error('Password must be atleast 6 characters!');
        }

        if (password != repeatPassword) {
            throw new Error('Passwords do not match!');
        }

        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ email, password })
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }));

        form.reset();
        updateNav();
        showHome();
    } catch (err) {
        alert(err.message);
    }
}