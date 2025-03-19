document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").addEventListener("click", (e) => {
    e.preventDefault();
    const city = document.getElementById("searchInput");
    const apiKey = "152af43562b1cab90f909271334ffbdd";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
    let cardTitle = document.getElementById("title");
    console.log(city.value);

    //   fetch Weather Data

    fetch(weatherUrl)
      .then((response) => {
        if (!response.ok) {
          document.getElementById("mainDiv").style.opacity = 1;
          cardTitle.innerText = "City/Country not found";
          document.querySelector(".mainInfo").innerHTML = "";
          throw new Error("Failed to fetch the data");
        } else {
          document.getElementById("mainDiv").style.opacity = 1;
          cardTitle.innerHTML = `Weather in <span id="card_city" class="text-success">${city.value
            .charAt(0)
            .toUpperCase()}${city.value.slice(1).toLowerCase()}</span>`;
          return response.json();
        }
      })
      .then((data) => {
        document.querySelector(".mainInfo").innerHTML = `
        <p
      style="
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
          sans-serif;
        font-size: 1.4rem;
        width: 100%;
        text-align: center;
      "
    >
      Temperatures:
    </p>
    <p
      style="
        font-family: Arial, sans-serif;
        letter-spacing: 1px;
        word-spacing: 2px;
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
      "
    >
      Main: ${data.main.temp}&deg;C
    </p>
    <p
      style="
        font-family: Arial, sans-serif;
        letter-spacing: 1px;
        word-spacing: 2px;
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
      "
    >
      Max: ${data.main.temp_max}&deg;C
    </p>
    <p
      style="
        font-family: Arial, sans-serif;
        letter-spacing: 1px;
        word-spacing: 2px;
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
      "
    >
      Min: ${data.main.temp_min}&deg;C
    </p>
    <p
      style="
        font-family: Arial, sans-serif;
        letter-spacing: 1px;
        word-spacing: 2px;
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
      "
    >
      Feels Like: ${data.main.feels_like}&deg;C
    </p>
    <hr />
    <p
      style="
        font-family: Arial, sans-serif;
        letter-spacing: 1px;
        word-spacing: 2px;
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
      "
    >
      Sky: ${data.weather[0].main}
    </p>
    <p
      style="
        font-family: Arial, sans-serif;
        letter-spacing: 1px;
        word-spacing: 2px;
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
      "
    >
      Humidity: ${data.main.humidity}&#37;
    </p>
    <p
      style="
        font-family: Arial, sans-serif;
        letter-spacing: 1px;
        word-spacing: 2px;
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
      "
    >
      Wind Speed: ${data.wind.speed}m/s (${(data.wind.speed * 3.6).toFixed(
          2
        )}km/h)
    </p>
      
        `;

        console.log(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
});
