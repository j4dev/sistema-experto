var numAnte = 0;
var numAux = 0;

async function insertTableAnte(id_a:string,res:boolean) {
    var url = "http://localhost/sistemaexperto/api/regresivo/insertAnte.php";
    
    var data = {
        id_antecedente:id_a,
        respuesta:res
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

async function getOtros(id_r:string) {
    var url = "http://localhost/sistemaexperto/api/regresivo/listRules2.php";
    
    var data = {
        id_regla:id_r
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


async function selectTrue(id:any,id_a:string,res:boolean) {
    numAux++;
    await insertTableAnte(id_a,res);
    
    if (numAnte == numAux) {
        var pregunta:string="<p class=\"alert alert-warning text-center\"><b>SU HIPOTESIS CUMPLE CON LOS ANTECEDENTES</b></p>";
        var datos = document.querySelector("#pregunta");
        datos.innerHTML = pregunta;
    } 
    id.innerHTML = "";
}

async function selectFalse(id_r:string,id_a:string,res:boolean) {
    const response = await getOtros(id_r);
    await insertTableAnte(id_a,res);
    
    if (response[0].validacion) {
        numAnte = 0;
        numAux = 0;
        var pregunta:string="";
        var idB = 1;
        response.map(function (res:any) {
            var id = "b" + idB;
            pregunta = pregunta + "<div id=\""+id+"\"><p class=\"alert alert-warning text-center\">¿"+res.antecedente+"?</p>"+
                "<div class=\"col text-center\">"+
                "<button  class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"selectTrue("+id+","+res.id_antecedente+","+true+")\">SI</button>"+
                "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"selectFalse("+res.id_regla+","+res.id_antecedente+","+false+")\">NO</button>"+
                "</div> </div>";
                numAnte++;
                idB++;
        });
        var datos = document.querySelector("#pregunta");
        datos.innerHTML = pregunta;
    } else {
        var pregunta:string="<p class=\"alert alert-warning text-center\"><b>SU HIPOTESIS NO CUMPLE CON LOS ANTECEDENTES</b></p>";
        var datos = document.querySelector("#pregunta");
        datos.innerHTML = pregunta;
    }

}


function showAntece(id_r:string,json:any,res:boolean) {
    numAnte = 0;
    numAux = 0;
    var pregunta:string="";
    var idB = 1;
    json.map(function (res:any) {
        var id = "b" + idB;
        pregunta = pregunta + "<div id=\""+id+"\"><p class=\"alert alert-warning text-center\">¿"+res.antecedente+"?</p>"+
            "<div class=\"col text-center\">"+
            "<button  class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"selectTrue("+id+","+res.id_antecedente+","+true+")\">SI</button>"+
            "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"selectFalse("+id_r+","+res.id_antecedente+","+false+")\">NO</button>"+
            "</div> </div>";
            numAnte++;
            idB++;
    });
    var datos = document.querySelector("#pregunta");
    datos.innerHTML = pregunta;
}

async function requestAllAntece(id_r:string,res:boolean) {
    var url = "http://localhost/sistemaexperto/api/regresivo/listAnt.php";

    var data = {
        id_regla:id_r
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    
    showAntece(id_r,json,res);
    
}

async function requestRulesAfirmation() {
    var url = "http://localhost/sistemaexperto/api/regresivo/listRules.php";
    

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    return json;
}


async function listReglas() {

    const response = await requestRulesAfirmation();
    var pregunta:string="";

    //if (res[0].validacion) {
    response.map(function (res:any) {
        //var resConclusion:string = "\""+res.conclusion+"\"";
        pregunta = pregunta + "<button class=\"btn btn-secondary\" type=\"button\" onClick=\"requestAllAntece("+res.id_regla+","+true+")\">"+res.conclusion+"</button><br><br>";
    });
    /*}else{
        var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
    }*/
    


    var datos = document.querySelector("#reglas");
    datos.innerHTML = pregunta;
}