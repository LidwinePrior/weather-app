

export function background (desc) {

    let bodyClass;
    console.log(bodyClass)
    

    if(desc.includes("soleil") || desc.includes("dégagé")) {
        bodyClass = "sunny";
    } else if (desc.includes("nuageux") || desc.includes("couvert")) {
        bodyClass = "cloudy";
    } else if (desc.includes("pluie")) {
        bodyClass = "rainy";
    } else {
        //couleur par défaut
        bodyClass = "default";
    }
    //supprimer toiutes les classes actuelles du body
    document.body.className = "";
    //ajouter la classe appropriée au body pour changer sa couleur 
    document.body.classList.add(bodyClass);

}