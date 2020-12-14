var ref = null;

function fill(){
    //Fonction de récupération de la destination choisie
    fetch("../JSON/doc.json").then(function(response) {
        if (response.ok){
            response.json().then(function(parsedJson){
                json_data = parsedJson;
                destinations_json = json_data.Destinations;
                createTabDestinations()
                let id = window.location.href.slice(-2);    //On récupère l'id de la destination
                if (id[0] == "="){
                    id = id[1];
                }
                for (var k of tab_destinations){     //On récupère l'objet Destination associé
                    if (k.num_id == id){
                        ref = k
                    }
                };
                adaptBanner();
            })
        }
    })
    document.getElementById('p_destination').innerHTML = "Destination : " + localStorage.getItem('Reservation').split(',')[0].slice(1).slice(1,localStorage.getItem('Reservation').split(',')[0].slice(1).length-1)
    document.getElementById('p_nom').innerHTML = "Nom : " + localStorage.getItem('Reservation').split(',')[1].slice(1,localStorage.getItem('Reservation').split(',')[1].length-1);
    document.getElementById('p_prenom').innerHTML = "Prenom : " + localStorage.getItem('Reservation').split(',')[2].slice(1,localStorage.getItem('Reservation').split(',')[2].length-1);
    document.getElementById('p_mail').innerHTML = "Adresse mail : " + localStorage.getItem('Reservation').split(',')[3].slice(1,localStorage.getItem('Reservation').split(',')[3].length-1);
    document.getElementById('p_depart').innerHTML = "Date de départ : " + localStorage.getItem('Reservation').split(',')[4].slice(1,localStorage.getItem('Reservation').split(',')[4].length-1);
    document.getElementById('p_retour').innerHTML = "Date de retour : " + localStorage.getItem('Reservation').split(',')[5].slice(1,localStorage.getItem('Reservation').split(',')[5].length-1);
    document.getElementById('p_adultes').innerHTML = "Nombre d'adultes : " + localStorage.getItem('Reservation').split(',')[6].slice(0,localStorage.getItem('Reservation').split(',')[6].length);
    document.getElementById('p_enfants').innerHTML = "Nombre d'enfants : " + localStorage.getItem('Reservation').split(',')[7].slice(0,localStorage.getItem('Reservation').split(',')[7].length-1);
    document.getElementById('p_numero').innerHTML = "Numéro de réservation : " + JSON.stringify(Math.floor(Math.random() * 899999 + 100000));
}

var tab_destinations = [];

function createTabDestinations(){ 
    //Cette fonction remplit la liste des destinations disponibles
    for (var k=0;k<22;k++){
        let destination = destinations_json[k]
        tab_destinations.push(new Destination(destination.lieu, destination.id, destination.prix, destination.animaux, destination.continent, destination.image1, destination.image2, destination.dates_nn_dispo, destination.banner_ref, destination.banner_param, destination.zoom, destination.temp))   
    }
}

function adaptBanner(){ 
    //On change la bannière de haut de page
    document.getElementById('flottant').style.backgroundImage = "url('../Images/Villes/"+ref.bgi+"')";
    document.getElementById('flottant').style.backgroundPosition = ref.bgp;
    document.getElementById('flottant').style.backgroundSize = ref.zoom;
}

function validationReservation(){
    //La partie panier étant optionelle, dans les faits rien ne se passe à la validation de la réservation
    //Il faudrait techniquement vérifier la connexion de l'utilisateur, s'il est connecté il peut réserver plusieurs destinations, s'il ne l'est pas une nouvelle réservation supprime la précédente en mémoire
    //Une utilisation de JSON serait alors bien meilleure étant donnée que les données de réservation serait conservées
    localStorage.clear()
    window.location.href = "../HTML/Main.html";
}