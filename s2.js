document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search");
  const searchButtonMobile = document.getElementById("searchMobile");
  const searchAgain = document.getElementById("searchAgain");
  const scrollToMainDiv = () => {
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = (e, inputId) => {
    e.preventDefault();
    const city = document.getElementById(inputId);
    const apiKey = "152af43562b1cab90f909271334ffbdd";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value.trim()}&appid=${apiKey}&units=metric`;
    let cardTitle = document.getElementById("title");
    const spinner = document.getElementById("spinner");
    const mainDiv = document.getElementById("mainDiv");

    searchAgain.addEventListener("click", (e) => {
      e.preventDefault();
      if (inputId === "searchInput") {
        document.getElementById("searchInput").focus();
        document.getElementById("searchInput").value = "";
      } else if (inputId === "searchInputMobile") {
        document.getElementById("searchInputMobile").focus();
        document.getElementById("searchInputMobile").value = "";
      }
    });

    if (city.value.trim() === "") {
      mainDiv.classList.remove("show");
    } else {
      spinner.style.display = "block";
      mainDiv.classList.remove("show");

      setTimeout(() => {
        fetch(weatherUrl)
          .then((response) => {
            if (!response.ok) {
              mainDiv.classList.add("show");
              cardTitle.innerText = "City or Country not found";
              document.querySelector(".mainInfo").innerHTML = "";
              throw new Error("Failed to fetch the data");
            } else {
              mainDiv.classList.add("show");
              cardTitle.innerHTML = `Weather in <span id="card_city" class="text-success">${city.value
                .charAt(0)
                .toUpperCase()}${city.value.slice(1).toLowerCase()}</span>`;
              return response.json();
            }
          })
          .then((data) => {
            function getEmoji() {
              if (
                data.weather[0].main.includes("Clear") ||
                data.weather[0].main.includes("Sunny")
              ) {
                return "🌞";
              } else if (data.weather[0].main.includes("Cloud")) {
                return "☁️";
              } else if (data.weather[0].main.includes("Rain")) {
                return "🌧️";
              } else if (data.weather[0].main.includes("Thunderstorm")) {
                return "⛈️";
              } else if (data.weather[0].main.includes("Snow")) {
                return "❄️";
              } else if (
                data.weather[0].main.includes("Mist") ||
                data.weather[0].main.includes("Fog") ||
                data.weather[0].main.includes("Haze") ||
                data.weather[0].main.includes("Dust") ||
                data.weather[0].main.includes("Sand")
              ) {
                return "🌫️";
              } else if (
                data.weather[0].main.includes("Partly Cloudy") ||
                data.weather[0].main.includes("Scattered Clouds") ||
                data.weather[0].main.includes("Broken Clouds") ||
                data.weather[0].main.includes("Few Clouds")
              ) {
                return "🌤️";
              } else if (data.weather[0].main.includes("Drizzle")) {
                return "🌦️";
              }
            }

            document.querySelector(".mainInfo").innerHTML = `
                <div id="tempInfo" class="info">
              <div id="temperature" class="info">
                <h3>${data.main.temp.toFixed(2)}&deg;C</h3>
                <p>Temperature</p>
                
              </div>
              <p class="emoji">${getEmoji()}</p>
            </div>
            <div id="othersInfo" class="info">
              <div class="others">
                <h3>${data.main.humidity}%</h3>
                <p>Humidity</p>
              </div>
              <div class="others">
                <h3>${data.weather[0].main}</h3>
                <p>Sky</p>
              </div>
              <div class="others">
                <h3>${(data.wind.speed * 3.6).toFixed(2)} km/hr</h3>
                <p>Wind Speed</p>
              </div>
            </div>
                `;

            //         document.querySelector(".mainInfo").innerHTML = `
            //       <br>
            //       <p
            //   style="
            //     font-family: Arial, sans-serif;
            //     letter-spacing: 1px;
            //     word-spacing: 2px;
            //     width: 100%;
            //     text-align: left;
            //     font-size: 1.25rem;
            //     font-weight: 600;
            //   "
            // >
            //   Country: ${data.sys.country}
            // </p>
            //     <p
            //   style="
            //     font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
            //       sans-serif;
            //     font-size: 1.4rem;
            //     width: 100%;
            //     text-align: center;
            //   "
            // >
            //   Temperatures:
            // </p>
            // <p
            //   style="
            //     font-family: Arial, sans-serif;
            //     letter-spacing: 1px;
            //     word-spacing: 2px;
            //     width: 100%;
            //     text-align: left;
            //     font-size: 1.2rem;
            //   "
            // >
            //   Main: ${data.main.temp}&deg;C
            // </p>
            // <p
            //   style="
            //     font-family: Arial, sans-serif;
            //     letter-spacing: 1px;
            //     word-spacing: 2px;
            //     width: 100%;
            //     text-align: left;
            //     font-size: 1.2rem;
            //   "
            // >
            //   Max: ${data.main.temp_max}&deg;C
            // </p>
            // <p
            //   style="
            //     font-family: Arial, sans-serif;
            //     letter-spacing: 1px;
            //     word-spacing: 2px;
            //     width: 100%;
            //     text-align: left;
            //     font-size: 1.2rem;
            //   "
            // >
            //   Min: ${data.main.temp_min}&deg;C
            // </p>
            // <p
            //   style="
            //     font-family: Arial, sans-serif;
            //     letter-spacing: 1px;
            //     word-spacing: 2px;
            //     width: 100%;
            //     text-align: left;
            //     font-size: 1.2rem;
            //   "
            // >
            //   Feels Like: ${data.main.feels_like}&deg;C
            // </p>
            // <hr />
            // <p
            //   style="
            //     font-family: Arial, sans-serif;
            //     letter-spacing: 1px;
            //     word-spacing: 2px;
            //     width: 100%;
            //     text-align: left;
            //     font-size: 1.2rem;
            //   "
            // >
            //   Sky: ${data.weather[0].main}
            // </p>
            // <p
            //   style="
            //     font-family: Arial, sans-serif;
            //     letter-spacing: 1px;
            //     word-spacing: 2px;
            //     width: 100%;
            //     text-align: left;
            //     font-size: 1.2rem;
            //   "
            // >
            //   Humidity: ${data.main.humidity}&#37;
            // </p>
            // <p
            //   style="
            //     font-family: Arial, sans-serif;
            //     letter-spacing: 1px;
            //     word-spacing: 2px;
            //     width: 100%;
            //     text-align: left;
            //     font-size: 1.2rem;
            //   "
            // >
            //   Wind Speed: ${data.wind.speed}m/s (${(data.wind.speed * 3.6).toFixed(
            //           2
            //         )}km/h)
            // </p>

            //     `;

            console.log(data);
          })
          .catch((error) => {
            console.log("Error:", error);
          })
          .finally(() => {
            spinner.style.display = "none";
            mainDiv.classList.add("show");
            scrollToMainDiv();
          });
      }, 300);
    }
  };

  // Event listener for the navbar search box
  searchButton.addEventListener("click", (e) => handleSearch(e, "searchInput"));

  // Event listener for the mobile search box
  searchButtonMobile.addEventListener("click", (e) =>
    handleSearch(e, "searchInputMobile")
  );
});
