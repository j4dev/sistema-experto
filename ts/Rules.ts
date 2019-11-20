/**
 * Agrear un input al modal de ingreso de reglas
 */
var inputTotal = 1;
function addInput() {
    inputTotal = inputTotal + 1 ;
    var id = "i"+inputTotal.toString();
    let antece = document.querySelector<HTMLInputElement>("#antecedentes");
    let input = document.createElement("INPUT");
    input.setAttribute("class","form-control");
    input.setAttribute("id",inputTotal.toString());
    input.setAttribute("style","text-transform:uppercase;");
    antece.appendChild(input);
    
}

function addRule() {
    var antecedentes: Array<string> = [];
    var id = "";
    for (let i = 1; i < inputTotal; i++) {
        id = "#i"+i.toString();
        var dato = document.querySelector<HTMLInputElement>(id).value.toString();

        antecedentes.push(dato);        
    }
    console.log(antecedentes);
    
}