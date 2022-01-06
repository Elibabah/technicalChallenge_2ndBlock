export const enviarFB = () => {


    let botonEnviarMeta = document.getElementById("enviarMeta")

    botonEnviarMeta.addEventListener("click", () => {
        let metaObject = {
            "tipo": document.getElementById("tipo").value,
            "titulo": document.getElementById("titulo").value,
            "descripcion": document.getElementById("descripcion").value,
            "mes": document.getElementById("mesChoose").value,
            "dia": document.getElementById("diaChoose").value
        }
        console.log(metaObject)
    })
}