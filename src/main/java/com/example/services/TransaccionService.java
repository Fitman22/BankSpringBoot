package com.example.services;

import java.util.List;
import java.util.Optional;

import com.example.models.Transaccion;
import com.example.repository.TransaccionRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransaccionService {

    @Autowired
    private TransaccionRepositorio transaccionRepositorio;

    // Obtener todas las transacciones
    public List<Transaccion> getTransacciones() {
        return transaccionRepositorio.findAll();
    }

    // Obtener una transacción por ID
    public Optional<Transaccion> getTransaccionById(Long id) {
        return transaccionRepositorio.findById(id);
}
    // Crear una nueva transacción
    public Transaccion crearTransaccion(Transaccion transaccion) {
        // Establecer la fecha actual si no se ha proporcionado
        if (transaccion.getFechaTransaccion() == null) {
            transaccion.setFechaTransaccion(new java.sql.Timestamp(System.currentTimeMillis()));
        }
        return transaccionRepositorio.save(transaccion);
    }

    // Actualizar una transacción
    public Transaccion actualizarTransaccion(Long id, Transaccion nuevaTransaccion) {
        Optional<Transaccion> transaccionExistente = transaccionRepositorio.findById(id);
        if (transaccionExistente.isPresent()) {
            Transaccion transaccion = transaccionExistente.get();
            transaccion.setCuentaOrigen(nuevaTransaccion.getCuentaOrigen());
            transaccion.setCuentaDestino(nuevaTransaccion.getCuentaDestino());
            transaccion.setTipoTransaccion(nuevaTransaccion.getTipoTransaccion());
            transaccion.setMonto(nuevaTransaccion.getMonto());
            transaccion.setDescripcion(nuevaTransaccion.getDescripcion());
            transaccion.setEstado(nuevaTransaccion.getEstado());
            transaccion.setFechaTransaccion(nuevaTransaccion.getFechaTransaccion());
            return transaccionRepositorio.save(transaccion);
        }
        return null;
    }

    // Eliminar una transacción por ID
    public void eliminarTransaccion(Long id) {
        transaccionRepositorio.deleteById(id);
    }
}
