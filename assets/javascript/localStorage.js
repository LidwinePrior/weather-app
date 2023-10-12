//importer la fonction card depuis createCard.js
import { card } from "./createCard.js";




//fonction onLoad qui affiche sur la page la dernière recherche quand la page est reload
export function onLoad () {
    window.addEventListener('load',  () => {
        const cityName = localStorage.getItem("city");
     
        if (city) {
            //appeler la focntion card(cityName) pour affciher la carte météo de la dernière recherche
           card(cityName);
        };
    });
};