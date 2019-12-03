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
function requestAllAntece() {
    return __awaiter(this, void 0, void 0, function* () {
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
        localStorage.setItem("pregunta", JSON.stringify(response[0]));
        //if (res[0].validacion) {
        response.map(function (res) {
            pregunta = pregunta + "<button class=\"btn btn-info btn-lg\" type=\"button\" onClick=\"requestAllAntece(" + res.id_regla + "," + true + ")\">" + res.conclusion + "</button><br><br>";
        });
        /*}else{
            var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
        }*/
        var datos = document.querySelector("#reglas");
        datos.innerHTML = pregunta;
    });
}
//# sourceMappingURL=Regresivo.js.map