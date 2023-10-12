
//import de la fonction onload depuis le localStorage.js
import { onLoad } from "./localStorage.js";
//import de la fonction card depuis createCard.js
import { card } from "./createCard.js";






//récupérer l'élément d'entrée de texte avec l'ID 'city
let inputTxt = document.getElementById('city')
//récupérer le bouton avce la calss '.send'
const sendBtn = document.querySelector(".send");

//appeller la focntion onload() pour afficher la dernière recherche lors du chargement de la page
onLoad();

//fonction qui effectue la rechecrge de la ville lorsque l'utilisateur appuie sur enter ou clique sur le bouton
function searchCity () {
    let city = inputTxt.value;

    //enregistrer la dernière recherche dans le localStorage
    localStorage.setItem("city", city);
    //appeler la fonction card ('city) pour créer et afficher la crate météo
    card(city);
}

//ecouter l'événement 'keyup' sur l'élément d'entrée de texte
inputTxt.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') {
        //empecher chargement de la page par défaut
        e.preventDefault();
        //appeler fonction de recherche
        searchCity()
    }
})

//ecouter l'événement 'click' sur le bouton
sendBtn.addEventListener("click", () => {
//appeler la focntion de recherche
searchCity();
    
});