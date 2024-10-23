// Función para cargar todas las cuentas bancarias
function loadCuentas() {
    let request = sendRequest('cuentas/all', 'GET', null);
    let cuentasResult = document.getElementById('cuentasResult');
    cuentasResult.innerHTML = ""; // Limpiar resultados previos

    request.onload = function() {
        let data = request.response;
        console.log(data);
        data.forEach(cuenta => {
            cuentasResult.innerHTML += `
                <div class="cuenta">
                    <h3>Cuenta ID: ${cuenta.cuenta_id}</h3>
                    <p><strong>Número de Cuenta:</strong> ${cuenta.numero_cuenta}</p>
                    <p><strong>Estado de la Cuenta:</strong> ${cuenta.estado_cuenta ? 'Activa' : 'Inactiva'}</p>
                    <p><strong>Fecha de Apertura:</strong> ${new Date(cuenta.fecha_apertura).toLocaleString()}</p>
                    <p><strong>Tipo de Cuenta:</strong> ${cuenta.tipo_cuenta.nombre_tipo}</p>
                    <p><strong>Usuario:</strong> ${cuenta.usuario_id.nombre_usuario}</p>
                    <hr>
                </div>
            `;
        });
    };

    request.onerror = function() {
        cuentasResult.innerHTML = `
            <div class="error">Error al recuperar las cuentas bancarias.</div>
        `;
    };
}

// Función para crear una nueva cuenta bancaria
function saveCuenta() {
    const numero_cuenta = document.getElementById('numeroCuenta').value;
    const estado_cuenta = document.getElementById('estadoCuenta').checked;
    const usuario_id = parseInt(document.getElementById('usuarioId').value);
    const tipo_cuenta_id = parseInt(document.getElementById('tipoCuentaId').value);

    console.log("Valores capturados:", { numero_cuenta, estado_cuenta, usuario_id, tipo_cuenta_id });

    if (!numero_cuenta || isNaN(usuario_id) || isNaN(tipo_cuenta_id)) {
        alert('Por favor, ingrese todos los campos correctamente.');
        return;
    }

    let data = {
        numero_cuenta: numero_cuenta,
        estado_cuenta: estado_cuenta,
        usuario_id: { usuario_id: usuario_id },
        tipo_cuenta: { tipo_cuenta_id: tipo_cuenta_id },
        fecha_apertura: new Date().toISOString()  // Fecha actual
    };

    console.log("Datos que se enviarán:", JSON.stringify(data));

    let request = sendRequest('cuentas/crear', 'POST', data);

    request.onload = function() {
        alert('Cuenta creada con éxito');
        document.getElementById('createCuentaForm').reset(); // Limpiar el formulario
        loadCuentas(); // Recargar las cuentas
    };

    request.onerror = function() {
        alert('Error al crear la cuenta.');
    };
}

document.addEventListener('DOMContentLoaded', function() {
    loadCuentas(); // Cargar las cuentas cuando la página esté lista
});
