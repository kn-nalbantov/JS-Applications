import { html, render } from '../node_modules/lit-html/lit-html.js';

async function solve() {
  document.querySelector('#searchBtn').addEventListener('click', onClick);
  const tbody = document.querySelector('tbody');
  const students = await getData();
  const searchText = document.getElementById('searchField');

  function isSelected(currentStudent) {
    let student = Object.values(currentStudent);
    student.pop(); //removes id field from student array || Used to optimize search
    if (student.some(s => s.toLowerCase().includes(searchText.value.toLowerCase())) && searchText.value != '') {
      return true;
    }
    return false;
  }

  const template = data => html`
    ${data.map(
      record => html`
        <tr class="${isSelected(record) ? 'select' : ''}">
          <td>${record.firstName} ${record.lastName}</td>
          <td>${record.email}</td>
          <td>${record.course}</td>
        </tr>
      `
    )}
  `;

  render(template(students), tbody);

  function onClick() {
    render(template(students), tbody);
    searchText.value = '';
  }
}

solve();

async function getData() {
  const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
  const data = await res.json();

  return Object.values(data);
}
