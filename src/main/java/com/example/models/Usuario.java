package com.example.models;
import java.time.LocalDateTime;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name=Usuario.TABLA_USUARIOS)
public class Usuario {

	public static final String TABLA_USUARIOS ="usuarios";

	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@Id
	private int usuario_id;

	@Column(name = "nombre_usuario")
	private String nombre_usuario;


	@Column(name="contraseña_hash")
	private String contrasena_hash;


	@Column(name = "email")
	private String email;

	@Column(name = "telefono")
	private String telefono;

	@Column(name="fecha_registro")
	private LocalDateTime fecha_registro;

	//Constructor

	public Usuario() {}

	public Usuario(int usuario_id, String nombre_usuario, String email, String contrasena_hash, String telefono, LocalDateTime fecha_registro) {
		this.usuario_id = usuario_id;
		this.nombre_usuario = nombre_usuario;
		this.email = email;
		this.contrasena_hash = contrasena_hash;
		this.telefono = telefono;
		this.fecha_registro = fecha_registro;
	}

	// Usuario Getter's
	public int getUsuario_id() {
		return usuario_id;
	}

	public String getNombre_usuario() {
		return nombre_usuario;
	}

	public String getContrasena_hash() {
		return contrasena_hash;
	}

	public String getEmail() {
		return email;
	}

	public String getTelefono() {
		return telefono;
	}

	public LocalDateTime getFecha_registro() {
		return fecha_registro;
	}



	//Usuario Setters


	public void setUsuario_id(int usuario_id) {
		this.usuario_id = usuario_id;
	}

	public void setNombre_usuario(String nombre_usuario) {
		this.nombre_usuario = nombre_usuario;
	}

	public void setContrasena_hash(String contrasena_hash) {
		this.contrasena_hash = contrasena_hash;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public void setFecha_registro(LocalDateTime fecha_registro) {
		this.fecha_registro = fecha_registro;
	}
}
