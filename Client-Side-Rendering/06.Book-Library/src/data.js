export async function getData() {
  const res = await fetch('http://localhost:3030/jsonstore/collections/books/');
  const data = await res.json();

  return data;
}