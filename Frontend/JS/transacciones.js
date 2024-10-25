
function loadTransactions() {
    let request = sendRequest('transacciones', 'GET', '');
    let transactionsResult = document.getElementById('transactionsResult');
    transactionsResult.innerHTML = "";

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
        <button type="button" onclick="editTransaction(${transaction.transaccionId}, ${transaction.monto},'${transaction.descripcion}', ${transaction.cuentaOrigen ? transaction.cuentaOrigen.cuenta_id : 'N/A'}, ${transaction.cuentaDestino ? transaction.cuentaDestino.cuenta_id : 'N/A'})">Editar</button>
        <button type="button" class="delete" onclick="deleteTransaction(${transaction.transaccionId})">Eliminar</button>
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

function editTransaction(transaccionId, monto, descripcion, cuentaOrigenId, cuentaDestinoId) {
    const transactionDiv = document.getElementById(`transaction-${transaccionId}`);

    if (!transactionDiv) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "No se encontro la transacción",
            showConfirmButton: false,
            timer: 1800
        });
        return;
    }

    // Asigna los valores al formulario de edición
    document.getElementById('editTransaccionId').value = transaccionId;
    document.getElementById('editMonto').value = monto;
    document.getElementById('editDescripcion').value = descripcion;

    // Aquí también mantenemos las cuentas
    document.getElementById('editCuentaOrigen').value = cuentaOrigenId;
    document.getElementById('editCuentaDestino').value = cuentaDestinoId;

    // Muestra el contenedor del formulario de edición
    document.getElementById('editTransactionContainer').style.display = 'block';
}

function submitEditTransaction(event) {
    event.preventDefault();

    const transaccionId = document.getElementById('editTransaccionId').value;
    const nuevoMonto = parseFloat(document.getElementById('editMonto').value);
    const nuevaDescripcion = document.getElementById('editDescripcion').value;
    const cuentaOrigenId = document.getElementById('editCuentaOrigen').value;
    const cuentaDestinoId = document.getElementById('editCuentaDestino').value;

    if (isNaN(nuevoMonto) || nuevoMonto <= 0) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Ingrese un Monto Valido",
            showConfirmButton: false,
            timer: 1800
        });
        return;
    }

    const data = {
        cuentaOrigen: { cuenta_id: cuentaOrigenId }, // Mantén la cuenta de origen
        cuentaDestino: { cuenta_id: cuentaDestinoId }, // Mantén la cuenta de destino
        monto: nuevoMonto,
        descripcion: nuevaDescripcion,
        estado: true // Puedes ajustar esto según lo que necesites
    };

    let request = sendRequest(`transacciones/actualizar/${transaccionId}`, 'PUT', data)
    request.onload=function (){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Transacción Actualizada",
            showConfirmButton: false,
            timer: 1800
        });
        loadTransactions(); // Recargar las transacciones
        document.getElementById('editTransactionContainer').style.display = 'none';
    }
    request.onerror = function(){
        Swal.fire({
            position: "center",
            icon: "error",
            title: "No se pudo Actualizar La transacción",
            showConfirmButton: false,
            timer: 1800
        });
    }
}



// Función para eliminar una transacción
function deleteTransaction(transaccionId) {
    Swal.fire({
        title: "Quieres eliminar la transacción?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let request = sendRequest(`transacciones/eliminar/${transaccionId}`, 'DELETE', '')
            request.onload=function (){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Transacción Eliminada",
                    showConfirmButton: false,
                    timer: 1800
                });
                loadTransactions(); // Recargar las transacciones
                document.getElementById('editTransactionContainer').style.display = 'none';
            }
            request.onerror = function(){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No se pudo eliminar La transacción",
                    showConfirmButton: false,
                    timer: 1800
                });
            }
        } else if (result.isDenied) {
            Swal.fire("No se elimino la transacción", "", "info");
        }
    });

}

// Función para crear una nueva transacción
function saveTransaction() {


    const monto = parseFloat(document.getElementById('monto').value);
    const cuentaOrigenId = parseInt(document.getElementById('cuentaOrigen').value);
    const cuentaDestinoId = parseInt(document.getElementById('cuentaDestino').value);
    const descripcion = document.getElementById('Descripcion').value;

    console.log("Valores capturados:", { monto, cuentaOrigenId, cuentaDestinoId, descripcion });

    if (isNaN(monto) || monto <= 0) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Ingrese un Monto Valido",
            showConfirmButton: false,
            timer: 1800
        });
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

    let request = sendRequest('transacciones/crear', 'POST', data)
    request.onload=function (){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Transacción Creada",
                    showConfirmButton: false,
                    timer: 1800
                });
                document.getElementById('createTransactionForm').reset();
                loadTransactions();
            }
            request.onerror = function(){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No se pudo crear La transacción",
                    showConfirmButton: false,
                    timer: 1800
                });
            }
}

document.addEventListener('DOMContentLoaded', function() {
    loadTransactions();
});
