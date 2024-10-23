package com.example.models;


import jakarta.persistence.*;

@Entity
@Table(name=TipoCuenta.TABLA_TIPOCUENTA)
public class TipoCuenta {
	public static final String TABLA_TIPOCUENTA="tipo_cuenta";
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@Id
	private int tipo_cuenta_id;


	@Column(name = "nombre_tipo")
	private String nombre_tipo;

	@Column(name="descripcion")
	private String descripcion;

	@Column(name = "tasa_interes")
	private Float tasa_interes;


	@Column (name = "comision")
	private Float comision;


	//Constructores


	public TipoCuenta() {
	}

	public TipoCuenta(int tipo_cuenta_id, Float comision, Float tasa_interes, String descripcion, String nombre_tipo) {
		this.tipo_cuenta_id = tipo_cuenta_id;
		this.comision = comision;
		this.tasa_interes = tasa_interes;
		this.descripcion = descripcion;
		this.nombre_tipo = nombre_tipo;
	}

	//Getters

	public int getTipo_cuenta_id() {
		return tipo_cuenta_id;
	}

	public Float getComision() {
		return comision;
	}

	public Float getTasa_interes() {
		return tasa_interes;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public String getNombre_tipo() {
		return nombre_tipo;
	}


	//Setters


	public void setTipo_cuenta_id(int tipo_cuenta_id) {
		this.tipo_cuenta_id = tipo_cuenta_id;
	}

	public void setComision(Float comision) {
		this.comision = comision;
	}

	public void setTasa_interes(Float tasa_interes) {
		this.tasa_interes = tasa_interes;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public void setNombre_tipo(String nombre_tipo) {
		this.nombre_tipo = nombre_tipo;
	}
}

