package com.example.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "cuentas")
public class Cuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    private String numeroCuenta;
    private Double saldo;

    // Relación con transacciones
    @OneToMany(mappedBy = "cuentaOrigen")
    private List<Transaccion> transaccionesOrigen;

    @OneToMany(mappedBy = "cuentaDestino")
    private List<Transaccion> transaccionesDestino;

}

