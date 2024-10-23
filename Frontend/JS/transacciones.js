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
    <div class="transaction" id="transaction-${transaction.transaccionId}">
        <h3>Transacción ID: ${transaction.transaccionId}</h3>
        <p><strong>Monto:</strong> ${transaction.monto}</p>
        <p><strong>Cuenta Origen:</strong> ${transaction.cuentaOrigen ? transaction.cuentaOrigen.cuenta_id : 'N/A'}</p>
        <p><strong>Cuenta Destino:</strong> ${transaction.cuentaDestino ? transaction.cuentaDestino.cuenta_id : 'N/A'}</p>
        <p><strong>Tipo:</strong> ${transaction.tipoTransaccion || 'N/A'}</p>
        <p><strong>Estado:</strong> ${transaction.estado ? 'Completada' : 'Pendiente'}</p>
        <p><strong>Descripción:</strong> ${transaction.descripcion || 'N/A'}</p>
        <p><strong>Fecha:</strong> ${new Date(transaction.fechaTransaccion).toLocaleString() || 'N/A'}</p>
        <button onclick="editTransaction(${transaction.transaccionId})">Editar</button>
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

// Función para editar una transacción
function editTransaction(transaccionId) {
    const transactionDiv = document.getElementById(`transaction-${transaccionId}`);

    // Obtener los datos actuales de la transacción
    const monto = parseFloat(transactionDiv.querySelector('strong:nth-of-type(1)').nextSibling.textContent);
    const descripcion = transactionDiv.querySelector('strong:nth-of-type(7)').nextSibling.textContent;

    // Mostrar un prompt para editar la transacción
    const nuevoMonto = prompt('Ingrese nuevo monto:', monto);
    const nuevaDescripcion = prompt('Ingrese nueva descripción:', descripcion);

    if (nuevoMonto !== null && nuevaDescripcion !== null) {
        const data = {
            transaccionId: transaccionId,
            monto: parseFloat(nuevoMonto),
            descripcion: nuevaDescripcion,
            estado: true // O puedes ajustar esto según sea necesario
        };

        // Llama a la función para guardar la transacción actualizada
        sendRequest(`transacciones/actualizar/${transaccionId}`, 'PUT', data)
            .then(response => {
                alert('Transacción actualizada con éxito');
                loadTransactions(); // Recargar las transacciones para ver los cambios
            })
            .catch(error => {
                alert('Error al actualizar la transacción: ' + error.message);
                console.error(error);
            });
    }
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
