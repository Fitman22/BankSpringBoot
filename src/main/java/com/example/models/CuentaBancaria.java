package com.example.models;
import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name=CuentaBancaria.TABLA_CUENTABANCARIA)
public class CuentaBancaria {

	public static final String TABLA_CUENTABANCARIA = "CuentaBancaria";
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@Id
	private  int cuenta_id;

	@ManyToOne
	@JoinColumn(name="usuario_id")
	private  Usuario usuario_id;

	@Column(name = "numero_cuenta")
	private String numero_cuenta;

	@Column(name = "estado_cuenta")
	private int estado_cuenta;


	@Column(name = "fecha_apertura")
	private LocalDateTime fecha_apertura;

	@OneToOne
	@JoinColumn(name = "tipo_cuenta_id")
	private TipoCuenta tipo_cuenta;

}
