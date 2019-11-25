function deleteChild() {
    var listado = document.body.querySelector("#antecedentes");
    listado.innerHTML = "";
}

/**
 * Agrear un input al modal de ingreso de reglas
 */
var inputTotal = 1;

function addInput(value:string) {
    inputTotal = inputTotal + 1 ;
    var id = "i"+inputTotal.toString();
    let antece = document.querySelector<HTMLInputElement>("#antecedentes");
    let input = document.createElement("INPUT");
    input.setAttribute("class","form-control");
    input.setAttribute("id",id);
    input.setAttribute("style","text-transform:uppercase;");
    input.setAttribute("value",value);
    antece.appendChild(input);
    
}

/**
 * Funcion que permite agregar una nueva regla con multiples antecedentes
 */
async function addRule() {
    
    /**
     * Obtencion de los antecedentes de los input
     */
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

/**
 * Peticion POST que obtiene todas las reglas de 
 * un solo usuario
 */
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

/**
 * Funcion que crea los elementos HTML para listar las reglas en un tabla
 */
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
        "<td class=\"text-center\"><i class=\"zmdi zmdi-edit zmdi-hc-2x\" data-toggle=\"modal\" data-target=\"#ModalForm\" onClick=\"editRule("+rules.id_regla+")\"></i></td>"+
        "<td class=\"text-center\"><i class=\"zmdi zmdi-delete zmdi-hc-2x\"  onClick=\"deleteRule("+rules.id_regla+")\"></i></td>"+
        "</tr>";
        antecedente = "";
    });

    var listado = document.body.querySelector("#list_reglas");
    listado.innerHTML = rule;
}

/**
 * 
 * @param id_regla 
 *Funcion que borra una regla en base a su id
 */
async function deleteRule(id_regla:string) {
    var url = "http://localhost/sistemaexperto/api/rules/deleteRules.php";
    
    var data = {
        regla:id_regla
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    listRules();
}

/**
 *Funcion para hacer una peticion con el id de la regla
 *
 * @param {string} id_regla
 */
async function editRule(id_regla:string) {
    deleteChild();
    var url = "http://localhost/sistemaexperto/api/rules/infoRule.php";
    
    var data = {
        id_regla
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    console.log(json);
    json.reglas.map(function (ante:any) {
        addInput(ante.antecedente);
    });
    
}

/**
 *
 *
 * @param {*} json
 *Funcion para mostrar el model donde se editaran los datos de la regla
 */
function modalEdit(json:any) {
    
    var modalEdit = "<div class=\"modal-dialog\" role=\"document\">"+
    "<div class=\"modal-content\">"+
    "<div class=\"modal-header\">"+
    "<h1 class=\"modal-title\">Regla</h1>"+
    "</div>"+
    "<div class=\"modal-body\">"+
    "<div class=\"form-group\">"+
    "<p>Antecedentes: </p>"+
    "<div id=\"antecedentes\">"+
    "<input type=\"text\" class=\"form-control\" id=\"i1\" style=\"text-transform:uppercase;\">"+
    "<div id=\"antecedentes\">"+
    "</div>"+
    "</div>"+
    "<div class=\"text-center\">"+
    "<i class=\"zmdi zmdi-plus-circle zmdi-hc-3x\" onclick=\"addInput()\"></i>"+
    "</div>"+
    "<div class=\"form-group\">"+
    "<p>Hipótesis:</p>"+
    "<input type=\"text\" class=\"form-control\" id=\"hipotesis\""+
    "style=\"text-transform:uppercase;\">"+
    "</div>"+
    "<div class=\"form-group\">"+
    "<button type=\"submit\" class=\"btn btn-success\" onclick=\"addRule()\""+
    "data-dismiss=\"modal\">Guardar</button>"+
    "<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancelar</button>"+
    "</div>"+
    "</div>"+
    " </div>"+
    "</div>"+
    "</div>";

}


