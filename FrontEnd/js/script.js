parent = document.querySelector(".gallery");
if (document.cookie.length != 0){
    document.location.href="./assets/index_log.html";
}
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
        for(const work of works){
            var figure = document.createElement('figure');
            parent.appendChild(figure);
            var image = document.createElement("img");
            figure.appendChild(image);
            image.src = work["imageUrl"];
            image.alt = work["title"];
            var figcap = document.createElement("figcaption");
            figure.appendChild(figcap);
            figcap.innerHTML = work["title"]
            figure.className = work["category"]["name"]
        }
    })

objet = document.getElementById("objet");
tous = document.getElementById("tous");
appt = document.getElementById("appt");
hotel = document.getElementById("hotel");

tous.onclick = function(){
    filtre(tous);
}

objet.onclick = function(){
    filtre(objet, "Objets");
}

appt.onclick = function(){
    filtre(appt, "Appartements")
}

hotel.onclick = function(){
    filtre(hotel, "Hotels & restaurants")
}


function filtre(n, name = "none"){
    prev = document.querySelector(".bulles_clicked");
    prev.className = "bulles";
    n.className = "bulles_clicked";
    all = document.getElementsByTagName("figure");
    for(var i = 0; i <all.length; i++){
        if(all[i].className != name && name != "none"){
            all[i].style.display = "none";
        }
        else if (all[i].className == name || name == "none"){
            all[i].style.display = "initial";
        }
    }
}