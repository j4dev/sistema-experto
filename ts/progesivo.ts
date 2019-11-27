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


async function requestRulesF(id_regla:string, id_ant:string,res:boolean) {
    var url = "http://localhost/sistemaexperto/api/progresivo/getRule.php";

    var data={
        id_regla: id_regla,
        id_antecedente:id_ant,
        respuesta:res
    };
    
    console.log(JSON.stringify(data));
    
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

    const response = await requestRulesF(id_r,id_a,res);

    if (response[0].validacion) {
        
        var pregunta = "<p class=\"alert alert-warning text-center\">¿"+response[0].antecedente+"?</p>"+
        "<div class=\"col text-center\">"+
        "<button class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"requestAllRules("+response[0].id_regla_sig+","+response[0].id_antecedente_sig+","+true+")\">Si</button>"+
        "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"requestAllRules("+response[0].id_regla_sig+","+response[0].id_antecedente_sig+","+false+")\">No</button>"+
        "</div>";
    }else{
        var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
    }
}

async function firstQuestion() {
    const res = await requestFirstRule();
    
    if (res[0].validacion) {
        var pregunta = "<p class=\"alert alert-warning text-center\">¿"+res[0].antecedente+"?</p>"+
        "<div class=\"col text-center\">"+
        "<button class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"requestAllRules("+res[0].id_regla_sig+","+res[0].id_antecedente_sig+","+true+")\">Si</button>"+
        "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"requestAllRules("+res[0].id_regla_sig+","+res[0].id_antecedente_sig+","+false+")\">No</button>"+
        "</div>";
    }else{
        var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
    }
    

    var datos = document.querySelector("#pregunta");
    datos.innerHTML = pregunta;
}