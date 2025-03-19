document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search");
  const searchButtonMobile = document.getElementById("searchMobile");

  const scrollToMainDiv = () => {
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = (e, inputId) => {
    e.preventDefault();
    const city = document.getElementById(inputId);
    const apiKey = "152af43562b1cab90f909271334ffbdd";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
    let cardTitle = document.getElementById("title");
    const spinner = document.getElementById("spinner");
    const mainDiv = document.getElementById("mainDiv");

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
            document.querySelector(".mainInfo").innerHTML = `
          <br>
          <p
      style="
        font-family: Arial, sans-serif;
        letter-spacing: 1px;
        word-spacing: 2px;
        width: 100%;
        text-align: left;
        font-size: 1.25rem;
        font-weight: 600;
      "
    >
      Country: ${data.sys.country}
    </p>
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
