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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroCuenta() {
        return numeroCuenta;
    }

    public void setNumeroCuenta(String numeroCuenta) {
        this.numeroCuenta = numeroCuenta;
    }

    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public List<Transaccion> getTransaccionesOrigen() {
        return transaccionesOrigen;
    }

    public void setTransaccionesOrigen(List<Transaccion> transaccionesOrigen) {
        this.transaccionesOrigen = transaccionesOrigen;
    }

    public List<Transaccion> getTransaccionesDestino() {
        return transaccionesDestino;
    }

    public void setTransaccionesDestino(List<Transaccion> transaccionesDestino) {
        this.transaccionesDestino = transaccionesDestino;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}

