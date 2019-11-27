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
    console.log(id_ant);
    
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

async function requestAllRules(ant:string, concl:string,id_r:string,id_a:string,res:boolean) {
    
    //console.log(ant,concl,id_r,id_a,res);
    

   // insertTemporal(ant,concl);

    const response = await requestRules(id_r,id_a,res);
    
    if (response[0].validacion) {

        var pregunta = "<p class=\"alert alert-warning text-center\">¿"+response[0].antecedente+"?</p>"+
        "<div class=\"col text-center\">"+
        "<button class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"requestAllRules("+response[0].antecedente+","+response[0].conlusion+","+response[0].id_regla_sig+","+response[0].id_antecedente_sig+","+true+")\">Si</button>"+
        "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"requestAllRules("+response[0].antecedente+","+response[0].conlusion+","+response[0].id_regla_sig+","+response[0].id_antecedente_sig+","+false+")\">No</button>"+
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
        "<button class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"requestAllRules("+res[0].antecedente+","+res[0].conlusion+","+res[0].id_regla_sig+","+res[0].id_antecedente_sig+","+true+")\">Si</button>"+
        "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"requestAllRules("+res[0].antecedente+","+res[0].conlusion+","+res[0].id_regla_sig+","+res[0].id_antecedente_sig+","+false+")\">No</button>"+
        "</div>";
    }else{
        var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
    }
    

    var datos = document.querySelector("#pregunta");
    datos.innerHTML = pregunta;
}


/*async function insertTemporal(preg:string,concl:string) {

    var datos = document.querySelector<HTMLInputElement>("#datos_us");
    
    var user = JSON.parse(localStorage.getItem("user"));
    var data = {
        id_usuario:user.id_us,
        pregunta:preg,
        conclusion:concl
    };
    console.log(JSON.stringify(data));
    
    var url = "http://localhost/sistemaexperto/api/progresivo/insertTemporal.php";
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    
}*/