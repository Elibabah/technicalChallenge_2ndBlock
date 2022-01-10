import * as module from "./firebase.js"

import { diasPorMes } from "./app.js";


export const enviarFB = () => {
    const db = firebase.firestore();
    //db.collection("metas").add()

    const saveMeta = (obj) => {
        db.collection("metas").doc().set(obj);
    };
    const updateMeta = (id, updateMeta) => db.collection("metas").doc(id).update(updateMeta);
    let metaForm = document.getElementById("metaForm")
    let botonEnviarMeta = document.getElementById("enviarMeta")
    let botonCerrarModal = document.getElementById("cerrarModal")
    let editStatus = false;
    let id = ""


    let getMetasArray = [];
    const cardMeta = document.getElementById("cardPorMeta")
    const onGetMetas = (callback) => db.collection("metas").onSnapshot(callback);
    const deleteMeta = id => db.collection("metas").doc(id).delete();
    const editMeta = (id) => db.collection("metas").doc(id).get()
        /*    let tipo = document.getElementById("tipo").value
            let titulo = document.getElementById("titulo").value
            let descripcion = document.getElementById("descripcion").value*/
    let mes = document.getElementById("mesChoose").value
    let dia = document.getElementById("diaChoose").value

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
            /*let metaObject = {
                "tipo": document.getElementById("tipo").value,
                "titulo": document.getElementById("titulo").value,
                "descripcion": document.getElementById("descripcion").value,
                "mes": document.getElementById("mesChoose").value,
                "dia": document.getElementById("diaChoose").value
            }
            console.log(metaObject)*/

            //Activar función de guardado de objeto y envío a firebase
            e.preventDefault();

            if (!editStatus) {
                await saveMeta(


                    {
                        "tipo": document.getElementById("tipo").value,
                        "titulo": document.getElementById("titulo").value,
                        "descripcion": document.getElementById("descripcion").value,
                        "mes": document.getElementById("mesChoose").value,
                        "dia": document.getElementById("diaChoose").value
                    }


                );

                // Desactivar botones mientras se envía data a firebase
                //botonEnviarMeta.disabled = true;
                //botonCerrarModal.disabled = true;


                getMetasArray = [];
                //cardMeta.innerHTML = "";
                tipo.value = "Selecciona tu tipo de meta";
                titulo.value = "";
                descripcion.value = "";
                /*mes.value = "Selecciona un mes objetivo";
                dia.value = "Selecciona un día";*/
                diasPorMes()
                let imprimirDia = document.getElementById("diaChoose")
                imprimirDia.innerHTML = ""
                imprimirDia.innerHTML += `  
                    <option value="${dia}">${dia}</option>
                `;

                // Salida de modal después de data enviada 
                /*setTimeout(() => {
                    //alert("¡Meta creada!")
                    window.location.href = "./index.html";
                }, 1000);*/
            } else {
                await updateMeta(id, {

                    tipo: tipo.value,
                    titulo: titulo.value,
                    descripcion: descripcion.value

                })

                tipo.value = "Selecciona tu tipo de meta";
                titulo.value = "";
                descripcion.value = "";

                editStatus = false;
                id = "";
                botonEnviarMeta.innerText = "Crear meta"
                    //botonEnviarMeta.innerText = "Actualizar"
            }






        })
        //    return true;




    //Traer data de Firebase
    //const traerMetas = () => {

    //const db = firebase.firestore();

    /* let getMetasArray = [];
     const cardMeta = document.getElementById("cardPorMeta")
     const onGetMetas = (callback) => db.collection("metas").onSnapshot(callback);
     const deleteMeta = id => db.collection("metas").doc(id).delete();
     const editMeta = (id) => db.collection("metas").doc(id).get()*/

    window.addEventListener("DOMContentLoaded", async(e) => {
            cardMeta.innerHTML = "";
            //Función para obtener data en tiempo real con onGetMetas
            onGetMetas((querySnapshot) => {

                //cardMeta.innerHTML = "";
                querySnapshot.forEach(doc => {
                    //console.log(doc.data())
                    //console.log(doc.id)

                    //Pasando data a array
                    let datosMeta = doc.data()
                    datosMeta.id = doc.id
                    getMetasArray.push(datosMeta)
                    console.log(getMetasArray)

                    //Iterando cada meta desde Array
                    cardMeta.innerHTML = "";
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
                <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
            </div>

        </div>
        `
                            //Eliminar
                        const btnsDelete = document.querySelectorAll(".btn-delete")

                        btnsDelete.forEach(btn => {
                            btn.addEventListener("click", async(e) => {
                                //console.log(e.target.dataset.id)
                                //Limpiando para imprimir
                                getMetasArray = []
                                cardMeta.innerHTML = "";

                                await deleteMeta(e.target.dataset.id)
                            })
                        })

                        //Editar
                        const btnsEdit = document.querySelectorAll(".btn-edit")

                        btnsEdit.forEach(btn => {
                            btn.addEventListener("click", async(e) => {
                                //console.log("editing" + e.target.dataset.id)
                                getMetasArray = []

                                const doc = await editMeta(e.target.dataset.id)
                                console.log(doc.data())

                                let editar = doc.data()

                                editStatus = true;
                                id = doc.id

                                tipo.value = editar.tipo
                                titulo.value = editar.titulo
                                descripcion.value = editar.descripcion
                                    //mes.value = editar.mes
                                    //dia.value = editar.dia
                                botonEnviarMeta.innerText = "Actualizar"
                            })
                        })

                    }
                });
            })



        })
        // }
}