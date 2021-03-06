import { clearUserData, getUserData, setUserData } from './util.js';

const hostname = 'http://localhost:3030' //REST API

async function request(url, options) {
  try {
    const res = await fetch(hostname + url, options);

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    try {
      return await res.json();
    } catch (_) {
      return res;
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

function createOptions(method = 'get', data) {
  const options = {
    method,
    headers: {},
  };

  if (data != undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const userData = getUserData();
  if (userData) {
    options.headers['X-Authorization'] = userData.token;
  }

  return options;
}

export async function get(url) {
  return request(url, createOptions());
}

export async function post(url, data) {
  return request(url, createOptions('post', data));
}

export async function put(url, data) {
  return request(url, createOptions('put', data));
}

export async function del(url) {
  return request(url, createOptions('delete'));
}

export async function login(username, password) {
  const result = await post('/users/login', { username, password });

  const userData = {
    username: result.username,
    id: result._id,
    token: result.accessToken,
  };
  setUserData(userData);

  return result;
}

export async function register(username, password) {
  const result = await post('/users/register', { username, password });

  const userData = {
    username: result.username,
    id: result._id,
    token: result.accessToken,
  };
  setUserData(userData);

  return result;
}

export async function logout() {
  await get('/users/logout');
}
