import * as module from "./firebase.js"




export const enviarFB = () => {
    const db = firebase.firestore();
    //db.collection("metas").add()

    const saveMeta = (obj) => {
        db.collection("metas").doc().set(obj);
    };

    let botonEnviarMeta = document.getElementById("enviarMeta")

    botonEnviarMeta.addEventListener("click", async(e) => {
        let metaObject = {
            "tipo": document.getElementById("tipo").value,
            "titulo": document.getElementById("titulo").value,
            "descripcion": document.getElementById("descripcion").value,
            "mes": document.getElementById("mesChoose").value,
            "dia": document.getElementById("diaChoose").value
        }
        console.log(metaObject)

        e.preventDefault();
        await saveMeta(metaObject);
        setTimeout(() => {
            alert("¡Meta creada!")
            window.location.href = "./index.html";
        }, 1100);
        //data-bs-dismiss="modal"
    })
}