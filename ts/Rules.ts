/**
 * Agrear un input al modal de ingreso de reglas
 */
var inputTotal = 1;
function addInput() {
    inputTotal = inputTotal + 1 ;
    let antece = document.querySelector<HTMLInputElement>("#antecedentes");
    let input = document.createElement("INPUT");
    input.setAttribute("class","form-control");
    input.setAttribute("id",inputTotal.toString());
    input.setAttribute("style","text-transform:uppercase;");
    antece.appendChild(input);
    
}

function addRule() {
    var idInput = "#1";
    var input = document.querySelector<HTMLInputElement>(idInput).value.toString();
    console.log(input);
    
}