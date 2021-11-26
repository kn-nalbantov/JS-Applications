export async function getData() {
  const res = await fetch('http://localhost:3030/data/catalog');
  const data = await res.json();
  return data;
}

export async function getDetails(id) {
  const res = await fetch('http://localhost:3030/data/catalog/' + id);
  const data = await res.json();
  return data;
}

export async function getDataByOwnerId(ownerId) {
  const res = await fetch('http://localhost:3030/data/catalog/');
  const data = await res.json();
  return data.filter(x => x._ownerId == ownerId);
}
