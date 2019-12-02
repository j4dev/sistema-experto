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

    if (id_r != null) {
        const response = await requestRules(id_r,id_a,res);
        
        var pr = JSON.parse(localStorage.getItem("pregunta"));
        
        if (response[0].id_regla != pr.id_regla && res) {
            
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

        var pregunta = "<p class=\"alert alert-warning text-center\">NO EXISTEN MAS REGLAS REVISE LA RESPUESTA</p>";
        var result = "<button class=\"btn btn btn-success\" type=\"button\" onClick=\"listRulesAntecedentes()\">VER DETALLE</button>";
        var datos = document.querySelector("#resultado");
        datos.innerHTML = result;

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
    
    /*var result = "<p class=\"alert alert-success text-center\">"+pr.conlusion+"</p>";
    var datos = document.querySelector("#resultado");
    datos.innerHTML = result;*/
    
    var url = "http://localhost/sistemaexperto/api/progresivo/insertTemporalReglas.php";
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    
    
}
