window.onload = () => {
  loadStudents();
  attachEvents();
};

async function loadStudents() {
  try {
    const tbody = document.querySelector('tbody');
    tbody.replaceChildren();
    const res = await fetch('http://localhost:3030/jsonstore/collections/students');
    if (res.status != 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();

    for (let student in data) {
      const tr = document.createElement('tr');

      const firstName = document.createElement('td');
      firstName.textContent = data[student].firstName;

      const lastName = document.createElement('td');
      lastName.textContent = data[student].lastName;

      const facultyNumber = document.createElement('td');
      facultyNumber.textContent = data[student].facultyNumber;

      const grade = document.createElement('td');
      grade.textContent = data[student].grade;

      tbody.appendChild(tr);
      tr.appendChild(firstName);
      tr.appendChild(lastName);
      tr.appendChild(facultyNumber);
      tr.appendChild(grade);
    }
  } catch (err) {
    console.error(err);
  }
}

function attachEvents() {
  const form = document.getElementById('form');
  form.addEventListener('submit', onSubmit);
  const firstName = form.firstName;
  const lastName = form.lastName;
  const facultyNumber = form.facultyNumber;
  const grade = form.grade;

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const student = {
        firstName: firstName.value,
        lastName: lastName.value,
        facultyNumber: facultyNumber.value,
        grade: grade.value,
      };

      let studentValues = Object.values(student);
      if (studentValues.some(x => x == '')) {
        throw new Error('All fields are required.');
      }

      firstName.value = '';
      lastName.value = '';
      facultyNumber.value = '';
      grade.value = '';

      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      };
      const res = await fetch('http://localhost:3030/jsonstore/collections/students', options);
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
    //   const data = await res.json();

      loadStudents();
    } catch (err) {
      alert(err.message);
    }
  }
}
