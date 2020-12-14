class Destination{
    constructor(nom,num_id,prix,animaux,continent,image1,image2,dates_nndispo,bgi,bgp,temp){
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
        this.temp=temp;
    }
}

var ref = null;

function fill(){
    //Récupération de la destination choisie
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
                changeTemplateDestination();
            })
        }
    })
}

var tab_destinations = [];

function createTabDestinations(){ 
    //Cette fonction remplit la liste des destinations disponibles
    for (var k=0;k<22;k++){
        let destination = destinations_json[k]
        tab_destinations.push(new Destination(destination.lieu, destination.id, destination.prix, destination.animaux, destination.continent, destination.image1, destination.image2, destination.dates_nn_dispo, destination.banner_ref, destination.banner_param, destination.temp))   
    }
}

function adaptBanner(){ 
    //On change la bannière de haut de page
    document.getElementById('flottant').style.backgroundImage = "url('../Images/Villes/"+ref.bgi+"')";
    document.getElementById('flottant').style.backgroundPosition = ref.bgp;
}

function changeTemplateDestination(){
    //Fonction d'affichage du nom de la destination et des dates indisponibles
    var template_destination = document.querySelector(".template_destination"); //On récupère le template pour y apporter les modifications
    let clone = template_destination.content;
    newContent = clone.textContent 
        .replace(/{{nom}}/g, ref.nom);  //On remplate le titre (entre h1)
    clone.firstElementChild.innerHTML = newContent;
    document.getElementById("destination").appendChild(clone);

    document.getElementById('div_dates').innerHTML = "Cette destination est indisponible du " + ref.dates_nndispo[0] + " au " + ref.dates_nndispo[1]
}

var duree_mois = [31,28,31,30,31,30,31,31,30,31,30,31];

function modif(){
    //Fonction de calcul du prix
    nom = document.getElementById('nom').value;
    prenom = document.getElementById('prenom').value;
    mail_reservation = document.getElementById('mail_reservation').value;
    depart = document.getElementById('depart').value;
    jour_depart = parseInt(depart.split('-')[2]);
    mois_depart = parseInt(depart.split('-')[1]);
    retour = document.getElementById('retour').value;
    jour_retour = parseInt(retour.split('-')[2]);
    mois_retour = parseInt(retour.split('-')[1]);
    nb_adultes = parseInt(document.getElementById('nb_adultes').value);
    nb_enfants = parseInt(document.getElementById('nb_enfants').value);
    prix_unitaire = 0;
    if (mois_retour==mois_depart){
        prix_unitaire = ref.prix * (jour_retour-jour_depart);
    }
    else{
        prix_unitaire = (jour_retour + duree_mois[mois_depart-1] - jour_depart)*ref.prix;
        for (var k=mois_depart;k<mois_retour-1;k++){
            prix_unitaire+=ref.prix*duree_mois[k];
        }
    }
    if (isNaN(parseFloat(nb_enfants))){
        nb_enfants = 0;
    }
    prix_calcule = prix_unitaire *(nb_adultes + 0.4*nb_enfants);
    if (!isNaN(parseFloat(prix_calcule))){
        prix.value = prix_calcule;
    }
}


function validation(){
    //Fonction de test de validité du formulaire
    modif()
    var texte_erreur = document.getElementById('erreur');   //Message d'erreur
    l = mail_reservation.length
    if (nom == "" || !isNaN(parseFloat(nom))){
        texte_erreur.innerHTML = "Le nom fourni est invalide."
    }
    else{
        if (prenom == "" || !isNaN(parseFloat(prenom))){
            texte_erreur.innerHTML = "Le prenom fourni est invalide."
        }
        else{
            if (!(['com','org','.fr'].includes(mail_reservation.substr(mail_reservation.length-3,mail_reservation.length))) || !(mail_reservation.includes('@'))){
                texte_erreur.innerHTML = "L'adresse mail fournie est invalide."
            }
            else{
                if (depart == ""){
                    texte_erreur.innerHTML = "Le date de départ fournie est invalide."
                }
                else{
                    if (retour == ""){
                        texte_erreur.innerHTML = "Le date de retour fournie est invalide."
                    }
                    else{
                        if (depart >= retour){
                            texte_erreur.innerHTML = "La date de départ doit être antérieur à la date de retour."
                        }
                        else{
                            if (depart >= ref.dates_nndispo[0] && depart <= ref.dates_nndispo[1]){
                                texte_erreur.innerHTML = "La date de départ fournie n'est pas disponible."
                            }
                            else{
                                if (nb_adultes == "" || parseInt(nb_adultes)<1){
                                    texte_erreur.innerHTML = "Le nombre d'adultes fourni est invalide."
                                }
                                else{
                                    if (nb_enfants != "" && parseInt(nb_enfants)<1){
                                        texte_erreur.innerHTML = "Le nombre d'enfants fourni est invalide."
                                    }
                                    else{
                                        //Si toutes les entrées sont valide, on stocke les élements dans le local storage
                                        texte_erreur.innerHTML = ""
                                        let reservation = JSON.stringify([ref.nom,nom,prenom,mail_reservation,depart,retour,nb_adultes,nb_enfants])
                                        localStorage.setItem("Reservation",reservation)
                                        window.location.href = "../HTML/Recapitulatif.html?id=" + ref.num_id
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

class Réservation{
    constructor(nom,prenom,mail,depart,retour,adultes,enfants){
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.depart = depart;
        this.retour = retour;
        this.adultes = adultes;
        this.enfants = enfants;
    }
}