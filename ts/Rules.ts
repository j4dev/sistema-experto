/**
 * Agrear un input al modal de ingreso de reglas
 */
function addInput() {
    let antece = document.querySelector<HTMLInputElement>("#antecedentes");
    let input = document.createElement("INPUT");

    antece.appendChild(input);
    
}