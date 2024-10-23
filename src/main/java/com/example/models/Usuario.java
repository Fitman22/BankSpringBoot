package com.example.models;
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


	@Column(name="password_hash")
	private String password_hash;


	@Column(name = "email")
	private String email;

	@Column(name = "telefono")
	private String telefono;

	@Column(name="fecha_registro")
	private LocalDateTime fecha_registro;

	@Column(name="rol")
	private String rol;

	//Constructor

	public Usuario() {}

	public Usuario(int usuario_id, String rol, LocalDateTime fecha_registro, String telefono, String email, String password_hash, String nombre_usuario) {
		this.usuario_id = usuario_id;
		this.rol = rol;
		this.fecha_registro = fecha_registro;
		this.telefono = telefono;
		this.email = email;
		this.password_hash = password_hash;
		this.nombre_usuario = nombre_usuario;
	}

	// Usuario Getter's
	public int getUsuario_id() {
		return usuario_id;
	}

	public String getNombre_usuario() {
		return nombre_usuario;
	}

	public String getPassword_hash() {
		return password_hash;
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

	public String getRol() {
		return rol;
	}

	//Usuario Setters


	public void setUsuario_id(int usuario_id) {
		this.usuario_id = usuario_id;
	}

	public void setNombre_usuario(String nombre_usuario) {
		this.nombre_usuario = nombre_usuario;
	}

	public void setContrasena_hash(String contrasena_hash) {
		this.password_hash = password_hash;
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

	public void setRol(String rol) {
		this.rol = rol;
	}
}
