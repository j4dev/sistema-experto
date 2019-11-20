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
    });
}
function getAll() {
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
        console.log(json);
    });
}
//# sourceMappingURL=Rules.js.map