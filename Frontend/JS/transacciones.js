// Función para cargar todas las transacciones
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
    <div class="transaction" id="transaction-${transaction.transaccionId}" data-cuenta-origen-id="${transaction.cuentaOrigen ? transaction.cuentaOrigen.cuenta_id : ''}" data-cuenta-destino-id="${transaction.cuentaDestino ? transaction.cuentaDestino.cuenta_id : ''}">
        <h3>Transacción ID: ${transaction.transaccionId}</h3>
        <p><strong>Monto:</strong> ${transaction.monto}</p>
        <p><strong>Cuenta Origen:</strong> ${transaction.cuentaOrigen ? transaction.cuentaOrigen.cuenta_id : 'N/A'}</p>
        <p><strong>Cuenta Destino:</strong> ${transaction.cuentaDestino ? transaction.cuentaDestino.cuenta_id : 'N/A'}</p>
        <p><strong>Estado:</strong> ${transaction.estado ? 'Completada' : 'Pendiente'}</p>
        <p><strong>Descripción:</strong> ${transaction.descripcion || 'N/A'}</p>
        <p><strong>Fecha:</strong> ${new Date(transaction.fechaTransaccion).toLocaleString() || 'N/A'}</p>
        <button onclick="editTransaction(${transaction.transaccionId}, ${transaction.monto}, '${transaction.descripcion}')">Editar</button>
        <button class="delete" onclick="deleteTransaction(${transaction.transaccionId})">Eliminar</button>
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

function editTransaction(transaccionId, monto, descripcion) {
    const transactionDiv = document.getElementById(`transaction-${transaccionId}`);

    if (!transactionDiv) {
        console.error(`No se encontró la transacción con ID: ${transaccionId}`);
        return; // Salir de la función si no se encontró la transacción
    }

    // Mostrar el formulario de edición
    document.getElementById('editTransaccionId').value = transaccionId;
    document.getElementById('editMonto').value = monto;
    document.getElementById('editDescripcion').value = descripcion;

    // Mostrar el contenedor del formulario de edición
    document.getElementById('editTransactionContainer').style.display = 'block';
}

function submitEditTransaction(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const transaccionId = document.getElementById('editTransaccionId').value;
    const nuevoMonto = parseFloat(document.getElementById('editMonto').value);
    const nuevaDescripcion = document.getElementById('editDescripcion').value;

    if (isNaN(nuevoMonto) || nuevoMonto <= 0) {
        alert('Por favor, ingrese un monto válido');
        return;
    }

    const data = {
        monto: nuevoMonto,
        descripcion: nuevaDescripcion,
        estado: true,
        // Asegúrate de agregar cualquier otro dato necesario aquí
    };

    // Llama a la función para guardar la transacción actualizada
    sendRequest(`transacciones/actualizar/${transaccionId}`, 'PUT', data).then(response => {
            alert('Transacción actualizada con éxito');
            loadTransactions(); // Recargar las transacciones para ver los cambios
            document.getElementById('editTransactionContainer').style.display = 'none'; // Ocultar el formulario de edición
        })
        .catch(error => {
            alert('Error al actualizar la transacción: ' + error.message);
            console.error(error);
        });
    alert('Transacción actualizada con éxito');
    loadTransactions(); // Recargar las transacciones para ver los cambios
    document.getElementById('editTransactionContainer').style.display = 'none'; // Ocultar el formulario de edición
}


// Función para eliminar una transacción
function deleteTransaction(transaccionId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
        sendRequest(`transacciones/eliminar/${transaccionId}`, 'DELETE', '')
            .then(response => {
                alert('Transacción eliminada con éxito');
                loadTransactions(); // Recargar las transacciones para reflejar el cambio
            })
            .catch(error => {
                alert('Error al eliminar la transacción: ' + error.message);
                console.error(error);
            });
        loadTransactions();
    }
}

// Función para crear una nueva transacción
function saveTransaction() {


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
        cuentaOrigen: { cuenta_id: cuentaOrigenId },
        cuentaDestino: { cuenta_id: cuentaDestinoId },
        monto: monto,
        fechaTransaccion: new Date().toISOString(),
        descripcion: descripcion,
        estado: true
    };

    //console.log("Datos que se enviarán:", JSON.stringify(data));
    //alert("Datos a enviar: " + JSON.stringify(data));

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
