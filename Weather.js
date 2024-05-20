const apiKey = "028909348dd200f102ba33fecba69c40";

let form = document.getElementById("weatherForm");

let input = document.getElementById("inputField");

let outputBox = document.getElementById("outputBox")

let cityName = document.getElementById("cityName");

let temp = document.getElementById("temperature");

form.addEventListener("click", (e) => {

    e.preventDefault();

    if (e.target.id == "submit") {

        setTimeout(() => {
            outputBox.style.visibility = "visible"
        }, 500)

        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(data => {

                if (data.cod === "404" || data.message === "city not found") {
                    cityName.innerHTML = "City was not found";
                    temp.innerHTML = "";
                }

                else {
                    cityName.innerHTML = data.name;
                    const temperatureInCelsius = data.main.temp - 273.15;
                    temp.innerHTML = temperatureInCelsius.toFixed(2) + " °C";
                }

            })
            .catch(error => {

                console.log("There was a problem with your fetch operation:", error);
                cityName.innerHTML = "City was not found";
                temp.innerHTML = "";

            });
    }
});
