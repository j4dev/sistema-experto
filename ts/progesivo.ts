var list_id: Array<number>=[];

async function requestPorcentaje() {
    var url = "http://localhost/sistemaexperto/api/probabilidad/formulas.php";
    
    var data={
        vec_id: list_id
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

async function requestFirstRule() {
    var url = "http://localhost/sistemaexperto/api/progresivo/getFirstRule.php";
    

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    return json;
}


async function requestRules(id_regla:string, id_ant:string,res:boolean) {
    var url = "http://localhost/sistemaexperto/api/progresivo/getRule.php";
    
    var data={
        id_regla: id_regla.toString(),
        id_antecedente:id_ant.toString(),
        respuesta:res.toString()
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

async function requestAllRules(id_r:string,id_a:string,res:boolean) {
    
    if (id_a != null && id_r != '13') {
        const response = await requestRules(id_r,id_a,res);
        
        
        var pr = JSON.parse(localStorage.getItem("pregunta"));
        
        if (response[0].id_regla != pr.id_regla && res) {
            list_id.push(pr.id_regla);
            insertRTemporal(res);

        } else {
            insertTemporal(res);
        }
        
        if (response[0].validacion) {
            
            var pregunta = "<p class=\"alert alert-warning text-center\">¿"+response[0].antecedente+"?</p>"+
            "<div class=\"col text-center\">"+
            "<button class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"requestAllRules("+response[0].id_regla_sig+","+response[0].id_antecedente_sig+","+true+")\">SI</button>"+
            "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"requestAllRules("+response[0].id_regla_sig+","+response[0].id_antecedente_sig+","+false+")\">NO</button>"+
            "</div>";
            localStorage.setItem("pregunta", JSON.stringify(response[0]));
        }else{
            var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
        }
        
    }else{
        const porcentaje = await requestPorcentaje();
        var pregunta = "<p class=\"alert alert-warning text-center\">NO EXISTEN MAS REGLAS REVISE LA RESPUESTA</p>";
        var result = "<button class=\"btn btn btn-success\" type=\"button\" onClick=\"listRulesAntecedentes()\">VER DETALLE</button><br>";

        var urlRules = "http://localhost/sistemaexperto/api/progresivo/listAnswersReglas.php";
    
        const responseRules = await fetch(urlRules , {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const jsonRules = await responseRules.json();
        var resultado:string;
        jsonRules.map(function (rule:any) {
            resultado = rule.regla;
        });

        var datos = document.querySelector("#resultado");
        datos.innerHTML = "<center><h3><b>"+porcentaje.conclusion+"<p>Con un valor de certidumbre de "+porcentaje.valor_certidumbre+"</></b></h3></center>"+"<br><br>"+result;

    }
    var datos = document.querySelector("#pregunta");
        datos.innerHTML = pregunta;
    
}

async function firstQuestion() {

    const res = await requestFirstRule();

    localStorage.setItem("pregunta", JSON.stringify(res[0]));

    if (res[0].validacion) {
        var pregunta = "<p class=\"alert alert-warning text-center\">¿"+res[0].antecedente+"?</p>"+
        "<div class=\"col text-center\">"+
        "<button class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"requestAllRules("+res[0].id_regla_sig+","+res[0].id_antecedente_sig+","+true+")\">SI</button>"+
        "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"requestAllRules("+res[0].id_regla_sig+","+res[0].id_antecedente_sig+","+false+")\">NO</button>"+
        "</div>";
    }else{
        var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
    }
    

    var datos = document.querySelector("#pregunta");
    datos.innerHTML = pregunta;
}


async function insertTemporal(res:boolean) {

    
    var pr = JSON.parse(localStorage.getItem("pregunta"));
    var user = JSON.parse(localStorage.getItem("user"));
    
    var data = {
        id_usuario:user.id_us,
        pregunta:pr.antecedente,
        conclusion:String(res)
    };

    var url = "http://localhost/sistemaexperto/api/progresivo/insertTemporal.php";
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    
}

/**
 *Insertar la regla en la tabal temporal
 *
 * @param {boolean} res
 */
async function insertRTemporal(res:boolean) {

    
    var pr = JSON.parse(localStorage.getItem("pregunta"));
    
    var data = {
        regla:pr.conlusion,
        respuesta:String(res)  
    };
    
    var url = "http://localhost/sistemaexperto/api/progresivo/insertTemporalReglas.php";
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}


async function listRulesAntecedentes() {
    
    var urlRules = "http://localhost/sistemaexperto/api/progresivo/listAnswersReglas.php";
    
    const responseRules = await fetch(urlRules , {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const jsonRules = await responseRules.json();

    var urlAnte = "http://localhost/sistemaexperto/api/progresivo/listAnswersAntecedentes.php";
    
    const responseAnte = await fetch(urlAnte , {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const jsonAnte = await responseAnte.json();
    createTable(jsonAnte,jsonRules);
}

function createTable(jsonAnte:any,jsonRules:any) {
    var antecedentes:string = "";
    var rules:string = "";

    jsonRules.map(function (rule:any) {
        rules = rules + "<tr>"+
        "<th scope=\"row\">"+rule.regla+"</th>"+
        "<td>"+rule.respuesta+"</td>"+
        "</tr>";
    });
    jsonAnte.map(function (ante:any) {
        antecedentes = antecedentes + "<tr>"+
        "<th scope=\"row\">"+ante.antecedente+"</th>"+
        "<td>"+ante.respuesta+"</td>"+
        "</tr>";
    });
    var tableRules = "<br><br><br>"+
    "<table class=\"table table-sm\">"+
    "<thead>"+
    "<tr>"+
    "<th scope=\"col\">Reglas cumplidas</th>"+
    "<th scope=\"col\">Respuestas inferidas</th>"+
    "</tr>"+
    "</thead>"+
    "<tbody>"+
        rules+
    "</tbody>"+
    "</table>";
    var tableAnte = "<br><br><br>"+
    "<table class=\"table table-sm\">"+
    "<thead>"+
    "<tr>"+
    "<th scope=\"col\">Antecedentes</th>"+
    "<th scope=\"col\">Respuestas dadas por el usuario</th>"+
    "</tr>"+
    "</thead>"+
    "<tbody>"+
    antecedentes+
    "</tbody>"+
    "</table>";

    var listadoRules = document.body.querySelector("#table_rules");
    listadoRules.innerHTML = tableRules;
    var listadoAnte = document.body.querySelector("#table_ante");
    listadoAnte.innerHTML = tableAnte;
}