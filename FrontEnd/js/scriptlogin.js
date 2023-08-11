btn = document.getElementById("form_co");
btn.addEventListener("submit", async function(event) {
    event.preventDefault(); 
    email = document.getElementById("email").value;
    mdp = document.getElementById("mdp").value;
    console.log(email,mdp)
    let response = fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        body: {
            "email": email,
            "password": mdp
        }
    });
    console.log(await response)
});
