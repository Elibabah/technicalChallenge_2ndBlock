let btnAccess = document.getElementById("login")

btnAccess.addEventListener("click", () => {
    //console.log("clicked")
    let pass = document.getElementById("password").value
    if (pass == "") {
        window.location = ("./index.html")
    } else {
        alert("Acceso denegado")
    }
})