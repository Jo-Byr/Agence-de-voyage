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
function createTabDestinations(){ 
    //Cette fonction remplit la liste des destinations disponibles
    for (var k=0;k<22;k++){
        let destination = json_destinations[k]
        tab_destinations.push(new Destination(destination.lieu, destination.id, destination.prix, destination.animaux, destination.continent, destination.image1, destination.image2, destination.dates_nn_dispo, destination.banner_ref, destination.banner_param, destination.zoom, destination.temp))   
    }
    SVGMap();
}

function createTabTemp(){ 
    //Cette fonction crée une liste des températures des différentes destinations
    for (var k of tab_destinations){
        ville = k.nom;
        if (ville == "Oulan Bator"){
            ville = 'Ulaanbaatar';
        }
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=db8849f5789982c4ab73821aa92d2c61&units=metric').then(function(response) {
            if (response.ok){
                response.json().then(function(parsedJson) {
                    tab_temp.push(JSON.stringify(parsedJson.main.temp) + "°C");
                })
            }
        })
    }
}

var tab_temp = [];
var tab_destinations = []

function loadJson(){
    //Cette fonction appelle le JSON comportant toutes les données nécessaires
    fetch("../JSON/doc.json").then(function(response) {
        if (response.ok){
            response.json().then(function(parsedJson){
                json_data = parsedJson;
                json_destinations = parsedJson.Destinations;
                createTabDestinations();
                createTabTemp();
            })
        }
    })
}

function SVGMap(){
    //Cette fonction ajoute les appels de fonctions de showDestination et hide aux destinations
    //Ajouter ces event listener avec une boucle ne fonctionnait pas, nous avons du nous rabattre sur du code "en dur"
    svg = document.getElementById('svg');
    content = svg.contentDocument;
    content.getElementById('FR').addEventListener('mouseenter',() => showDestination(0));
    content.getElementById('FR').addEventListener('mouseleave',() => hide());
    content.getElementById('FR').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=1")

    content.getElementById('TH').addEventListener('mouseenter',() => showDestination(1));
    content.getElementById('TH').addEventListener('mouseleave',() => hide());
    content.getElementById('TH').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=2")
    
    content.getElementById('DZ').addEventListener('mouseenter',() => showDestination(2));
    content.getElementById('DZ').addEventListener('mouseleave',() => hide());
    content.getElementById('DZ').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=3")

    content.getElementById('NZ').addEventListener('mouseenter',() => showDestination(3));
    content.getElementById('NZ').addEventListener('mouseleave',() => hide());
    content.getElementById('NZ').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=4")

    content.getElementById('US').addEventListener('mouseenter',() => showDestination(4));
    content.getElementById('US').addEventListener('mouseleave',() => hide());
    content.getElementById('US').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=5")

    content.getElementById('DE').addEventListener('mouseenter',() => showDestination(5));
    content.getElementById('DE').addEventListener('mouseleave',() => hide());
    content.getElementById('DE').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=6")

    content.getElementById('ZA').addEventListener('mouseenter',() => showDestination(6));
    content.getElementById('ZA').addEventListener('mouseleave',() => hide());
    content.getElementById('ZA').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=7")

    content.getElementById('SG').addEventListener('mouseenter',() => showDestination(7));
    content.getElementById('SG').addEventListener('mouseleave',() => hide());
    content.getElementById('SG').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=8")

    content.getElementById('BR').addEventListener('mouseenter',() => showDestination(8));
    content.getElementById('BR').addEventListener('mouseleave',() => hide());
    content.getElementById('BR').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=9")

    content.getElementById('ES').addEventListener('mouseenter',() => showDestination(9));
    content.getElementById('ES').addEventListener('mouseleave',() => hide());
    content.getElementById('ES').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=10")

    content.getElementById('TR').addEventListener('mouseenter',() => showDestination(10));
    content.getElementById('TR').addEventListener('mouseleave',() => hide());
    content.getElementById('TR').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=11")

    content.getElementById('EG').addEventListener('mouseenter',() => showDestination(11));
    content.getElementById('EG').addEventListener('mouseleave',() => hide());
    content.getElementById('EG').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=12")

    content.getElementById('AU').addEventListener('mouseenter',() => showDestination(12));
    content.getElementById('AU').addEventListener('mouseleave',() => hide());
    content.getElementById('AU').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=13")

    content.getElementById('JP').addEventListener('mouseenter',() => showDestination(13));
    content.getElementById('JP').addEventListener('mouseleave',() => hide());
    content.getElementById('JP').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=14")

    content.getElementById('IT').addEventListener('mouseenter',() => showDestination(14));
    content.getElementById('IT').addEventListener('mouseleave',() => hide());
    content.getElementById('IT').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=15")

    content.getElementById('MX').addEventListener('mouseenter',() => showDestination(15));
    content.getElementById('MX').addEventListener('mouseleave',() => hide());
    content.getElementById('MX').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=16")

    content.getElementById('RU').addEventListener('mouseenter',() => showDestination(16));
    content.getElementById('RU').addEventListener('mouseleave',() => hide());
    content.getElementById('RU').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=17")

    content.getElementById('GB').addEventListener('mouseenter',() => showDestination(17));
    content.getElementById('GB').addEventListener('mouseleave',() => hide());
    content.getElementById('GB').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=18")

    content.getElementById('MN').addEventListener('mouseenter',() => showDestination(18));
    content.getElementById('MN').addEventListener('mouseleave',() => hide());
    content.getElementById('MN').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=19")

    content.getElementById('TZ').addEventListener('mouseenter',() => showDestination(19));
    content.getElementById('TZ').addEventListener('mouseleave',() => hide());
    content.getElementById('TZ').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=20")

    content.getElementById('GL').addEventListener('mouseenter',() => showDestination(20));
    content.getElementById('GL').addEventListener('mouseleave',() => hide());
    content.getElementById('GL').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=21")

    content.getElementById('AE').addEventListener('mouseenter',() => showDestination(21));
    content.getElementById('AE').addEventListener('mouseleave',() => hide());
    content.getElementById('AE').addEventListener('click', () => window.location.href = "../HTML/Reservation.html?id=22")
}

function showDestination(k){
    //Cette fonction affiche un cadre présentant la destination survolée
    document.getElementById('destination').innerHTML = '<p id="div_destination"></p><p id="div_temp"></p>';
    document.getElementById('div_destination').innerHTML = tab_destinations[k].nom;
    document.getElementById('destination').style.opacity = '1';
    document.getElementById('div_temp').innerHTML = tab_temp[k]
    image = new Image();
    image.src = "../Images/Villes/" + tab_destinations[k].image2;
    image.style.height = "10em";
    image.style.marginLeft = ".2em";
    image.style.marginRight = ".2em";
    document.getElementById('destination').appendChild(image);
    if (k==0){
        document.getElementById('destination').style.marginTop = "17%";
        document.getElementById('destination').style.marginLeft = "49.7%";
    }
    if (k==1){
        document.getElementById('destination').style.marginTop = "23.3%";
        document.getElementById('destination').style.marginLeft = "67%";
    }
    if (k==2){
        document.getElementById('destination').style.marginTop = "20.5%";
        document.getElementById('destination').style.marginLeft = "50%";
    }
    if (k==3){
        document.getElementById('destination').style.marginTop = "25%";
        document.getElementById('destination').style.marginLeft = "50.5%";
    }
    if (k==4){
        document.getElementById('destination').style.marginTop = "19%";
        document.getElementById('destination').style.marginLeft = "38%";
    }
    if (k==5){
        document.getElementById('destination').style.marginTop = "16%";
        document.getElementById('destination').style.marginLeft = "50.3%";
    }
    if (k==6){
        document.getElementById('destination').style.marginTop = "24%";
        document.getElementById('destination').style.marginLeft = "54%";
    }
    if (k==7){
        document.getElementById('destination').style.marginTop = "25%";
        document.getElementById('destination').style.marginLeft = "43%";
    }
    if (k==8){
        document.getElementById('destination').style.marginTop = "25%";
        document.getElementById('destination').style.marginLeft = "42.5%";
    }
    if (k==9){
        document.getElementById('destination').style.marginTop = "18%";
        document.getElementById('destination').style.marginLeft = "48.5%";
    }
    if (k==10){
        document.getElementById('destination').style.marginTop = "18%";
        document.getElementById('destination').style.marginLeft = "55.6%";
    }
    if (k==11){
        document.getElementById('destination').style.marginTop = "20.5%";
        document.getElementById('destination').style.marginLeft = "54.5%";
    }
    if (k==12){
        document.getElementById('destination').style.marginTop = "23%";
        document.getElementById('destination').style.marginLeft = "43%";
    }
    if (k==13){
        document.getElementById('destination').style.marginTop = "18%";
        document.getElementById('destination').style.marginLeft = "46.5%";
    }
    if (k==14){
        document.getElementById('destination').style.marginTop = "17.5%";
        document.getElementById('destination').style.marginLeft = "51.5%";
    }
    if (k==15){
        document.getElementById('destination').style.marginTop = "21%";
        document.getElementById('destination').style.marginLeft = "33%";
    }
    if (k==16){
        document.getElementById('destination').style.marginTop = "14%";
        document.getElementById('destination').style.marginLeft = "28%";
    }
    if (k==17){
        document.getElementById('destination').style.marginTop = "15%";
        document.getElementById('destination').style.marginLeft = "48.3%";
    }
    if (k==18){
        document.getElementById('destination').style.marginTop = "16%";
        document.getElementById('destination').style.marginLeft = "38%";
    }
    if (k==19){
        document.getElementById('destination').style.marginTop = "19%";
        document.getElementById('destination').style.marginLeft = "29.5%";
    }
    if (k==20){
        document.getElementById('destination').style.marginTop = "12%";
        document.getElementById('destination').style.marginLeft = "46.5%";
    }
    if (k==21){
        document.getElementById('destination').style.marginTop = "21%";
        document.getElementById('destination').style.marginLeft = "33%";
    }
}

function hide(){
    //Cette fonction supprime le cadre de destination créé par la fonction showDestination à la fin du survol d'une destination
    document.getElementById('destination').innerHTML = '';
}