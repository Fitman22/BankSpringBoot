function validarLogin() {

    var nombreUsuario = document.getElementById('icon_user').value

    var password = document.getElementById('icon_pass').value

    console.log(nombreUsuario)
    console.log(password)

    let data = {'nombreUsuario': nombreUsuario, 'password': password}

    console.log(data)

    let request = sendRequest('api/Usuario/loginclient', 'POST', data)

    request.onload = function () {

        let data1 = request.response;

        console.log(datal);

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