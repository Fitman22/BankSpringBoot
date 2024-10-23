package com.example.models;

public class LoginDto {
  private String nombre_usuario;
  private String password_hash;

  //Getters

	public String getNombre_usuario() {
		return nombre_usuario;
	}

	public String getPassword_hash() {
		return password_hash;
	}


	//Setters


	public void setNombre_usuario(String nombre_usuario) {
		this.nombre_usuario = nombre_usuario;
	}

	public void setPassword_hash(String password_hash) {
		this.password_hash = password_hash;
	}
}
