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
        document.location.href="../assets/index_log.html";
    }

});
