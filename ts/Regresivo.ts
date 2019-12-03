var numAnte = 0;
var numAux = 0;

function selectTrue(id:any) {
    numAux++;
    if (numAnte == numAux) {
        var pregunta:string="<p class=\"alert alert-warning text-center\"><b>SU HIPOTESIS CUMPLE CON LOS ANTECEDENTES</b></p>";
        var datos = document.querySelector("#pregunta");
        datos.innerHTML = pregunta;
    } 
    id.innerHTML = "";
}

function selectFalse(id_r:string) {
    /*var pregunta:string="<p class=\"alert alert-warning text-center\"><b>SU HIPOTESIS NO CUMPLE CON LOS ANTECEDENTES</b></p>";
    var datos = document.querySelector("#pregunta");
    datos.innerHTML = pregunta;*/

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
            "<button  class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"selectTrue("+id+")\">SI</button>"+
            "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"selectFalse("+id_r+")\">NO</button>"+
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