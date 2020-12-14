//Chargement du JSON
fetch("../JSON/doc.json").then(function(response) {
    if (response.ok){
        response.json().then(function(parsedJson){
            json_data = parsedJson;
        })
    }
})


window.onscroll = function() {checkScroll()};
function checkScroll() {
    //Fonction permettant l'affichage ou non du bouton de montée en haut de page
    const top_btn = document.getElementById('scroll_top_button')
    if (document.body.scrollTop >600 || document.documentElement.scrollTop>600) {
        top_btn.style.display = "block";
    } else {
        top_btn.style.display = "none";
    }
}

function goTop(){
    //Fonction appelée lorsque le bouton de remontée en haut de page est déclenché
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}


//Local storage de la variable de connexion
if (localStorage.getItem('connexion'==null)){
    localStorage.setItem("connexion",'0');
}
else{
    if (localStorage.getItem('connexion')=='1'){ 
        //Si l'utilisateur est connecté, on change le contenu et le CSS du bloc de connexion en haut a droite de la page.
        var connexion_init_html = document.getElementById('connexion').innerHTML;
        var connexion_init_css = document.getElementById('connexion').style;
        var div_connexion = document.getElementById('connexion');
        div_connexion.style.padding = "5px";
        div_connexion.style.paddingTop = "15px";
        div_connexion.innerHTML = "";
        const btn = document.createElement('button');
        div_connexion.appendChild(btn);
        btn.id = "bouton_deconnexion";
        btn.innerHTML = "Déconnexion";
        document.getElementById('bouton_deconnexion').onclick = function(){
            localStorage.setItem("connexion",'0')
            div_connexion.innerHTML = connexion_init_html;
            div_connexion.style = "none";
            div_connexion.style = connexion_init_css;
        }
    }
}

function connexion(){
    //Fonction de connexion
    json_connexion = json_data.Utilisateurs;
    var connexion_init = document.getElementById('connexion').innerHTML;
    var liste_utilisateurs = [];
    var liste_mdp = [];
    var mail_value = document.getElementById("mail_connexion").value;
    var mdp_value = document.getElementById("pass").value;
    for (k=0;k<json_connexion.length;k++){
        liste_utilisateurs.push(json_connexion[k].email);
        liste_mdp.push(json_connexion[k].mp);
    }
    if (liste_utilisateurs.includes(mail_value)){
        if (liste_mdp[liste_utilisateurs.indexOf(mail_value)]==mdp_value){
            document.getElementById("mail_connexion").style.borderColor="black"
            document.getElementById("pass").style.borderColor="black"
            document.getElementById("mail_connexion").style.borderWidth= "1px"
            document.getElementById("pass").style.borderWidth= "1px"
            localStorage.setItem("connexion",'1');
            var div_connexion = document.getElementById('connexion');
            div_connexion.innerHTML = "";
            const btn = document.createElement('button');
            div_connexion.appendChild(btn);
            btn.id = "bouton_deconnexion";
            btn.innerHTML = "Déconnexion";
            document.getElementById('bouton_deconnexion').onclick = function(){
                localStorage.setItem("connexion",'0')
                div_connexion.innerHTML = connexion_init;
            }
        }
        else{
            document.getElementById("mail_connexion").style.borderColor="red"
            document.getElementById("pass").style.borderColor="red"
            document.getElementById("mail_connexion").style.borderWidth="2px"
            document.getElementById("pass").style.borderWidth="2px"

        }
    }
    else{
        document.getElementById("mail_connexion").style.borderColor="red"
        document.getElementById("pass").style.borderColor="red"
        document.getElementById("mail_connexion").style.borderWidth="2px"
        document.getElementById("pass").style.borderWidth="2px"
    }
}

function goBack() {
    //Bouton de retour à la page précédente
    window.history.back();
}