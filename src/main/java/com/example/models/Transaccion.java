package com.example.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "transacciones")
public class Transaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transaccion_id;

    @ManyToOne
    @JoinColumn(name = "cuenta_origen_id",referencedColumnName = "cuenta_id")
    private CuentaBancaria cuentaOrigen;

    @ManyToOne
    @JoinColumn(name = "cuenta_destino_id", referencedColumnName = "cuenta_id")
    private CuentaBancaria cuentaDestino;

    @ManyToOne
    @JoinColumn(name = "tipo_transaccion_id")
    private TipoTransaccion tipoTransaccion;

    @Column(name = "monto", nullable = false)
    private BigDecimal monto;

    @Column(name = "fecha_transaccion")
    private Timestamp fechaTransaccion;

    @Column(name = "estado", nullable = false)
    private Boolean estado;

    @Column(name = "descripcion")
    private String descripcion;

    public Long getTransaccionId() {
        return transaccion_id;
    }

    public void setTransaccionId(Long transaccionId) {
        this.transaccion_id = transaccionId;
    }

    public CuentaBancaria getCuentaOrigen() {
        return cuentaOrigen;
    }

    public void setCuentaOrigen(CuentaBancaria cuentaOrigen) {
        this.cuentaOrigen = cuentaOrigen;
    }

    public CuentaBancaria getCuentaDestino() {
        return cuentaDestino;
    }

    public void setCuentaDestino(CuentaBancaria cuentaDestino) {
        this.cuentaDestino = cuentaDestino;
    }

    public TipoTransaccion getTipoTransaccion() {
        return tipoTransaccion;
    }

    public void setTipoTransaccion(TipoTransaccion tipoTransaccion) {
        this.tipoTransaccion = tipoTransaccion;
    }

    public Timestamp getFechaTransaccion() {
        return fechaTransaccion;
    }

    public void setFechaTransaccion(Timestamp fechaTransaccion) {
        this.fechaTransaccion = fechaTransaccion;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }
}
