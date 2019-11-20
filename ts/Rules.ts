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

async function getRulesByid() {
    
    var url = "http://localhost/sistemaexperto/api/users/searchRules.php";
    var user = JSON.parse(localStorage.getItem("user"));
    var data = {
        usuario:user.id_us,
    };
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();

    localStorage.setItem("reglas", JSON.stringify(json[0]));

    if (json[0].Validacion) {
        if (json[0].tipo === "Experto") {
            window.location.href = "http://localhost/sistemaexperto/usuario_experto.html";
        } else {
            window.location.href = "http://localhost/sistemaexperto/usuario_no_experto.html";
        }
    }

}