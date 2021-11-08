window.onload = () => {
  document.querySelector('form').addEventListener('submit', onSubmit);
};

async function onSubmit(e) {
  e.preventDefault();

  try {
    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = {
      email,
      password,
    };
    if (user.email == '' || user.password == '') {
      throw new Error('Both fields are required');
    }

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const res = await fetch('http://localhost:3030/users/login', options);
    if (res.ok != true) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const data = await res.json();

    const userData = {
      email: data.email,
      id: data._id,
      token: data.accessToken,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    window.location = './index.html';
  } catch (err) {
    alert(err.message);
  }
}
