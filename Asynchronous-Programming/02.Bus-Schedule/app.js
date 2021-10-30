function solve() {
  const departButton = document.getElementById('depart');
  const arriveButton = document.getElementById('arrive');
  const infoBox = document.querySelector('.info');

  let resObj = {
    next: 'depot',
  };

  function depart() {
    fetch(`http://localhost:3030/jsonstore/bus/schedule/${resObj.next}`)
      .then(res => res.json())
      .then(data => {
        infoBox.textContent = `Next stop ${data.name}`;
        arriveButton.removeAttribute('disabled');
        departButton.setAttribute('disabled', true);
        resObj = data;
      })
      .catch(() => (infoBox.textContent = 'Error'));
  }

  function arrive() {
    infoBox.textContent = `Arriving at ${resObj.name}`;
    arriveButton.disabled = true;
    departButton.disabled = false;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
