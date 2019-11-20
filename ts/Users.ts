
/*
*   Funcion que realiza peticion POST
*   y realizar el login de los usuarios
*/
async function loginUser() {
    
    var correo = document.querySelector<HTMLInputElement>("#correo_us").value.toString();
    var passw = document.querySelector<HTMLInputElement>("#pass_us").value.toString();

    var url = "http://localhost/sistemaexperto/api/users/login.php";

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

    localStorage.setItem("user", JSON.stringify(json[0]));

    if (json[0].Validacion) {
        if (json[0].tipo === "Experto") {
            window.location.href = "http://localhost/sistemaexperto/usuario_experto.html";
        } else {
            window.location.href = "http://localhost/sistemaexperto/usuario_no_experto.html";
        }
    }


}

/*
*   Funcion que realiza peticion POST
*   y realizar el registro de usuarios
*/
async function registerUser() {

    var nombres_us = document.querySelector<HTMLInputElement>("#nombres_reg").value.toString();
    var correo_us = document.querySelector<HTMLInputElement>("#email_reg").value.toString();
    var pass_us = document.querySelector<HTMLInputElement>("#pass_reg").value.toString();
    var select = document.querySelector<HTMLInputElement>("#select_reg");
    var tipo_us = select.value;

    var url = "http://localhost/sistemaexperto/api/users/register.php";

    var data = {
        usuario:nombres_us,
        correo:correo_us,
        pass: pass_us,
        tipo:tipo_us
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    
    if (json[0].Validacion) {

        if (tipo_us === "Experto") {
            window.location.href = "http://localhost/sistemaexperto/usuario_experto.html";
        } else {
            window.location.href = "http://localhost/sistemaexperto/usuario_no_experto.html";
        }
    }


}

function getUserLocal() {
    var user = localStorage.getItem("id");

    console.log(user);
}