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
/**
 * Agrear un input al modal de ingreso de reglas
 */
var inputTotal = 1;
function addInput() {
    inputTotal = inputTotal + 1;
    var id = "i" + inputTotal.toString();
    let antece = document.querySelector("#antecedentes");
    let input = document.createElement("INPUT");
    input.setAttribute("class", "form-control");
    input.setAttribute("id", id);
    input.setAttribute("style", "text-transform:uppercase;");
    antece.appendChild(input);
}
function addRule() {
    return __awaiter(this, void 0, void 0, function* () {
        var antecedentes = [];
        var id = "";
        for (let i = 1; i <= inputTotal; i++) {
            id = "#i" + i.toString();
            var dato = document.querySelector(id).value.toString();
            antecedentes.push(dato);
        }
        var hipotesis = document.querySelector("#hipotesis").value.toString();
        /**
         * Obtener usuarios del local Storage
         */
        var user = JSON.parse(localStorage.getItem("user"));
        var data = {
            usuario: user.id_us,
            hipotesis: hipotesis,
            vec_antecedentes: antecedentes
        };
        var url = "http://localhost/sistemaexperto/api/rules/insertRules.php";
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
function listRules() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield getAllRules();
        var antecedente = "";
        var rule = "";
        res.reglas.map(function (rules) {
            rules.antecedentes.map(function (ante) {
                antecedente = antecedente + "<li>" + ante.antecedente + "</li>";
            });
            rule = rule + "<tr>" +
                "<th scope=\"row\">" + rules.id_regla + "</th>" +
                "<td>" + rules.conclusion + "</td>" +
                "<td>" + antecedente +
                "</td>" +
                "<td class=\"text-center\"><i class=\"zmdi zmdi-edit zmdi-hc-2x\" onClick=\"editRule(" + rules.id_regla + ")\"></i></td>" +
                "<td class=\"text-center\"><i class=\"zmdi zmdi-delete zmdi-hc-2x\" onClick=\"deleteRule(" + rules.id_regla + ")\"></i></td>" +
                "</tr>";
            antecedente = "";
        });
        var listado = document.body.querySelector("#list_reglas");
        listado.innerHTML = rule;
    });
}
//# sourceMappingURL=Rules.js.map