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
function requestFirstRule() {
    return __awaiter(this, void 0, void 0, function* () {
        var url = "http://localhost/sistemaexperto/api/progresivo/getFirstRule.php";
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
function requestRules(id_regla, id_ant, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var url = "http://localhost/sistemaexperto/api/progresivo/getRule.php";
        var data = {
            id_regla: id_regla.toString(),
            id_antecedente: id_ant.toString(),
            respuesta: res.toString()
        };
        console.log(JSON.stringify(data));
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
function requestAllRules(id_r, id_a, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield requestRules(id_r, id_a, res);
        insertTemporal(res);
        if (response[0].validacion) {
            var pregunta = "<p class=\"alert alert-warning text-center\">¿" + response[0].antecedente + "?</p>" +
                "<div class=\"col text-center\">" +
                "<button class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"requestAllRules(" + response[0].id_regla_sig + "," + response[0].id_antecedente_sig + "," + true + ")\">Si</button>" +
                "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"requestAllRules(" + response[0].id_regla_sig + "," + response[0].id_antecedente_sig + "," + false + ")\">No</button>" +
                "</div>";
            localStorage.setItem("pregunta", JSON.stringify(response[0]));
        }
        else {
            var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
        }
        var datos = document.querySelector("#pregunta");
        datos.innerHTML = pregunta;
    });
}
function firstQuestion() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield requestFirstRule();
        localStorage.setItem("pregunta", JSON.stringify(res[0]));
        if (res[0].validacion) {
            var pregunta = "<p class=\"alert alert-warning text-center\">¿" + res[0].antecedente + "?</p>" +
                "<div class=\"col text-center\">" +
                "<button class=\"btn btn-success btn-lg\" type=\"button\" onClick=\"requestAllRules(" + res[0].id_regla_sig + "," + res[0].id_antecedente_sig + "," + true + ")\">Si</button>" +
                "<button class=\"btn btn-danger btn-lg\" type=\"button\" onClick=\"requestAllRules(" + res[0].id_regla_sig + "," + res[0].id_antecedente_sig + "," + false + ")\">No</button>" +
                "</div>";
        }
        else {
            var pregunta = "<p class=\"alert alert-warning text-center\">PROBLEMAS EN LA COMUNICACION CON LA API</p>";
        }
        var datos = document.querySelector("#pregunta");
        datos.innerHTML = pregunta;
    });
}
function insertTemporal(res) {
    return __awaiter(this, void 0, void 0, function* () {
        var datos = document.querySelector("#datos_us");
        var pr = JSON.parse(localStorage.getItem("pregunta"));
        var user = JSON.parse(localStorage.getItem("user"));
        var data = {
            id_usuario: user.id_us,
            pregunta: pr.antecedente,
            conclusion: String(res)
        };
        var url = "http://localhost/sistemaexperto/api/progresivo/insertTemporal.php";
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    });
}
//# sourceMappingURL=Progesivo.js.map