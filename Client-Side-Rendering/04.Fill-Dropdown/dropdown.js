import { html, render } from '../node_modules/lit-html/lit-html.js';

async function populateDropdown() {
  try {
    const menu = document.getElementById('menu');
    const res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    if (res.status != 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    const cities = Object.values(data);

    const template = cities.map(c => html`<option value="${c._id}">${c.text}</option>`);
    render(template, menu);
  } catch (err) {
    console.error(err);
  }
}

populateDropdown();

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  try {
    const text = document.getElementById('itemText');
    const body = {
      text: text.value,
    };
    if (body.text == '') {
      throw new Error('You must enter a city name!');
    }
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', options);
    if (res.status != 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    populateDropdown();
    text.value = '';
  } catch (err) {
    alert(err.message);
  }
}
