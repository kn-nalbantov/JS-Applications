function getInfo() {
  const stopName = document.getElementById('stopName');
  const listBuses = document.getElementById('buses');
  const input = document.getElementById('stopId');

  fetch(`http://localhost:3030/jsonstore/bus/businfo/${input.value}`)
    .then(res => {
      while (listBuses.hasChildNodes()) {
        listBuses.firstChild.remove();
      }
      if (res.status != 200) {
        stopName.textContent = 'Error';
        throw new Error('reponse not 200');
      }
      return res.json();
    })
    .then(data => {
      stopName.textContent = data.name;
      for (bus in data.buses) {
        const li = document.createElement('li');
        li.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
        listBuses.appendChild(li);
      }
    })
    .catch(error => console.log(error));
}
