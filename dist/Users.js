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
/*
*   Funcion que realiza peticion POST
*   y realizar el login de los usuarios
*/
function loginUser() {
    return __awaiter(this, void 0, void 0, function* () {
        var correo = document.querySelector("#correo_us").value.toString();
        var passw = document.querySelector("#pass_us").value.toString();
        var url = "http://localhost/sistemaexperto/api/users/login.php";
        var data = {
            usuario: correo,
            pass: passw
        };
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = yield response.json();
        localStorage.setItem("user", JSON.stringify(json[0]));
        if (json[0].Validacion) {
            if (json[0].tipo === "Experto") {
                window.location.href = "http://localhost/sistemaexperto/usuario_experto.html";
            }
            else {
                window.location.href = "http://localhost/sistemaexperto/usuario_no_experto.html";
            }
        }
    });
}
/*
*   Funcion que realiza peticion POST
*   y realizar el registro de usuarios
*/
function registerUser() {
    return __awaiter(this, void 0, void 0, function* () {
        var nombres_us = document.querySelector("#nombres_reg").value.toString();
        var correo_us = document.querySelector("#email_reg").value.toString();
        var pass_us = document.querySelector("#pass_reg").value.toString();
        var select = document.querySelector("#select_reg");
        var tipo_us = select.value;
        var url = "http://localhost/sistemaexperto/api/users/register.php";
        var data = {
            usuario: nombres_us,
            correo: correo_us,
            pass: pass_us,
            tipo: tipo_us
        };
        const response = yield fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = yield response.json();
        if (json[0].Validacion) {
            if (tipo_us === "Experto") {
                window.location.href = "http://localhost/sistemaexperto/usuario_experto.html";
            }
            else {
                window.location.href = "http://localhost/sistemaexperto/usuario_no_experto.html";
            }
        }
    });
}
function getUserLocal() {
    var user = localStorage.getItem("id");
    console.log(user);
}
//# sourceMappingURL=Users.js.map