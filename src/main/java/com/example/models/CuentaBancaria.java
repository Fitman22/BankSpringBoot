package com.example.models;
import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name=CuentaBancaria.TABLA_CUENTABANCARIA)
public class CuentaBancaria {

	public static final String TABLA_CUENTABANCARIA = "cuentas_bancarias";
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@Id
	private long cuenta_id;

	@ManyToOne
	@JoinColumn(name="usuario_id")
	private  Usuario usuario_id;

	@Column(name = "numero_cuenta")
	private String numero_cuenta;

	@Column(name = "estado_cuenta")
	private int estado_cuenta;


	@Column(name = "fecha_apertura" , updatable = false, insertable=false ,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private LocalDateTime fecha_apertura;

	@OneToOne
	@JoinColumn(name = "tipo_cuenta_id")
	private TipoCuenta tipo_cuenta;


	//Constructores


	public CuentaBancaria() {
	}

	public CuentaBancaria(long cuenta_id, TipoCuenta tipo_cuenta, LocalDateTime fecha_apertura, int estado_cuenta, String numero_cuenta, Usuario usuario_id) {
		this.cuenta_id = cuenta_id;
		this.tipo_cuenta = tipo_cuenta;
		this.fecha_apertura = fecha_apertura;
		this.estado_cuenta = estado_cuenta;
		this.numero_cuenta = numero_cuenta;
		this.usuario_id = usuario_id;
	}



	public long getCuenta_id() {
		return cuenta_id;
	}

	public void setCuenta_id(int cuenta_id) {
		this.cuenta_id = cuenta_id;
	}

	public String getNumero_cuenta() {
		return numero_cuenta;
	}

	public void setNumero_cuenta(String numero_cuenta) {
		this.numero_cuenta = numero_cuenta;
	}

	public Usuario getUsuario_id() {
		return usuario_id;
	}

	public void setUsuario_id(Usuario usuario_id) {
		this.usuario_id = usuario_id;
	}

	public int getEstado_cuenta() {
		return estado_cuenta;
	}

	public void setEstado_cuenta(int estado_cuenta) {
		this.estado_cuenta = estado_cuenta;
	}

	public LocalDateTime getFecha_apertura() {
		return fecha_apertura;
	}

	public void setFecha_apertura(LocalDateTime fecha_apertura) {
		this.fecha_apertura = fecha_apertura;
	}

	public TipoCuenta getTipo_cuenta() {
		return tipo_cuenta;
	}

	public void setTipo_cuenta(TipoCuenta tipo_cuenta) {
		this.tipo_cuenta = tipo_cuenta;
	}
}
