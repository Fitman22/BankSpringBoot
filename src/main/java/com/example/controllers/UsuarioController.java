package com.example.controllers;

import java.util.List;

import com.example.models.LoginDto;
import com.example.models.Usuario;
import com.example.services.UsuarioServicio;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Usuario")
public class UsuarioController {

	@Autowired
	UsuarioServicio usuarioServicio;


	//Listar Usuarios
	@GetMapping("/listar")
	public List<Usuario> cargarUsuarios() {

		return usuarioServicio.getUsuarios();
	}
	@GetMapping("/listar/{id}")
	public Usuario buscarPorId(@PathVariable long id){

		return usuarioServicio.buscarUsuarioPorId(id);
	}

	@PostMapping("/crear")
	public ResponseEntity<Usuario> agregar(@RequestBody Usuario usuario){
		Usuario obj = usuarioServicio.nuevoUsuario(usuario);
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@PutMapping("/actualizar")
	public ResponseEntity<Usuario> editar(@RequestBody Usuario usuario){
		Usuario obj = usuarioServicio.buscarUsuarioPorId(usuario.getId());
		if(obj != null){
			obj.setEmail(usuario.getEmail());
			obj.setNombre(usuario.getNombre());
			obj.setContrasena(usuario.getContrasena());
			obj.setTelefono(usuario.getTelefono());
			usuarioServicio.nuevoUsuario(obj);
		}else{
			return new ResponseEntity<>(obj,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(obj,HttpStatus.OK);
	}

	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<Usuario> eliminar(@PathVariable long id){
		Usuario obj = usuarioServicio.buscarUsuarioPorId(id);
		if(obj != null){
			usuarioServicio.borrarUsuario(obj);

		} else{
			return new ResponseEntity<>(obj,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(obj,HttpStatus.OK);

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
