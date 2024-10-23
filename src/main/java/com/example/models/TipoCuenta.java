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




}

