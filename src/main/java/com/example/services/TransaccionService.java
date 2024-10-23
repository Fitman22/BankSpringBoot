package com.example.services;

import java.util.List;
import java.util.Optional;

import com.example.models.CuentaBancaria;
import com.example.models.Transaccion;
import com.example.repository.TransaccionRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransaccionService {

    @Autowired
    private TransaccionRepositorio transaccionRepositorio;
    @Autowired
    private com.example.repository.cuentaBancariaRepositorio cuentaBancariaRepositorio;

    // Obtener todas las transacciones
    public List<Transaccion> getTransacciones() {
        return transaccionRepositorio.findAll();
    }

    // Obtener una transacción por ID
    public Transaccion getTransaccionById(Long id) {
        Transaccion transaccion = null;
        transaccion = transaccionRepositorio.findById(id).orElse(null);
        if (transaccion == null) {
            return null;
        }
        return transaccion;
    }
    // Crear una nueva transacción
    public Transaccion crearTransaccion(Transaccion transaccion) {
        // Establecer la fecha actual si no se ha proporcionado
        CuentaBancaria cuentaOrigen = cuentaBancariaRepositorio.findById(transaccion.getCuentaOrigen().getCuenta_id()).orElse(null);
        CuentaBancaria cuentaDestino = cuentaBancariaRepositorio.findById(transaccion.getCuentaDestino().getCuenta_id()).orElse(null);
        if (transaccion.getFechaTransaccion() == null) {
            transaccion.setFechaTransaccion(new java.sql.Timestamp(System.currentTimeMillis()));
        }
        Transaccion transaccion2 = new Transaccion();
        transaccion2.setCuentaOrigen(cuentaOrigen);
        transaccion2.setCuentaDestino(cuentaDestino);
        transaccion2.setMonto(transaccion.getMonto());
        transaccion2.setFechaTransaccion(transaccion.getFechaTransaccion());
        transaccion2.setDescripcion(transaccion.getDescripcion());
        transaccion2.setEstado(transaccion.getEstado());

        return transaccionRepositorio.save(transaccion2);
    }

    // Actualizar una transacción
    public Transaccion actualizarTransaccion(Long id, Transaccion nuevaTransaccion) {
        Optional<Transaccion> transaccionExistente = transaccionRepositorio.findById(id);
        if (transaccionExistente.isPresent()) {
            Transaccion transaccion = transaccionExistente.get();
            // Actualiza los campos de la transacción existente
            transaccion.setMonto(nuevaTransaccion.getMonto());
            transaccion.setDescripcion(nuevaTransaccion.getDescripcion());
            transaccion.setEstado(nuevaTransaccion.getEstado());
            // Asegúrate de que las cuentas también estén actualizadas
            transaccion.setCuentaOrigen(nuevaTransaccion.getCuentaOrigen());
            transaccion.setCuentaDestino(nuevaTransaccion.getCuentaDestino());
            return transaccionRepositorio.save(transaccion);
        }
        return null;
    }

    // Eliminar una transacción por ID
    public boolean eliminarTransaccion(Long id) {
        if (transaccionRepositorio.existsById(id)) {
            transaccionRepositorio.deleteById(id);
            return true;
        }
        return false;
    }
}
