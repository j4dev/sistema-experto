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
    input.setAttribute("id",id);
    input.setAttribute("style","text-transform:uppercase;");
    antece.appendChild(input);
    
}

async function addRule() {
    
    var antecedentes: Array<any> = [];
    var id = "";
    for (let i = 1; i <= inputTotal; i++) {
        id = "#i"+i.toString();
        var dato = document.querySelector<HTMLInputElement>(id).value.toString();
       
        antecedentes[0] = {i:dato}; 
    }
    var hipotesis  = document.querySelector<HTMLInputElement>("#hipotesis").value.toString();
    var data = {
        
        hipotesis: hipotesis,
        antecedentes: antecedentes
    };
console.log(JSON.stringify(data));
    var url = "http://localhost:8080/SistemaExperto/api/rules/insertRules.php";
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    console.log(json);
}