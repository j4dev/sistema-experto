async function requestAllAntece() {
    
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
    localStorage.setItem("pregunta", JSON.stringify(response[0]));
    
    //if (res[0].validacion) {
    response.map(function (res:any) {
        pregunta = pregunta + "<button class=\"btn btn-info btn-lg\" type=\"button\" onClick=\"requestAllAntece("+res.id_regla+","+true+")\">"+res.conclusion+"</button><br><br>";
    });
    /*}else{
        var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
    }*/
    

    var datos = document.querySelector("#reglas");
    datos.innerHTML = pregunta;
}