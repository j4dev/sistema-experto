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
        console.log(response);
        if (json.tipo === "Experto") {
            window.location.href = "http://localhost/sistemaexperto/usuario_experto.html";
        }
        else {
            window.location.href = "http://localhost/sistemaexperto/usuario_no_experto.html";
        }
    });
}
//# sourceMappingURL=Users.js.map