let cText = document.querySelector(".card-text");
let cTitle = document.querySelector(".card-title");
let ul = document.querySelector(".list-group");
let input = document.querySelector(".form-control");
let btn = document.querySelector(".btn");
let temp = document.querySelector("#temp");
let feels = document.querySelector("#feels_like");
let maxTemp = document.querySelector("#temp_max");
let minTemp = document.querySelector("#temp_min");
let pressure = document.querySelector("#pressure");
let humidity = document.querySelector("#humidity");

// let config = {
//   headers: {
//     "x-rapidapi-host": "open-weather13.p.rapidapi.com",
//     "x-rapidapi-key": "b9b9516e1cmshb9fdc2c966fa2d3p1bd974jsna482bc386253",
//   },
// };
let city = "vizianagaram";
cTitle.innerText = `Today's Weather : ${city}`;

async function getData(city = "vizianagaram") {
  cTitle.innerText = `Today's Weather : ${city}`;
  let key = "0be2a77c600692af174b77575414362d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  let data;
  try {
    let res = await fetch(url);
    data = await res.json();
  } catch (e) {
    console.log("Error -", e);
  }

  cText.innerText = `${data.weather[0].main}
  ${data.weather[0].description}`;
  console.log(data.weather[0].description);
  temp.innerText = `Temperature : ${(data.main.temp - 273.15).toFixed(
    2
  )} Celsius`;
  feels.innerText = `Feels like :  ${(data.main.feels_like - 273.15).toFixed(
    2
  )} Celsius`;
  maxTemp.innerText = `Maximum Temperature : ${(
    data.main.temp_max - 273.15
  ).toFixed(2)} Celsius`;
  minTemp.innerText = `Minimum Temperature :  ${(
    data.main.temp_min - 273.15
  ).toFixed(2)} Celsius`;
  pressure.innerText = `Pressure : ${data.main.pressure}mBar`;
  humidity.innerText = `Humidity : ${data.main.humidity}%`;
  console.log(data);
  return data;
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  getData(input.value);
});

getData(city);
