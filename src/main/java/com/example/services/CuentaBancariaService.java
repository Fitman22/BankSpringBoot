package com.example.services;

import com.example.models.CuentaBancaria;
import com.example.repository.cuentaBancariaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CuentaBancariaService {

    @Autowired
    private cuentaBancariaRepositorio cuentaBancariaRepository;

    // Crear una nueva cuenta bancaria
    public CuentaBancaria crearCuenta(CuentaBancaria cuentaBancaria) {
        return cuentaBancariaRepository.save(cuentaBancaria);
    }

    // Obtener todas las cuentas bancarias
    public List<CuentaBancaria> obtenerTodasLasCuentas() {
        return cuentaBancariaRepository.findAll();
    }

    // Obtener una cuenta bancaria por ID
    public CuentaBancaria obtenerCuentaPorId(Long id) {
        Optional<CuentaBancaria> cuenta = cuentaBancariaRepository.findById(id);
        return cuenta.orElse(null); // Devuelve la cuenta si existe, o null si no
    }

    // Actualizar una cuenta bancaria
    public CuentaBancaria actualizarCuenta(Long id, CuentaBancaria cuentaActualizada) {
        Optional<CuentaBancaria> cuentaExistente = cuentaBancariaRepository.findById(id);
        if (cuentaExistente.isPresent()) {
            CuentaBancaria cuenta = cuentaExistente.get();
            cuenta.setEstado_cuenta(cuentaActualizada.getEstado_cuenta());
            cuenta.setNumero_cuenta(cuentaActualizada.getNumero_cuenta());
            // Otros campos que quieras actualizar
            return cuentaBancariaRepository.save(cuenta);
        } else {
            return null; // No se encontró la cuenta
        }
    }

    // Eliminar una cuenta bancaria
    public boolean eliminarCuenta(Long id) {
        Optional<CuentaBancaria> cuenta = cuentaBancariaRepository.findById(id);
        if (cuenta.isPresent()) {
            cuentaBancariaRepository.delete(cuenta.get());
            return true;
        } else {
            return false; // No se encontró la cuenta
        }
    }
}
