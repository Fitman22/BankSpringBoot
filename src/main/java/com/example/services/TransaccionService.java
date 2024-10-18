package com.example.services;

import com.example.models.Cuenta;
import com.example.models.Transaccion;
import com.example.models.TipoTransaccion;
import com.example.repositoryes.CuentaRepository;
import com.example.repositoryes.TransaccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransaccionService {

    @Autowired
    private TransaccionRepository transaccionRepository;

    @Autowired
    private CuentaRepository cuentaRepository;

    // Método para realizar una transferencia
    @Transactional
    public Transaccion realizarTransferencia(Long idCuentaOrigen, Long idCuentaDestino, Double monto) {
        Cuenta cuentaOrigen = cuentaRepository.findById(idCuentaOrigen)
                .orElseThrow(() -> new IllegalArgumentException("Cuenta origen no encontrada"));
        Cuenta cuentaDestino = cuentaRepository.findById(idCuentaDestino)
                .orElseThrow(() -> new IllegalArgumentException("Cuenta destino no encontrada"));

        if (cuentaOrigen.getSaldo() < monto) {
            throw new IllegalArgumentException("Saldo insuficiente en la cuenta origen");
        }

        // Actualizar saldo de las cuentas
        cuentaOrigen.setSaldo(cuentaOrigen.getSaldo() - monto);
        cuentaDestino.setSaldo(cuentaDestino.getSaldo() + monto);

        // Guardar cambios en las cuentas
        cuentaRepository.save(cuentaOrigen);
        cuentaRepository.save(cuentaDestino);

        // Registrar la transacción
        Transaccion transaccion = new Transaccion();
        transaccion.setCuentaOrigen(cuentaOrigen);
        transaccion.setCuentaDestino(cuentaDestino);
        transaccion.setMonto(monto);
        transaccion.setTipoTransaccion(TipoTransaccion.TRANSFERENCIA);
        transaccion.setFechaTransaccion(LocalDateTime.now());

        return transaccionRepository.save(transaccion);
    }

    // Método para obtener todas las transacciones
    public List<Transaccion> obtenerTodasTransacciones() {
        return transaccionRepository.findAll();
    }

    // Método para obtener una transacción por su ID
    public Transaccion obtenerTransaccionPorId(Long id) {
        return transaccionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transacción no encontrada"));
    }

    // Método para actualizar una transacción
    @Transactional
    public Transaccion actualizarTransaccion(Long id, Transaccion transaccionActualizada) {
        Transaccion transaccionExistente = transaccionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transacción no encontrada"));

        // Actualizar los datos de la transacción existente
        transaccionExistente.setMonto(transaccionActualizada.getMonto());
        transaccionExistente.setTipoTransaccion(transaccionActualizada.getTipoTransaccion());
        transaccionExistente.setFechaTransaccion(transaccionActualizada.getFechaTransaccion());

        return transaccionRepository.save(transaccionExistente);
    }

    // Método para eliminar una transacción
    @Transactional
    public void eliminarTransaccion(Long id) {
        if (!transaccionRepository.existsById(id)) {
            throw new IllegalArgumentException("Transacción no encontrada");
        }
        transaccionRepository.deleteById(id);
    }
}
