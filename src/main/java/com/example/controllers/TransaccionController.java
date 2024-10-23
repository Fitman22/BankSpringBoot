package com.example.controllers;

import java.util.List;
import java.util.Optional;

import com.example.models.Transaccion;
import com.example.services.TransaccionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:63342")
public class TransaccionController {

    @Autowired
    private TransaccionService transaccionServicio;
    @Autowired
    private TransaccionService transaccionService;

    // Obtener todas las transacciones
    @GetMapping("/transacciones")
    public List<Transaccion> listarTransacciones() {
        return transaccionServicio.getTransacciones();
    }

    // Obtener una transacción por ID
    @GetMapping("/transacciones/{id}")
    public Transaccion obtenerTransaccion(@PathVariable Long id) {
        return transaccionServicio.getTransaccionById(id);
    }

    // Crear una nueva transacción
    @PostMapping("/transacciones/crear")
    public ResponseEntity<Transaccion> crearTransaccion(@RequestBody Transaccion transaccion) {
        Transaccion nuevaTransaccion = transaccionServicio.crearTransaccion(transaccion);
        return ResponseEntity.ok(nuevaTransaccion);
    }
    @PutMapping("/transacciones/actualizar/{id}")
    public ResponseEntity<Transaccion> actualizarTransaccion(
            @PathVariable Long id,
            @RequestBody Transaccion nuevaTransaccion) {
        Transaccion transaccionActualizada = transaccionServicio.actualizarTransaccion(id, nuevaTransaccion);
        if (transaccionActualizada != null) {
            return ResponseEntity.ok(transaccionActualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/transacciones/eliminar/{id}")
    public ResponseEntity<Void> eliminarTransaccion(@PathVariable Long id) {
        boolean eliminada = transaccionServicio.eliminarTransaccion(id);
        if (eliminada) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}

