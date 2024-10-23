// Función para cargar todas las transacciones
function loadTransactions() {
    let request = sendRequest('transacciones', 'GET', '');
    let transactionsResult = document.getElementById('transactionsResult');
    transactionsResult.innerHTML = ""; // Limpiar resultados previos

    request.onload = function() {
        let data = request.response;
        console.log(data);
        data.forEach(transaction => {
            transactionsResult.innerHTML += `
                <div class="transaction">
                    <h3>Transacción ID: ${transaction.transaccionId}</h3>
                    <p><strong>Monto:</strong> ${transaction.monto}</p>
                    <p><strong>Cuenta Origen:</strong> ${transaction.cuenta_origen_id ? transaction.cuenta_origen_id.cuenta_id : 'N/A'}</p>
                    <p><strong>Cuenta Destino:</strong> ${transaction.cuenta_destino_id ? transaction.cuenta_destino_id.cuenta_id : 'N/A'}</p>
                    <p><strong>Tipo:</strong> ${transaction.tipoTransaccion || 'N/A'}</p>
                    <p><strong>Estado:</strong> ${transaction.estado ? 'Completada' : 'Pendiente'}</p>
                    <p><strong>Descripción:</strong> ${transaction.descripcion || 'N/A'}</p>
                    <p><strong>Fecha:</strong> ${new Date(transaction.fechaTransaccion).toLocaleString() || 'N/A'}</p>
                    <hr>
                </div>
            `;
        });
    };

    request.onerror = function() {
        transactionsResult.innerHTML = `
            <div class="error">Error al recuperar las transacciones.</div>
        `;
    };
}

// Función para crear una nueva transacción
function saveTransaction() {
    alert("yes");
    console.log("gol");

    const monto = parseFloat(document.getElementById('monto').value);
    const cuentaOrigenId = parseInt(document.getElementById('cuentaOrigen').value);
    const cuentaDestinoId = parseInt(document.getElementById('cuentaDestino').value);
    const descripcion = document.getElementById('Descripcion').value;

    console.log("Valores capturados:", { monto, cuentaOrigenId, cuentaDestinoId, descripcion });

    if (isNaN(monto) || monto <= 0) {
        alert('Por favor, ingrese un monto válido');
        return;
    }

    let data = {
        cuenta_origen_id: { cuenta_id: cuentaOrigenId },
        cuenta_destino_id: { cuenta_id: cuentaDestinoId },
        monto: monto,
        fechaTransaccion: new Date().toISOString(),
        descripcion: descripcion,
        estado: true
    };

    console.log("Datos que se enviarán:", JSON.stringify(data));
    alert("Datos a enviar: " + JSON.stringify(data));

    sendRequest('transacciones/crear', 'POST', data)
        .then(response => {
            alert('Transacción creada con éxito');
            document.getElementById('createTransactionForm').reset();
            loadTransactions();
        })
        .catch(error => {
            alert('Error al crear la transacción: ' + error.message);
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadTransactions();
});
