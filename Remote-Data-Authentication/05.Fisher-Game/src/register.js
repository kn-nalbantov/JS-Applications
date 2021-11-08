window.onload = () => {
  document.querySelector('form').addEventListener('submit', onSubmit);
};

async function onSubmit(e) {
  e.preventDefault();

  try {
    const email = e.target.email.value;
    const password = e.target.password.value;
    const rePass = e.target.rePass.value;

    if (password != rePass) {
      throw new Error("The passwords don't match!");
    }

    const body = {
      email,
      password,
    };

    if (body.email == '' || body.password == '') {
      throw new Error('All fields are required!');
    }

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const res = await fetch('http://localhost:3030/users/register', options);
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
