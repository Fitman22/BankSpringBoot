
    const apiUrl = 'http://localhost:8094/api/transacciones';
    function obtenerTransacciones() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(transacciones => {
            let tablaCuerpo = document.getElementById('transaction-table-body');
            tablaCuerpo.innerHTML = '';  // Limpiar la tabla antes de llenarla
            transacciones.forEach(transaccion => {
                let fila = `<tr>
                                    <td>${transaccion.id}</td>
                                    <td>${transaccion.titulo}</td>
                                    <td>${transaccion.monto}</td>
                                    <td>${transaccion.tipo}</td>
                                    <td>${transaccion.fecha}</td>
                                </tr>`;
                tablaCuerpo.innerHTML += fila;
            });
        })
        .catch(error => console.error('Error al obtener transacciones:', error));
}

    // Función para registrar una nueva transacción (Crear transacción)
    document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario
    let titulo = document.getElementById('titulo').value;
    let monto = document.getElementById('monto').value;
    let tipo = document.getElementById('tipo').value;
    let fecha = document.getElementById('fecha').value;

    let nuevaTransaccion = {
    titulo: titulo,
    monto: parseFloat(monto),
    tipo: tipo,
    fecha: fecha
};

    fetch(apiUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify(nuevaTransaccion)
})
    .then(response => {
    if (response.ok) {
    alert('Transacción registrada con éxito');
    obtenerTransacciones();  // Refrescar la lista de transacciones
} else {
    alert('Error al registrar la transacción');
}
})
    .catch(error => console.error('Error al crear transacción:', error));
});

    // Cargar las transacciones al cargar la página
    document.addEventListener('DOMContentLoaded', obtenerTransacciones);