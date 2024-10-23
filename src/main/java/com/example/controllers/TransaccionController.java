package com.example.controllers;

import java.util.List;
import java.util.Optional;

import com.example.models.Transaccion;
import com.example.services.TransaccionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransaccionController {

    @Autowired
    private TransaccionService transaccionServicio;

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

}

