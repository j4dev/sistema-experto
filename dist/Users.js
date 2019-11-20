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
        console.log("hola");
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
        console.log(response);
        if (json.tipo === "Experto") {
            window.location.href = "http://localhost/sistemaexperto/usuario_experto.html";
        }
        else {
            window.location.href = "http://localhost/sistemaexperto/usuario_no_experto.html";
        }
    });
}
/*
*   Funcion que realiza peticion POST
*   y realizar el registro de usuarios
*/
function registerUser() {
    return __awaiter(this, void 0, void 0, function* () {
        var nombres = document.querySelector("#nombres_reg").value.toString();
        var correo = document.querySelector("#email_reg").value.toString();
        var passw = document.querySelector("#pass_reg").value.toString();
        var select = document.querySelector("#select_reg");
        var tipo = select.value;
        /*var url = "http://localhost/sistemaexperto/api/users/login.php";
        var data = {
            usuario:correo,
            pass: passw
        };
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = await response.json();
        console.log(response);
        
        if (json.tipo === "Experto") {
            window.location.href = "http://localhost/sistemaexperto/usuario_experto.html";
        } else {
            window.location.href = "http://localhost/sistemaexperto/usuario_no_experto.html";
        }*/
    });
}
//# sourceMappingURL=Users.js.map