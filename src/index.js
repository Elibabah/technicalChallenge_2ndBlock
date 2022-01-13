import { diasPorMes } from "./modules/app.js";
import { enviarFB } from "./modules/data.js"
diasPorMes()
enviarFB()
    //traerMetas()


let btnSalir = document.getElementById("cerrarSesion")

btnSalir.addEventListener("click", () => {
    //console.log("clicked")
    window.location = ("./login.html")
})