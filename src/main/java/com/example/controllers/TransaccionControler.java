package com.example.controllers;

import com.example.models.Transaccion;
import com.example.services.TransaccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacciones")
public class TransaccionControler {

    @Autowired
    private TransaccionService transaccionService;

    // Método para realizar una transferencia (POST)
    @PostMapping("/transferir")
    public ResponseEntity<Transaccion> transferir(@RequestParam Long idCuentaOrigen,
                                                  @RequestParam Long idCuentaDestino,
                                                  @RequestParam Double monto) {
        Transaccion transaccion = transaccionService.realizarTransferencia(idCuentaOrigen, idCuentaDestino, monto);
        return ResponseEntity.ok(transaccion);
    }

    // Método para obtener todas las transacciones (GET)
    @GetMapping
    public ResponseEntity<List<Transaccion>> obtenerTodasTransacciones() {
        List<Transaccion> transacciones = transaccionService.obtenerTodasTransacciones();
        return ResponseEntity.ok(transacciones);
    }

    // Método para obtener una transacción por su ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Transaccion> obtenerTransaccionPorId(@PathVariable Long id) {
        Transaccion transaccion = transaccionService.obtenerTransaccionPorId(id);
        return ResponseEntity.ok(transaccion);
    }

    // Método para actualizar una transacción (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Transaccion> actualizarTransaccion(@PathVariable Long id,
                                                             @RequestBody Transaccion transaccionActualizada) {
        Transaccion transaccion = transaccionService.actualizarTransaccion(id, transaccionActualizada);
        return ResponseEntity.ok(transaccion);
    }

    // Método para eliminar una transacción (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTransaccion(@PathVariable Long id) {
        transaccionService.eliminarTransaccion(id);
        return ResponseEntity.noContent().build();
    }
}
