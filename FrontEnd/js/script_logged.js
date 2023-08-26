if (document.cookie.length == 0){
    document.location.href="../index.html";
}
parent = document.querySelector(".gallery");
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
