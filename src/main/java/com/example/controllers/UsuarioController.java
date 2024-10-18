package com.example.controllers;

import java.util.List;

import com.example.models.Usuario;
import com.example.services.UsuarioServicio;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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




}
