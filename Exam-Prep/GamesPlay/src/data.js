import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllGames() {
  return api.get('/data/games?sortBy=_createdOn%20desc');
}

export async function getRecentGames() {
  return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function createGame(title, category, maxLevel, imageUrl, summary) {
  return api.post('/data/games', { title, category, maxLevel, imageUrl, summary });
}

export async function getGameById(id) {
  return api.get('/data/games/' + id);
}

export async function deleteGame(id) {
  return api.del('/data/games/' + id);
}

export async function editGame(id, title, category, maxLevel, imageUrl, summary) {
  return api.put('/data/games/' + id, { title, category, maxLevel, imageUrl, summary });
}

export async function getComments(gameId) {
  return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function postComment(gameId, comment) {
  return api.post('/data/comments', { gameId, comment });
}
