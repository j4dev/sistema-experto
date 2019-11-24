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
        antecedentes.push(dato); 
    }
    var hipotesis  = document.querySelector<HTMLInputElement>("#hipotesis").value.toString();

    /**
     * Obtener usuarios del local Storage
     */
    var user = JSON.parse(localStorage.getItem("user"));
    var data = {
        usuario: user.id_us,
        hipotesis: hipotesis,
        vec_antecedentes: antecedentes
    };
    
    var url = "http://localhost/sistemaexperto/api/rules/insertRules.php";
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    
    document.querySelector<HTMLInputElement>("#i1").value = "";
    document.querySelector<HTMLInputElement>("#hipotesis").value = "";
    
    listRules();
}

async function getAllRules() {
    var user = JSON.parse(localStorage.getItem("user"));
    var url = "http://localhost/sistemaexperto/api/rules/searchRules.php";
    
    
    var data = {
        usuario: user.id_us
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    return json;
    
}


async function listRules() {
    const res = await getAllRules();
    
    var antecedente:string = "";
    var rule:string = "";
    
    
    res.reglas.map(function (rules:any) {
        rules.antecedentes.map(function (ante:any) {
            antecedente = antecedente + "<li>"+ante.antecedente+"</li>";
        });
        rule = rule + "<tr>"+
        "<th scope=\"row\">"+rules.id_regla+"</th>"+
        "<td>"+rules.conclusion+"</td>"+
        "<td>"+antecedente+
        "</td>"+
        "<td class=\"text-center\"><i class=\"zmdi zmdi-edit zmdi-hc-2x\" onClick=\"editRule("+rules.id_regla+")\"></i></td>"+
        "<td class=\"text-center\"><i class=\"zmdi zmdi-delete zmdi-hc-2x\" onClick=\"deleteRule("+rules.id_regla+")\"></i></td>"+
        "</tr>";
        antecedente = "";
    });

    var listado = document.body.querySelector("#list_reglas");
    listado.innerHTML = rule;
}
