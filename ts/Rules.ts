function deleteChild() {
    var listado = document.body.querySelector("#updateante");
    listado.innerHTML = "";
}

/**
 * Agrear un input al modal de ingreso de reglas
 */
var inputTotal = 1;
var inputUp:Array<string>=[];
function addInputU(value:string,idI:string) {
    idI = "#i"+idI;
    let antece = document.querySelector<HTMLInputElement>("#updateante");
    let input = document.createElement("INPUT");
    input.setAttribute("class","form-control");
    input.setAttribute("id",idI);
    input.setAttribute("style","text-transform:uppercase;");
    input.setAttribute("value",value);
    antece.appendChild(input);

    let span = document.createElement("SPAN");
    
}


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
            // sacar el primer antecendente y al click que se muevea al siguiente una funcion mostrar 
            // otra funcion para hacer otra peticion id_regla id_ante
            //pero como obtenemos los id de la regla
            //verificando el id anterior reservado en memoria
            //dos contadores que verifiquen uno cuando sea verdadero y otro por cada antecedente
            // tomar como que fue verdadero en el cambio solo si fue verdadero la ultima 
        });

        rule = rule + "<tr>"+
        "<th scope=\"row\">"+rules.id_regla+"</th>"+
        "<td>"+rules.conclusion+"</td>"+
        "<td>"+antecedente+
        "</td>"+
        "<td class=\"text-center\"><button type=\"button\" class=\"zmdi zmdi-edit zmdi-hc-2x\" data-toggle=\"modal\" data-target=\"#ModalUpdate\" onClick=\"modalEdit("+rules.id_regla+")\"></button></td>"+
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
async function editRule() {
    /**
     * Obtencion de los antecedentes de los input
     */
    var antecedentes: Array<any> = [];
    var idI = "";


    /*for (let i = 1; i <= inputTotal; i++) {
        id = "#i"+i.toString();
        var dato = document.querySelector<HTMLInputElement>(id).value.toString();
        antecedentes.push(dato); 
    }*/

    //inputUp.map(function (id:string) {
       // idI = "#i"+id.toString();
        var dato = document.querySelector<HTMLInputElement>("#i1").value.toString();
        console.log(dato);
        
        //antecedentes.push(dato);
    //});

    var hipotesis  = document.querySelector<HTMLInputElement>("#hipotesisU").value.toString();
    console.log(hipotesis);
    console.log(antecedentes);
    
    
    /**
      * Obtener usuarios del local Storage
      */
    /*var user = JSON.parse(localStorage.getItem("user"));
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
    listRules();*/
}

/**
 *
 *
 * @param {*} json
 *Funcion para mostrar el model donde se editaran los datos de la regla
 */
async function modalEdit(id_regla:string) {
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
    
    
    json.reglas.map(function (ante:any) {
        
        addInputU(ante.antecedente,ante.id_antec);
        inputUp.push(ante.id_antec);
        
    });
    let hipotesis = document.querySelector<HTMLInputElement>("#hipotesisU");
    hipotesis.value = json.conclusion;

    let hipo = document.querySelector<HTMLInputElement>("#hu");
    let span = document.createElement("SPAN");
    span.setAttribute("id",json.id_regla);
    hipo.appendChild(span);
}





















    /*var modalEdit = "<div class=\"modal-dialog\" role=\"document\">"+
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
    "</div>";*/

