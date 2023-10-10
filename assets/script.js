const apiKey = "8ea7f0a4d42086c0871ea1344169014e";
const weather = document.getElementById('weather');
let inputTxt = document.getElementById('city')
const sendBtn = document.querySelector(".send");

sendBtn.addEventListener("click", () => {
    let city = inputTxt.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((data) => {

        let weatherOfDay = document.createElement("div")
        weatherOfDay.classList.add('weatherOfDay');


        const cityName = document.createElement("p");
        cityName.classList.add('city');
        let cName = data.name;
        cityName.textContent = cName;

        const temperature = document.createElement("p");
        temperature.classList.add('temp');
        let temp = data.main['temp'];
        temperature.textContent = `${temp}°`;

        const minimumT = document.createElement("p");
        minimumT.classList.add('min');
        let minTemp = data.main['temp_min'];
        minimumT.textContent= `min: ${minTemp}°`;

        const maximumT = document.createElement("p");
        maximumT.classList.add('max');
        let maxTemp = data.main['temp_max'];
        maximumT.textContent = `max: ${maxTemp}°`;

        const description = document.createElement("p");
        description.classList.add('description');
        let desc = data.weather[0].description;
        description.textContent = desc;

        const icon = document.createElement("img");
        let imgIcon = data.weather[0].icon;

        icon.setAttribute('src', "https://openweathermap.org/img/w/" +imgIcon + ".png");

     
        weatherOfDay.appendChild(icon);
        weatherOfDay.appendChild(cityName);
        weatherOfDay.appendChild(temperature);
        weatherOfDay.appendChild(description);
        weatherOfDay.appendChild(minimumT);
        weatherOfDay.appendChild(maximumT);


        weather.appendChild(weatherOfDay);

    })
    .catch((error) => {
        console.error("error", error);
    });
});






const weatherFiveDays = document.getElementById('weatherFIveDays');

sendBtn.addEventListener("click", () => {
    let city = inputTxt.value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        for (i = 7 ; i<40; i+=8) {

            const temperature = document.createElement("p");
            temperature.classList.add('temperature');
            let temp = data.list[i].main.temp;
            temperature.textContent = `${temp}°`;
    
            const day = document.createElement("p");
            day.classList.add('day');
            let time = data.list[i].dt_txt;
            day.textContent = time;
    
            const icon = document.createElement("img");
            let imgIcon = data.list[i].weather[0].icon;
            icon.setAttribute('src', "https://openweathermap.org/img/w/" +imgIcon + ".png");


            const daily = document.createElement('div');
            daily.classList.add('daily');

            daily.appendChild(day);
            daily.appendChild(temperature);
            daily.appendChild(icon);


            weatherFiveDays.appendChild(daily);
        }
    

    })
    .catch((error) => {
        console.error("error", error);
    });
});