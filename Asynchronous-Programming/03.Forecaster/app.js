function attachEvents() {
    const input = document.getElementById('location');
    const forecastDiv = document.getElementById('forecast');
    const upcomingDiv = document.getElementById('upcoming');
    document.getElementById('submit').addEventListener('click', getWeather);

    async function getWeather() {
        try {
        let locationCode = '';
        const res = await fetch('http://localhost:3030/jsonstore/forecaster/locations');

        const data = await res.json();

        for (let location of data) {
            if (location.name == input.value) {
                locationCode = location.code;
            }
        }

        const [todayRes, upcommingRes] = await Promise.all([fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`), fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`)]);

        const [today, upcoming] = await Promise.all([todayRes.json(), upcommingRes.json()]);


        forecastDiv.style.display = 'block';


        forecastDiv.children[0].innerHTML = `<div class="label">Current conditions</div>
          <div class="forecasts">
            <span class="condition symbol">&#x2600;</span>
            <span class="condition">
            <span class="forecast-data">${today.name}</span>
            <span class="forecast-data">${today.forecast.low}&#176;/${today.forecast.high}&#176;</span>
            <span class="forecast-data">${today.forecast.condition}</span>
          </span>
          </div>
        `;

        const symbols = {
            'Partly sunny': '&#x26C5;',
            'Overcast': '&#x2601;',
            'Rain': '&#x2614;'
        }

        upcomingDiv.innerHTML = `<div class="label">Three-day forecast</div>
          <div class="forecast-info">
            <span class="upcoming">
              <span class="symbol">${symbols[upcoming.forecast[0].condition]}</span>
              <span class="forecast-data">${upcoming.forecast[0].low}/${upcoming.forecast[0].high}</span>
              <span class="forecast-data">${upcoming.forecast[0].condition}</span>
            </span>
            <span class="upcoming">
              <span class="symbol">${symbols[upcoming.forecast[1].condition]}</span>
              <span class="forecast-data">${upcoming.forecast[1].low}/${upcoming.forecast[1].high}</span>
              <span class="forecast-data">${upcoming.forecast[1].condition}</span>
            </span>
            <span class="upcoming">
              <span class="symbol">${symbols[upcoming.forecast[2].condition]}</span>
              <span class="forecast-data">${upcoming.forecast[2].low}/${upcoming.forecast[2].high}</span>
              <span class="forecast-data">${upcoming.forecast[2].condition}</span>
            </span>
          </div>
        `;
        } catch {
            forecastDiv.style.display = 'block';
            forecastDiv.children[0].innerHTML = '<div class="label">Error</div>';
            upcomingDiv.innerHTML = '';
        }

    }
}

attachEvents();