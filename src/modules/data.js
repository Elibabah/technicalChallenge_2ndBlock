import * as module from "./firebase.js"




export const enviarFB = () => {
    const db = firebase.firestore();
    //db.collection("metas").add()

    const saveMeta = (obj) => {
        db.collection("metas").doc().set(obj);
    };

    let botonEnviarMeta = document.getElementById("enviarMeta")
    let botonCerrarModal = document.getElementById("cerrarModal")

    /*let tipo = document.getElementById("tipo").value
    let titulo = document.getElementById("titulo").value
    let descripcion = document.getElementById("descripcion").value
    let mes = document.getElementById("mesChoose").value
    let dia = document.getElementById("diaChoose").value*/

    // Botón enviar meta creada
    botonEnviarMeta.addEventListener("click", async(e) => {

            //Validación de entradas
            /*    if (tipo.length == 0) {
                    // Si no se cumple la condicion...
                    alert("¡No te olvides del tipo de tu propósito!");
                    return false;
                } else if (titulo == null ||
                    titulo.length == 0 ||
                    /^\s+$/.test(titulo)) {
                    // Si no se cumple la condicion...
                    alert("¡Ponerle nombre a tus metas ayuda a hacerlas más claras!");
                    return false;
                } else if (descripcion == null || descripcion == 0) {
                    // Si no se cumple la condicion...
                    alert("¡Será mejor que agregues de qué va tu propósito para lo recuerdes todo!");
                    return false;
                } else if (mes == null || mes == 0) {
                    // Si no se cumple la condicion...
                    alert("¡No olvides calendarizar tu meta, así será concreta!");
                    return false;
                } else if (dia == null || dia == 0) {
                    alert("Mmmm, ¿no quisieras agregar un día?");
                    return false;
                }*/

            //Modelado de objeto
            let metaObject = {
                "tipo": document.getElementById("tipo").value,
                "titulo": document.getElementById("titulo").value,
                "descripcion": document.getElementById("descripcion").value,
                "mes": document.getElementById("mesChoose").value,
                "dia": document.getElementById("diaChoose").value
            }
            console.log(metaObject)

            //Activar función de guardado de objeto y envío a firebase
            e.preventDefault();
            await saveMeta(metaObject);

            // Desactivar botones mientras se envía data a firebase
            botonEnviarMeta.disabled = true;
            botonCerrarModal.disabled = true;

            // Salida de modal después de data enviada 
            /*setTimeout(() => {
                alert("¡Meta creada!")
                window.location.href = "./index.html";
            }, 1100);*/

        })
        //    return true;
}



//Traer data de Firebase
export const traerMetas = () => {

    const db = firebase.firestore();

    let getMetasArray = [];
    let cardMeta = document.getElementById("cardPorMeta")
    const onGetMetas = (callback) => db.collection("metas").onSnapshot(callback);
    const deleteMeta = id => db.collection("metas").doc(id).delete();

    window.addEventListener("DOMContentLoaded", async(e) => {

        //Función para obtener data en tiempo real con onGetMetas
        onGetMetas((querySnapshot) => {

            //cardMeta.innerHTML = "";
            querySnapshot.forEach(doc => {
                //console.log(doc.data())
                //console.log(doc.id)
                cardMeta.innerHTML = "";
                //Pasando data a array
                let datosMeta = doc.data()
                datosMeta.id = doc.id
                getMetasArray.push(datosMeta)
                console.log(getMetasArray)

                //Iterando cada meta desde Array
                for (const detallesMeta of getMetasArray) {
                    console.log(detallesMeta)
                    cardMeta.innerHTML += `
        <h5 class="card-title">${detallesMeta.tipo}</h5>
        <img src="" class="card-img-top" alt="imagenTipoMeta">
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${detallesMeta.titulo}</li>
                <li class="list-group-item">${detallesMeta.descripcion}</li>
                <li class="list-group-item">${detallesMeta.mes} ${detallesMeta.dia}</li>
            </ul>
            <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
            <div>
                <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Eliminar</button>
                <button type="button" class="btn btn-primary">Editar</button>
            </div>

        </div>
        `
                    const btnsDelete = document.querySelectorAll(".btn-delete")

                    btnsDelete.forEach(btn => {
                        btn.addEventListener("click", async(e) => {
                            //console.log(e.target.dataset.id)
                            //Limpiando array para imprimir
                            getMetasArray = []

                            await deleteMeta(e.target.dataset.id)
                        })
                    })
                }
            });
        })



    })
}