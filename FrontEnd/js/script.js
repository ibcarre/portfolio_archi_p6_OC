parent = document.querySelector(".gallery");

if (document.cookie.length != 0){
    document.location.href="./assets/index_log.html";
}
  
const filtre_lst = new Set();
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
            filtre_lst.add("Tous")
            if(filtre_lst.has(work["category"]["name"]) == false){
                filtre_lst.add(work["category"]["name"])
            }
        }
        bulles_cree();
    });

parent_filtre = document.querySelector(".filtre");

function bulles_cree(){
    console.log(filtre_lst.size);
    var filtreArray = Array.from(filtre_lst);
    for(var i = 0; i < filtreArray.length; i++){
        console.log(parent_filtre);
        var bouton = document.createElement("div");
        parent_filtre.appendChild(bouton);
        if (filtreArray[i] === "Tous"){
            let jsp = filtreArray[i];
            bouton.classList.add("bulles_clicked");
            bouton.innerHTML = filtreArray[i]; 
            bouton.setAttribute("id", "Tous");
            let boutonbis = bouton;
            boutonbis.onclick = function(){
                handleButtonClick(boutonbis);
            }
        }
        else{
            let jsp = filtreArray[i];
            bouton.innerHTML = filtreArray[i];
            bouton.classList.add("bulles");
            bouton.setAttribute("id", filtreArray[i]);
            let boutonbis = bouton
            boutonbis.onclick = function(){
                handleButtonClick(boutonbis, jsp);
            }
            
        }
    }
}


function handleButtonClick(bouton, value="Tous") {
    filtre(bouton, value);
}


// tous.onclick = function(){
//     filtre(tous);
// }

// objet.onclick = function(){
//     filtre(objet, "Objets");
// }

// appt.onclick = function(){
//     filtre(appt, "Appartements")
// }

// hotel.onclick = function(){
//     filtre(hotel, "Hotels & restaurants")
// }


function filtre(n, name = "Tous"){
    prev = document.querySelector(".bulles_clicked");
    prev.className = "bulles";
    n.className = "bulles_clicked";
    all = document.getElementsByTagName("figure");
    for(var i = 0; i <all.length; i++){
        if(all[i].className != name && name != "Tous" && all[i].className != "pdp"){
            all[i].style.display = "none";
        }
        else if (all[i].className == name || name == "Tous"){
            all[i].style.display = "initial";
        }
    }
}