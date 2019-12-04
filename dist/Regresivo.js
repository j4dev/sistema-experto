"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var numAnte = 0;
var numAux = 0;
function insertTableAnte(id_a, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var url = "http://localhost/sistemaexperto/api/regresivo/insertAnte.php";
        var data = {
            id_antecedente: id_a,
            respuesta: res
        };
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    });
}
function getOtros(id_r) {
    return __awaiter(this, void 0, void 0, function* () {
        var url = "http://localhost/sistemaexperto/api/regresivo/listRules2.php";
        var data = {
            id_regla: id_r
        };
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = yield response.json();
        return json;
    });
}
function selectTrue(id, id_a, res) {
    return __awaiter(this, void 0, void 0, function* () {
        numAux++;
        yield insertTableAnte(id_a, res);
        if (numAnte == numAux) {
            var pregunta = "<p class=\"alert alert-warning text-center\"><b>SU HIPOTESIS CUMPLE CON LOS ANTECEDENTES</b></p>";
            var datos = document.querySelector("#pregunta");
            datos.innerHTML = pregunta;
        }
        id.innerHTML = "";
    });
}
function selectFalse(id_r, id_a, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield getOtros(id_r);
        yield insertTableAnte(id_a, res);
        if (response[0].validacion) {
            numAnte = 0;
            numAux = 0;
            var pregunta = "";
            var idB = 1;
            response.map(function (res) {
                var id = "b" + idB;
                pregunta = pregunta + "<div id=\"" + id + "\"><p class=\"alert alert-warning text-center\">¿" + res.antecedente + "?</p>" +
                    "<div class=\"col text-center\">" +
                    "<button  class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"selectTrue(" + id + "," + res.id_antecedente + "," + true + ")\">SI</button>" +
                    "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"selectFalse(" + res.id_regla + "," + res.id_antecedente + "," + false + ")\">NO</button>" +
                    "</div> </div>";
                numAnte++;
                idB++;
            });
            var datos = document.querySelector("#pregunta");
            datos.innerHTML = pregunta;
        }
        else {
            var pregunta = "<p class=\"alert alert-warning text-center\"><b>SU HIPOTESIS NO CUMPLE CON LOS ANTECEDENTES</b></p>";
            var datos = document.querySelector("#pregunta");
            datos.innerHTML = pregunta;
        }
    });
}
function showAntece(id_r, json, res) {
    numAnte = 0;
    numAux = 0;
    var pregunta = "";
    var idB = 1;
    json.map(function (res) {
        var id = "b" + idB;
        pregunta = pregunta + "<div id=\"" + id + "\"><p class=\"alert alert-warning text-center\">¿" + res.antecedente + "?</p>" +
            "<div class=\"col text-center\">" +
            "<button  class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"selectTrue(" + id + "," + res.id_antecedente + "," + true + ")\">SI</button>" +
            "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"selectFalse(" + id_r + "," + res.id_antecedente + "," + false + ")\">NO</button>" +
            "</div> </div>";
        numAnte++;
        idB++;
    });
    var datos = document.querySelector("#pregunta");
    datos.innerHTML = pregunta;
}
function requestAllAntece(id_r, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var url = "http://localhost/sistemaexperto/api/regresivo/listAnt.php";
        var data = {
            id_regla: id_r
        };
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = yield response.json();
        showAntece(id_r, json, res);
    });
}
function requestRulesAfirmation() {
    return __awaiter(this, void 0, void 0, function* () {
        var url = "http://localhost/sistemaexperto/api/regresivo/listRules.php";
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = yield response.json();
        return json;
    });
}
function listReglas() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield requestRulesAfirmation();
        var pregunta = "";
        //if (res[0].validacion) {
        response.map(function (res) {
            //var resConclusion:string = "\""+res.conclusion+"\"";
            pregunta = pregunta + "<button class=\"btn btn-secondary\" type=\"button\" onClick=\"requestAllAntece(" + res.id_regla + "," + true + ")\">" + res.conclusion + "</button><br><br>";
        });
        /*}else{
            var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
        }*/
        var datos = document.querySelector("#reglas");
        datos.innerHTML = pregunta;
    });
}
//# sourceMappingURL=Regresivo.js.map