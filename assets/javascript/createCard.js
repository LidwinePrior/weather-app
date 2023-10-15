import { background } from "./background.js";  


//focntion card(city) qui crée et affiche les cartes météo en utilisant l'API
export function card (city) {

    const apiKey = "8ea7f0a4d42086c0871ea1344169014e";
    const imgKey = "qZ4WLOr42wCss-VRcAc-3qJN18IFZUNeGdKTPXS5m-8";
    
    //récupérer l'élément avec son ID
    const weather = document.getElementById('weatherMore');
    const weatherContainer = document.createElement('div');
    weatherContainer.classList.add('weatherContainer');


    //effectuer une requête à l4API OpenWeatherMap pour obtenir les données météo actuelles
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((data) => {


        //créer et peupler les éléments html poour afficher les données météo
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
        console.log(desc);

        background(desc);
        console.log(background);   //ne fonctionne pas pour le changement de couleur en fonction de la description de la météo

        const icon = document.createElement("img");
        let imgIcon = data.weather[0].icon;

        icon.setAttribute('src', "https://openweathermap.org/img/w/" +imgIcon + ".png");

  

        //effectuer une requête à l4API Unsplash pour obtenir une image liée à la ville 
        fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${city}&client_id=${imgKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

                let myImg = data.results[0].urls.small;
                weatherOfDay.style.backgroundImage= `url(${myImg})`;


        });


        //ajouter les éléments à la page
        weatherOfDay.appendChild(cityName);
        weatherOfDay.appendChild(icon);
        weatherOfDay.appendChild(temperature);
        weatherOfDay.appendChild(description);
        weatherOfDay.appendChild(minimumT);
        weatherOfDay.appendChild(maximumT);


        weatherContainer.appendChild(weatherOfDay);

    })

    //gérer les erreurs
    .catch((error) => {
        console.error("error", error);
    });


    //effectuer une requête à l'API OpenWeatherMap pour obtenir les prévisions météo
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((data) => {


        //créer et afficher les prévisions pour 4 jours
        let weatherFIveDays = document.createElement('div');
        weatherFIveDays.classList.add('weatherFIveDays');
        //avce l'app on a données toutes les 3h, on a la météo à 0h avce le premier fetch. du coup on commence pas à i=0 mais a i=8 et on ajoute à chaque fois 8 pour être le jour d'après
        for (let i = 8 ; i<40; i+=8) {

            const temperature = document.createElement("p");
            temperature.classList.add('temperature');
            let temp = data.list[i].main.temp;
            temperature.textContent = `${temp}°`;

            const day = document.createElement("p");
            day.classList.add('day');
            let time = data.list[i].dt_txt;
            let options = {weekday: "long"};
            let dayWeek = new Intl.DateTimeFormat("fr-FR", options).format(new Date(time));
            day.textContent = dayWeek;

            const icon = document.createElement("img");
            let imgIcon = data.list[i].weather[0].icon;
            icon.setAttribute('src', "https://openweathermap.org/img/w/" +imgIcon + ".png");


            const daily = document.createElement('div');
            daily.classList.add('daily');

            daily.appendChild(day);
            daily.appendChild(temperature);
            daily.appendChild(icon);


            weatherFIveDays.appendChild(daily);
            weatherContainer.appendChild(weatherFIveDays);

            weather.appendChild(weatherContainer);
        }


    })

    //gérer les erreurs
    .catch((error) => {
        console.error("error", error);
    });

}
   