const meses = "../datamonth/month.json";

const mesesArray = []

export const diasPorMes = () => {
    fetch(meses)
        .then((response) => response.json())
        .then((data) => {
            mesesArray.push(data);
            console.log(mesesArray);

            for (let mes in mesesArray[0]) {
                console.log(mes);

                let imprimirMes = document.getElementById("mesChoose");
                imprimirMes.innerHTML += `  
                    <option value="${mes}">${mes}</option>
                `;
            }

            let diaPorMes = document.getElementById("mesChoose");

            diaPorMes.addEventListener("change", () => {
                console.log("estoy escuchando")
                let clickMes = document.getElementById("mesChoose").value;
                console.log(clickMes)

                //console.log(mesesArray[0][clickMes])
                for (let dia of mesesArray[0][clickMes]) {
                    console.log(dia)

                    let imprimirDia = document.getElementById("diaChoose")
                    imprimirDia.innerHTML += `  
                    <option value="${dia}">${dia}</option>
                `;
                }
            })
        })
}