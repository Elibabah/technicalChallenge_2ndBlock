import * as module from "./firebase.js";
import { diasPorMes } from "./app.js";
export const enviarFB = () => {
  const db = firebase.firestore(); //db.collection("metas").add()

  const saveMeta = obj => {
    db.collection("metas").doc().set(obj);
  };

  const updateMeta = (id, updateMeta) => db.collection("metas").doc(id).update(updateMeta);

  let metaForm = document.getElementById("metaForm");
  let botonEnviarMeta = document.getElementById("enviarMeta");
  let botonCerrarModal = document.getElementById("cerrarModal");
  let editStatus = false;
  let id = "";
  let getMetasArray = [];
  const cardMeta = document.getElementById("cardPorMeta");
  let mesEnero = document.getElementById("enero");
  let mesFebrero = document.getElementById("febrero");
  let mesMarzo = document.getElementById("marzo");
  let mesAbril = document.getElementById("abril");
  let mesMayo = document.getElementById("mayo");
  let mesJunio = document.getElementById("junio");
  let mesJulio = document.getElementById("julio");
  let mesAgosto = document.getElementById("agosto");
  let mesSeptiembre = document.getElementById("septiembre");
  let mesOctubre = document.getElementById("octubre");
  let mesNoviembre = document.getElementById("noviembre");
  let mesDiciembre = document.getElementById("diciembre");

  const onGetMetas = callback => db.collection("metas").onSnapshot(callback);

  const deleteMeta = id => db.collection("metas").doc(id).delete();

  const editMeta = id => db.collection("metas").doc(id).get();
  /*    let tipo = document.getElementById("tipo").value
      let titulo = document.getElementById("titulo").value
      let descripcion = document.getElementById("descripcion").value*/


  let mes = document.getElementById("mesChoose").value;
  let dia = document.getElementById("diaChoose").value; // Botón enviar meta creada

  botonEnviarMeta.addEventListener("click", async e => {
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
      await saveMeta({
        "tipo": document.getElementById("tipo").value,
        "titulo": document.getElementById("titulo").value,
        "descripcion": document.getElementById("descripcion").value,
        "mes": document.getElementById("mesChoose").value,
        "dia": document.getElementById("diaChoose").value
      }); // Desactivar botones mientras se envía data a firebase
      //botonEnviarMeta.disabled = true;
      //botonCerrarModal.disabled = true;

      getMetasArray = []; //cardMeta.innerHTML = "";

      tipo.value = "Selecciona tu tipo de meta";
      titulo.value = "";
      descripcion.value = "";
      /*mes.value = "Selecciona un mes objetivo";
      dia.value = "Selecciona un día";*/

      diasPorMes();
      let imprimirDia = document.getElementById("diaChoose");
      imprimirDia.innerHTML = "";
      imprimirDia.innerHTML += `  
                    <option value="${dia}">${dia}</option>
                `; // Salida de modal después de data enviada 

      /*setTimeout(() => {
          //alert("¡Meta creada!")
          window.location.href = "./index.html";
      }, 1000);*/
    } else {
      await updateMeta(id, {
        tipo: tipo.value,
        titulo: titulo.value,
        descripcion: descripcion.value
      });
      tipo.value = "Selecciona tu tipo de meta";
      titulo.value = "";
      descripcion.value = "";
      editStatus = false;
      id = "";
      botonEnviarMeta.innerText = "Crear meta"; //botonEnviarMeta.innerText = "Actualizar"
    }
  }); //    return true;
  //Traer data de Firebase
  //const traerMetas = () => {
  //const db = firebase.firestore();

  /* let getMetasArray = [];
   const cardMeta = document.getElementById("cardPorMeta")
   const onGetMetas = (callback) => db.collection("metas").onSnapshot(callback);
   const deleteMeta = id => db.collection("metas").doc(id).delete();
   const editMeta = (id) => db.collection("metas").doc(id).get()*/

  window.addEventListener("DOMContentLoaded", async e => {
    mesEnero.innerHTML = "";
    mesFebrero.innerHTML = "";
    mesMarzo.innerHTML = "";
    mesAbril.innerHTML = "";
    mesMayo.innerHTML = "";
    mesJunio.innerHTML = "";
    mesJulio.innerHTML = "";
    mesAgosto.innerHTML = "";
    mesSeptiembre.innerHTML = "";
    mesOctubre.innerHTML = "";
    mesNoviembre.innerHTML = "";
    mesDiciembre.innerHTML = ""; //Función para obtener data en tiempo real con onGetMetas

    onGetMetas(querySnapshot => {
      //cardMeta.innerHTML = "";
      querySnapshot.forEach(doc => {
        //console.log(doc.data())
        //console.log(doc.id)
        //Pasando data a array
        let datosMeta = doc.data();
        datosMeta.id = doc.id;
        getMetasArray.push(datosMeta);
        console.log(getMetasArray); //Iterando cada meta desde Array

        mesEnero.innerHTML = "";
        mesFebrero.innerHTML = "";
        mesMarzo.innerHTML = "";
        mesAbril.innerHTML = "";
        mesMayo.innerHTML = "";
        mesJunio.innerHTML = "";
        mesJulio.innerHTML = "";
        mesAgosto.innerHTML = "";
        mesSeptiembre.innerHTML = "";
        mesOctubre.innerHTML = "";
        mesNoviembre.innerHTML = "";
        mesDiciembre.innerHTML = "";

        for (const detallesMeta of getMetasArray) {
          console.log(detallesMeta);

          if (detallesMeta.mes === "enero") {
            mesEnero.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesEnero.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "febrero") {
            mesFebrero.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesFebrero.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "marzo") {
            mesMarzo.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesMarzo.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "abril") {
            mesAbril.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesAbril.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "mayo") {
            mesMayo.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesMayo.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "junio") {
            mesJunio.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesJunio.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "julio") {
            mesJulio.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesJulio.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "agosto") {
            mesAgosto.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesAgosto.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "septiembre") {
            mesSeptiembre.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesSeptiembre.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "octubre") {
            mesOctubre.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesOctubre.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "noviembre") {
            mesNoviembre.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesNoviembre.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          } else if (detallesMeta.mes === "diciembre") {
            mesDiciembre.innerHTML += `
        <div id="card-individual">
            <h6 class="card-title" id="head-card">${detallesMeta.tipo}<br> Día: ${detallesMeta.dia}</h6>
     
                <div>Título</div>
                <textarea class="form-control" placeholder="${detallesMeta.titulo}"></textarea>    
    
                <div>Descripción:</div>
                <textarea class="form-control" placeholder="${detallesMeta.descripcion}"></textarea>
                    
                    <button type="button" class="btn btn-secundary btn-delete" data-id="${detallesMeta.id}">Borrar</button>
                    <button type="button" class="btn btn-primary btn-edit" data-id="${detallesMeta.id}">Editar</button>
                </div>
            </div>
        </div>
        `; //Eliminar

            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log(e.target.dataset.id)
                //Limpiando para imprimir
                getMetasArray = [];
                mesDiciembre.innerHTML = "";
                await deleteMeta(e.target.dataset.id);
              });
            }); //Editar

            const btnsEdit = document.querySelectorAll(".btn-edit");
            btnsEdit.forEach(btn => {
              btn.addEventListener("click", async e => {
                //console.log("editing" + e.target.dataset.id)
                getMetasArray = [];
                const doc = await editMeta(e.target.dataset.id);
                console.log(doc.data());
                let editar = doc.data();
                editStatus = true;
                id = doc.id;
                tipo.value = editar.tipo;
                titulo.value = editar.titulo;
                descripcion.value = editar.descripcion; //mes.value = editar.mes
                //dia.value = editar.dia

                botonEnviarMeta.innerText = "Actualizar";
              });
            });
          }
        }
        /* let enero = "";
         let febrero = "";
             for (const meses of getMetasArray) {
             //console.log(meses.mes)
             if (meses.mes === "enero") {
                 enero++
                 //console.log(febrero)
             } else if (meses.mes === "febrero") {
                 febrero++
             } //console.log(febrero)
             }
         console.log("enero: " + enero)
         console.log("febrero: " + febrero)*/

      });
    });
  }); // }
};