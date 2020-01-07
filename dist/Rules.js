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
function deleteChild() {
    let hipotesis = document.querySelector("#hu");
    var listado = document.body.querySelector("#updateante");
    hipotesis.innerHTML = "";
    listado.innerHTML = "";
}
/**
 * Agrear un input al modal de ingreso de reglas
 */
var id_hipotesis = "";
var inputTotal = 1;
var inputUp = [];
function addInputU(value, idI) {
    idI = "#i" + idI;
    let antece = document.querySelector("#updateante");
    let input = document.createElement("INPUT");
    input.setAttribute("class", "form-control col-8");
    input.setAttribute("id", idI);
    input.setAttribute("style", "text-transform:uppercase;");
    input.setAttribute("value", value);
    antece.appendChild(input);
    let inputP = document.createElement("INPUT");
    inputP.setAttribute("type", "number");
    inputP.setAttribute("class", "form-control col-2");
    inputP.setAttribute("style", "text-transform:uppercase; margin-left: 20px;");
    inputP.setAttribute("placeholder", "%");
    antece.appendChild(inputP);
}
function addInput(value) {
    inputTotal = inputTotal + 1;
    var id = "i" + inputTotal.toString();
    let antece = document.querySelector("#antecedentes");
    let input = document.createElement("INPUT");
    input.setAttribute("class", "form-control col-8");
    input.setAttribute("id", id);
    input.setAttribute("style", "text-transform:uppercase;");
    input.setAttribute("value", value);
    antece.appendChild(input);
    var idp = "p" + inputTotal.toString();
    let inputP = document.createElement("INPUT");
    inputP.setAttribute("type", "number");
    inputP.setAttribute("class", "form-control col-2");
    inputP.setAttribute("id", idp);
    inputP.setAttribute("style", "text-transform:uppercase; margin-left: 20px;");
    inputP.setAttribute("placeholder", "%");
    inputP.setAttribute("value", value);
    antece.appendChild(inputP);
}
/**
 * Funcion que permite agregar una nueva regla con multiples antecedentes
 */
function addRule() {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Obtencion de los antecedentes de los input
         */
        var antecedentes = [];
        var vecporcentaje = [];
        var id = "";
        var idp = "";
        for (let i = 1; i <= inputTotal; i++) {
            idp = "#p" + i.toString();
            id = "#i" + i.toString();
            var porcentaje = document.querySelector(idp).value.toString();
            var dato = document.querySelector(id).value.toString();
            antecedentes.push(dato);
            vecporcentaje.push(porcentaje);
        }
        /**
         * Obtencion de la hipotesis.
         */
        var hipotesis = document.querySelector("#hipotesis").value.toString();
        var pHipotesis = document.querySelector("#pHipotesis").value.toString();
        /**
         * Obtener usuarios del local Storage
         */
        var user = JSON.parse(localStorage.getItem("user"));
        var data = {
            usuario: user.id_us,
            hipotesis: hipotesis,
            vec_antecedentes: antecedentes,
            ant_porcentaje: vecporcentaje,
            re_porcentaje: pHipotesis
        };
        console.log(JSON.stringify(data));
        var url = "http://localhost/sistemaexperto/api/rules/insertRules.php";
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = yield response.json();
        document.querySelector("#i1").value = "";
        document.querySelector("#hipotesis").value = "";
        listRules();
    });
}
/**
 * Peticion POST que obtiene todas las reglas de
 * un solo usuario
 */
function getAllRules() {
    return __awaiter(this, void 0, void 0, function* () {
        var user = JSON.parse(localStorage.getItem("user"));
        var url = "http://localhost/sistemaexperto/api/rules/searchRules.php";
        var data = {
            usuario: user.id_us
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
/**
 * Funcion que crea los elementos HTML para listar las reglas en un tabla
 */
function listRules() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield getAllRules();
        var antecedente = "";
        var pantecedente = "";
        var rule = "";
        res.reglas.map(function (rules) {
            rules.antecedentes.map(function (ante) {
                antecedente = antecedente + "<li>" + ante.antecedente + "</li>";
                pantecedente = pantecedente + "<li>" + ante.ant_porcentaje + "</li>";
            });
            rule = rule + "<tr>" +
                "<th scope=\"row\">" + rules.id_regla + "</th>" +
                "<td>" + rules.conclusion + "</td>" +
                "<td>" + "" + "</td>" +
                "<td>" + antecedente +
                "</td>" +
                "<td>" + pantecedente +
                "</td>" +
                "<td class=\"text-center\"><button type=\"button\" class=\"zmdi zmdi-edit zmdi-hc-2x\" data-toggle=\"modal\" data-target=\"#ModalUpdate\" onClick=\"modalEdit(" + rules.id_regla + ")\"></button></td>" +
                "<td class=\"text-center\"><i class=\"zmdi zmdi-delete zmdi-hc-2x\"  onClick=\"deleteRule(" + rules.id_regla + ")\"></i></td>" +
                "</tr>";
            antecedente = "";
            pantecedente = "";
        });
        var listado = document.body.querySelector("#list_reglas");
        listado.innerHTML = rule;
    });
}
/**
 *
 * @param id_regla
 *Funcion que borra una regla en base a su id
 */
function deleteRule(id_regla) {
    return __awaiter(this, void 0, void 0, function* () {
        var url = "http://localhost/sistemaexperto/api/rules/deleteRules.php";
        var data = {
            regla: id_regla
        };
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = yield response.json();
        listRules();
    });
}
/**
 *Funcion para hacer una peticion con el id de la regla
 *
 * @param {string} id_regla
 */
function editRule() {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Obtencion de los antecedentes de los input
         */
        var antecedentes = [];
        var idI = "";
        inputUp.map(function (id) {
            idI = "#i" + id.toString();
            var dato = document.getElementById(idI).value.toString();
            antecedentes.push(dato);
        });
        var hipotesis = document.getElementById(id_hipotesis).value.toString();
        var data = {
            id_regla_mod: id_hipotesis,
            hipotesis: hipotesis,
            vec_antecedentes: antecedentes
        };
        var url = "http://localhost/sistemaexperto/api/rules/updateRules.php";
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = yield response.json();
        listRules();
    });
}
/**
 *
 *
 * @param {*} json
 *Funcion para mostrar el model donde se editaran los datos de la regla
 */
function modalEdit(id_regla) {
    return __awaiter(this, void 0, void 0, function* () {
        deleteChild();
        inputUp = [];
        var url = "http://localhost/sistemaexperto/api/rules/infoRule.php";
        var data = {
            id_regla
        };
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = yield response.json();
        json.reglas.map(function (ante) {
            addInputU(ante.antecedente, ante.id_antec);
            inputUp.push(ante.id_antec);
        });
        id_hipotesis = json.id_regla;
        let hipotesis = document.querySelector("#hu");
        let input = document.createElement("INPUT");
        input.setAttribute("class", "form-control col-8");
        input.setAttribute("id", json.id_regla);
        input.setAttribute("style", "text-transform:uppercase;");
        input.setAttribute("value", json.conclusion);
        hipotesis.appendChild(input);
        let inputP = document.createElement("INPUT");
        inputP.setAttribute("class", "form-control col-2");
        inputP.setAttribute("style", "text-transform:uppercase; margin-left: 20px;");
        inputP.setAttribute("placeholder", "%");
        hipotesis.appendChild(inputP);
    });
}
//# sourceMappingURL=Rules.js.map