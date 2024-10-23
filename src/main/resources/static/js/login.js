function validarLogin() {

    var nombreUsuario = document.getElementById('icon_user').value

    var password = document.getElementById('icon_pass').value

    console.log(nombreUsuario)
    console.log(password)

    let data = {"nombreUsuario": nombreUsuario, "password": password}

    console.log(data)
    console.log(typeof data)
    let request = sendRequest('api/Usuario/loginclient', 'POST', data)
    console.log(sendRequest('api/Usuario/loginclient', 'POST', data).response)
    request.onload = function () {

        let responseText = request.responseText; // Obtiene la respuesta como texto
        let data1 = parseInt(responseText, 10); // Convierte el texto en un entero
        console.log(data1);

        if (data1 == 1) {

            alert("Login Correcto");

            window.location = 'menu.html';

        } else {

            alert('Alerta:Usuario o Password incorrectos.')

            request.onerror = function () {

                alert("Error al recuperar los datos.");
            }
        }
    }
}