package com.example.controllers;

import com.example.models.LoginDto;
import com.example.models.Usuario;
import com.example.services.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsuarioController {

	@Autowired
	UsuarioServicio usuarioServicio;


	//Listar Usuarios
	@CrossOrigin(origins = "*")
	@GetMapping("/listar")
	public List<Usuario> cargarUsuarios() {

		return usuarioServicio.getUsuarios();
	}


	//Borrar Usuario

	@CrossOrigin(origins = "*")
	@DeleteMapping("/userDelete/{id}")
	public ResponseEntity<Usuario> eliminar(@PathVariable Long id) {
		Usuario obj = usuarioServicio.buscarUsuarioPorId(Math.toIntExact(id));
		if (obj != null) {
			usuarioServicio.borrarUsuario(id);
		} else {
			return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

   //Login
	@CrossOrigin(origins = "*")
	@PostMapping("/loginclient")
	public int loginCliente(@RequestBody LoginDto usuario) {
		int responseLogin=usuarioServicio.login(usuario);
		return responseLogin;

	}


   //Login retorna usuario completo
	@CrossOrigin(origins = "*")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto usuario) {
		return usuarioServicio.ingresar(usuario);
	}



 //Añadir Usuarios
 @CrossOrigin(origins = "*")
 @PostMapping("/addUser")
	public  ResponseEntity<Usuario>agregar (@RequestBody Usuario usuario) {
		Usuario obj = usuarioServicio.nuevoUsuario(usuario);
		return new ResponseEntity<>(obj, HttpStatus.OK);

	}



	//Editar Usuario

	@CrossOrigin(origins="*")
	@PutMapping("/editUser")
	public ResponseEntity<Usuario> editar (@RequestBody Usuario usuario){
		System.out.println(usuario.getUsuario_id());
		Usuario obj= usuarioServicio.buscarUsuarioPorId(usuario.getUsuario_id());
		System.out.println(obj);
		if(obj!=null){
			obj.setUsuario_id(usuario.getUsuario_id());
			obj.setNombre_usuario(usuario.getNombre_usuario());
			obj.setContrasena_hash(usuario.getPassword_hash());
			obj.setEmail(usuario.getEmail());
			obj.setTelefono(usuario.getTelefono());
			obj.setRol(usuario.getRol());
			usuarioServicio.nuevoUsuario(obj);

		}else {

			return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);

		}

		return new ResponseEntity<>(obj, HttpStatus.OK);
	}





}
