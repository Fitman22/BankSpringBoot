package com.example.controllers;

import com.example.models.CuentaBancaria;
import com.example.services.CuentaBancariaService;
import com.example.services.ICuentaBancaria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cuentas")
@CrossOrigin(origins = "http://localhost:8080")
public class CuentaBancariaController {

    @Autowired
    private CuentaBancariaService cuentaBancariaService;

    // Crear una nueva cuenta bancaria
    @PostMapping("/crear")
    public ResponseEntity<CuentaBancaria> crearCuenta(@RequestBody CuentaBancaria cuentaBancaria) {
        CuentaBancaria nuevaCuenta = cuentaBancariaService.crearCuenta(cuentaBancaria);
        return ResponseEntity.ok(nuevaCuenta);
    }

    // Obtener todas las cuentas bancarias
    @GetMapping("/all")
    public ResponseEntity<List<CuentaBancaria>> obtenerTodasLasCuentas() {
        List<CuentaBancaria> cuentas = cuentaBancariaService.obtenerTodasLasCuentas();
        return ResponseEntity.ok(cuentas);
    }

    // Obtener una cuenta bancaria por ID
    @GetMapping("/{id}")
    public ResponseEntity<CuentaBancaria> obtenerCuentaPorId(@PathVariable Long id) {
        CuentaBancaria cuenta = cuentaBancariaService.obtenerCuentaPorId(id);
        if (cuenta != null) {
            return ResponseEntity.ok(cuenta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Actualizar una cuenta bancaria existente
    @PutMapping("/{id}")
    public ResponseEntity<CuentaBancaria> actualizarCuenta(@PathVariable Long id, @RequestBody CuentaBancaria cuentaActualizada) {
        CuentaBancaria cuenta = cuentaBancariaService.actualizarCuenta(id, cuentaActualizada);
        if (cuenta != null) {
            return ResponseEntity.ok(cuenta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una cuenta bancaria
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCuenta(@PathVariable Long id) {
        boolean eliminada = cuentaBancariaService.eliminarCuenta(id);
        if (eliminada) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
