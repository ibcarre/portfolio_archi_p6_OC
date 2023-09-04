if (document.cookie.length == 0){
    document.location.href="../index.html";
}

const categories_set = new Set();
parent = document.querySelector(".gallery");
function trouver(parent){
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(works => {
            for(const work of works){
                var figure = document.createElement('figure');
                parent.appendChild(figure);
                var image = document.createElement("img");
                figure.setAttribute("id", "figure_main_" + work["id"]);
                figure.appendChild(image);
                image.src = work["imageUrl"];
                image.alt = work["title"];
                var figcap = document.createElement("figcaption");
                figure.appendChild(figcap);
                figcap.innerHTML = work["title"]
                figure.className = work["category"]["name"]
                if(categories_set.has(work["category"]["name"]) == false){
                    categories_set.add(work["category"]["name"])
                }
            }
    });
}
trouver(parent)
var modal = document.getElementById("myModal");
var btn = document.getElementById("modifier");
var span = document.getElementsByClassName("close")[0];
var spantwo = document.getElementsByClassName("close")[1];
var modalajout = document.getElementById("Modalajout");
var btn_ajout = document.getElementById("ajouter");
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
  }

  spantwo.onclick = function() {
    modalajout.style.display = "none";
  }
window.onclick = function(event) {
    if (event.target == modal || event.target == modalajout) {
      modal.style.display = "none";
      modalajout.style.display = "none";
    }
}
btn_ajout.onclick = function(){
    modal.style.display = "none";
    modalajout.style.display = "block";
    add_categories();
}


var parentbis = document.getElementById("galerie");
function trouverbis(parentbis){
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(works => {
            for(const work of works){
                var figure = document.createElement('figure');
                figure.setAttribute("id","figure_"+work["id"]);
                figure.classList.add("mod_img");
                parentbis.appendChild(figure);
                var image = document.createElement("img");
                figure.appendChild(image);
                image.src = work["imageUrl"];
                image.alt = work["title"];
                var figcap = document.createElement("figcaption");
                figure.appendChild(figcap);
                figcap.innerHTML = "éditer";
                var poubelle = document.createElement("div");
                figure.appendChild(poubelle);
                poubelle.innerHTML = "<i class='fa-solid fa-trash-can fa-2xs' style='color: #ffffff;'></i>";
                poubelle.className = "poubelle";
                var move = document.createElement("div");
                figure.appendChild(move);
                move.innerHTML = "<i class='fa-solid fa-up-down-left-right fa-2xs' style='color: #ffffff;'></i>>";
                move.className = "move";
                poubelle.addEventListener("click", function(event){
                    event.preventDefault();
                    suppr(work["id"])});
            }
        });
};

trouverbis(parentbis);

async function suppr(id){
    var userToken = getCookie();
    console.log(userToken);
    let response = await fetch('http://localhost:5678/api/works/'+id, {method: "DELETE", headers: {"Authorization": 'Bearer ' + userToken}})
    if(response.status == 204){
        var del_item = document.getElementById("figure_"+id);
        del_item.style.display = "none";
        var del_item_main = document.getElementById("figure_main_"+id);
        del_item_main.style.display = "none";
    }
    else{
        alert("La photo n'a pas été supprimée")
    }
}

function getCookie() {
    var cookies = document.cookie.split(";");
    var cookie = cookies[0].split("=");
    console.log(cookie[1]);
    return cookie[1];
  }


function add_categories(){
    filtreArray = Array.from(categories_set);
    var categories = document.getElementById("catégorie");
    for (var i = 0; i < filtreArray.length; i++){
        console.log(i);
        var option = document.createElement("option");
        categories.appendChild(option)
        option.setAttribute("id", filtreArray[i]);
        option.innerHTML=filtreArray[i];
        option.value = filtreArray[i];
    }
}


document.getElementById("ajout_form").addEventListener("submit", function(event) {
    userToken = getCookie();
    filtreArray = Array.from(categories_set);
    console.log(userToken);
    event.preventDefault();
    var formData = new FormData();
    formData.append("image", document.getElementById("upload").files[0]);
    formData.append("title", document.getElementById("titre").value);
    formData.append("category", filtreArray.indexOf(document.getElementById("catégorie").value));
    fetch("http://localhost:5678/api/works", {
      method: "POST", 
      body: formData,
      headers: {
        "Authorization": 'Bearer ' + userToken,
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(console.log(document.getElementById("upload").files[0]))
    .then(console.log(document.getElementById("titre").value))
    .then(console.log(document.getElementById("catégorie").value))

  });

imgs = document.getElementById("upload");
img_up = document.getElementById("upload_img");
imgs.onchange = evt => {
    const [file] = imgs.files;
    console.log(file)
    if (file) {
        img_up.style.display = "block";
        img_up.src = URL.createObjectURL(file)
        document.getElementById("file_txt").style.display = "none";
        document.getElementById("ajouterphoto").innerHTML = "";
        document.getElementById("icone").style.display = "none";
    }
    if(file && document.getElementById("titre").value != "" && document.getElementById("catégorie").value != ""){
        document.getElementById("valider").style.backgroundColor = "#1D6154"; 
    }
  }

  document.getElementById("titre").onchange = evt => {
    const [file] = imgs.files;
    
    if(file && document.getElementById("titre").value != "" && document.getElementById("catégorie").value != ""){
        document.getElementById("valider").style.backgroundColor = "#1D6154"; 
    }

  }


  document.getElementById("catégorie").onchange = evt => {
    const [file] = imgs.files;
    
    if(file && document.getElementById("titre").value != "" && document.getElementById("catégorie").value != ""){
        document.getElementById("valider").style.backgroundColor = "#1D6154"; 
    }

  }
