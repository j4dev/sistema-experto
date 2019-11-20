"use strict";
/**
 * Agrear un input al modal de ingreso de reglas
 */
var inputTotal = 1;
function addInput() {
    inputTotal = inputTotal + 1;
    let antece = document.querySelector("#antecedentes");
    let input = document.createElement("INPUT");
    input.setAttribute("class", "form-control");
    input.setAttribute("id", inputTotal.toString());
    input.setAttribute("style", "text-transform:uppercase;");
    antece.appendChild(input);
}
function addRule() {
    var antecedentes = [];
    var id = "";
    for (let i = 1; i < inputTotal; i++) {
        //id = "\'input[name=\""+i.toString()+"\"]\'";
        //var dato = (<HTMLInputElement> document.getElementById(id)).value.toString();
        antecedentes.push();
    }
    console.log(antecedentes);
}
//# sourceMappingURL=Rules.js.map