function openMap(){
    //Fonction permettant d'ouvrir la carte des destinations à l'appui du bouton associé
    window.location.href = "../HTML/Carte.html"
}

function reinitDate(){
    //Cette fonction réinitialise le filtre de date
    document.getElementById('filtre_date').value = ""
    return false
}

const initial = document.getElementById('destinations').innerHTML;

let template = document.querySelector(".template_destination");

tab_temp = [];

function filtrage(){
    //Cette fonction trie les destinations à afficher en fonction des valeurs des filtres
    var tab_filtré = [];
    div1 = document.getElementById('destinations');

    div1.innerHTML = initial;

    filtre_continent = document.forms["form_filtres"]["continent"].value;
    filtre_animal = parseInt(document.forms["form_filtres"]["animal"].value);
    filtre_prix_min = prix_min.value;
    filtre_prix_max = prix_max.value;

    for (var k of tab_destinations){
        //Création d'une liste des destinations correpondant aux filtres
        if (parseInt(k.prix)>=parseInt(filtre_prix_min) && parseInt(k.prix)<=parseInt(filtre_prix_max) && (k.continent == filtre_continent || filtre_continent == 'none') && (parseInt(k.animaux) == filtre_animal || filtre_animal == 2) && (filtre_date.value<k.dates_nndispo[0] || filtre_date.value>k.dates_nndispo[1] || filtre_date.value == "")){
            tab_filtré.push(k)
        }
    }
    
    for (var k of tab_filtré){
        //Affichage sur la page des destinations filtrées
        let clone = document.importNode(template.content, true);
    
        var new_content = clone.firstElementChild.innerHTML
            .replace(/{{date1}}/g, k.dates_nndispo[0])
            .replace(/{{date2}}/g, k.dates_nndispo[1])
            .replace(/{{num_id}}/g, k.num_id)
            .replace(/{{nom}}/g, k.nom)
            .replace(/{{temp}}/g,tab_temp[tab_destinations.indexOf(k)])
            .replace(/{{prix}}/g, k.prix);
        
        clone.firstElementChild.innerHTML = new_content;
    
        document.getElementById("destinations").appendChild(clone);

        document.getElementsByClassName('im1')[tab_filtré.indexOf(k)].src = "../Images/Villes/" + k.image1
        document.getElementsByClassName('im2')[tab_filtré.indexOf(k)].src = "../Images/Villes/" + k.image2
    }

    var pr = document.getElementsByClassName("prix");
    
    for (var k=0;k<pr.length;k++){
        //Détails sur le prix (symbole €, placement) et nombre des résultats
        if (pr[k].innerHTML.length>2){
            document.getElementsByClassName("prix")[k].style.marginLeft = "35%";
        }
        pr[k].innerHTML = pr[k].innerHTML + "€";
    }
    document.getElementById('resultats').innerHTML = JSON.stringify(document.getElementsByClassName('im2').length) + " résultats en accord avec vos critères."
}

class Destination{
    constructor(nom,num_id,prix,animaux,continent,image1,image2,dates_nndispo,bgi,bgp,zoom,temp){
        this.nom = nom;
        this.num_id = num_id;
        this.prix = prix;
        this.animaux = animaux;
        this.continent = continent ;
        this.image1 = image1;
        this.image2 = image2;
        this.dates_nndispo = dates_nndispo;
        this.bgi = bgi;
        this.bgp = bgp;
        this.zoom = zoom;
        this.temp=temp;
    }
}


var our_json = 0;

function request(){
    //Cette fonction appelle le JSON comportant les données nécessaires
    fetch("../JSON/doc.json").then(function(response) {
        if (response.ok){
            response.json().then(function(parsedJson){
                our_json = parsedJson.Destinations;
                createTabDestinations();
                temperature();
                filtrage();
            })
        }
    })
}

var tab_destinations = [];

function createTabDestinations(){ 
    //Cette fonction remplit la liste des destinations disponibles
    for (var k=0;k<22;k++){
        let destination = our_json[k]
        tab_destinations.push(new Destination(destination.lieu, destination.id, destination.prix, destination.animaux, destination.continent, destination.image1, destination.image2, destination.dates_nn_dispo, destination.banner_ref, destination.banner_param, destination.zoom, destination.temp))   
    }
}

var tab_temp = [];

function temperature(){ 
    //Cette fonction crée la liste des températures des destinations
    for (var k of tab_destinations){
        ville = k.nom;
        if (ville == "Oulan Bator"){
            ville = 'Ulaanbaatar';
        }
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=db8849f5789982c4ab73821aa92d2c61&units=metric').then(function(response) {
            if (response.ok){
                response.json().then(function(parsedJson) {
                    document.getElementById(k.num_id).getElementsByClassName('temp')[0].innerHTML = JSON.stringify(parsedJson.main.temp) + "°C"
                    tab_temp.push(JSON.stringify(parsedJson.main.temp) + "°C");
                    if (ville=="Dubai"){
                        filtrage();
                    }
                })
            }
        })
    }
}