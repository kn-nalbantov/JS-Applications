import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllBooks() {
    return api.get('/data/books?sortBy=_createdOn%20desc');
}

export async function createBook(book) {
    return api.post('/data/books', book);
}

export async function getBookById(id) {
    return api.get('/data/books/' + id);
}

export async function deleteBookById(id) {
    return api.del('/data/books/' + id);
}

export async function editBook(id, book) {
    return api.put('/data/books/' + id, book);
}

export async function getBooksByUserId(id) {
    return api.get(`/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`)
}

export async function likeBook(book) {
    return api.post('/data/likes', book);
}

export async function getBookLikes(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getBookLikesByUserId(bookId, userId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}