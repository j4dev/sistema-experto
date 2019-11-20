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
    console.log(response);
    
    if (json.tipo === "Experto") {
        window.location.href = "http://localhost/sistemaexperto/usuario_experto.html";
    } else {
        window.location.href = "http://localhost/sistemaexperto/usuario_no_experto.html";
    }

}
