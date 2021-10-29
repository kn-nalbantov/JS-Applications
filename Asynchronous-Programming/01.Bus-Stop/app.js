function getInfo() {
  const stopName = document.getElementById('stopName');
  const listBuses = document.getElementById('buses');
  const input = document.getElementById('stopId');
  let resObj = {};

  fetch(`http://localhost:3030/jsonstore/bus/businfo/${input.value}`)
    .then(res => res.json())
    .then(data => {
      stopName.textContent = data.name;
      while (listBuses.hasChildNodes()) {
        listBuses.firstChild.remove();
      }
      for (bus in data.buses) {
        const li = document.createElement('li');
        li.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
        listBuses.appendChild(li);
      }
    })
    .catch(error => console.log(error));
}
