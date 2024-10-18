package com.example.controllers;

import com.example.models.Transaccion;
import com.example.services.TransaccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transacciones")
public class TransaccionControler {

    @Autowired
    private TransaccionService transaccionService;

    @PostMapping("/transferir")
    public ResponseEntity<Transaccion> transferir(@RequestParam Long idCuentaOrigen,
                                                  @RequestParam Long idCuentaDestino,
                                                  @RequestParam Double monto) {
        Transaccion transaccion = transaccionService.realizarTransferencia(idCuentaOrigen, idCuentaDestino, monto);
        return ResponseEntity.ok(transaccion);
    }
}
