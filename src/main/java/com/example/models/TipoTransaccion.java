package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "tipo_transaccion")
public class TipoTransaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipo_transaccion_id;

    @Column(name = "nombre_tipo", nullable = false)
    private String nombreTipo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "requiere_autorizacion", nullable = false)
    private Boolean requiereAutorizacion;

    public Long getTipoTransaccionId() {
        return tipo_transaccion_id;
    }

    public void setTipoTransaccionId(Long tipoTransaccionId) {
        this.tipo_transaccion_id = tipoTransaccionId;
    }

    public String getNombreTipo() {
        return nombreTipo;
    }

    public void setNombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
    }

    public Boolean getRequiereAutorizacion() {
        return requiereAutorizacion;
    }

    public void setRequiereAutorizacion(Boolean requiereAutorizacion) {
        this.requiereAutorizacion = requiereAutorizacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
