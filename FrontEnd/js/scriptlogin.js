if (document.cookie.length != 0){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


btn = document.getElementById("form_co");
btn.addEventListener("submit", async function(event) {
    event.preventDefault(); 
    email = document.getElementById("email").value;
    mdp = document.getElementById("mdp").value;
    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": mdp
        })
    });
    console.log(response.status);
    if(response.status == 200){
        console.log("success");
        response = await response.json();
        console.log(response);
        var now = new Date();
        now.setDate(now.getDate() + 1);
        document.cookie = "token=" + response["token"] + " ; expires="+now.toUTCString() + ";path=/; SameSite=Lax";
        console.log(document.cookie)
        document.location.href="../assets/index_log.html";
    }
    else{
        alert("Mauvais mot de passe/identifiant")
    }

});
