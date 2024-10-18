package com.example.controllers;

import java.util.List;

import com.example.models.LoginDto;
import com.example.models.Usuario;
import com.example.services.UsuarioServicio;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {

	@Autowired
	UsuarioServicio usuarioServicio;


	//Listar Usuarios
	@GetMapping("/listar")
	public List<Usuario> cargarUsuarios() {

		return usuarioServicio.getUsuarios();
	}




	@PostMapping("/loginclient")
	public int login(@RequestBody LoginDto usuario) {
		int responseLogin =usuarioServicio.login(usuario);
		System.out.println(responseLogin);
		return responseLogin;
	}

	@PostMapping("/login")
	public ResponseEntity<?>loginCliente(@RequestBody LoginDto usuario) {
		return usuarioServicio.ingresar(usuario);
	}












}
