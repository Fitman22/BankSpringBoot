package com.example.services;

import com.example.models.LoginDto;
import com.example.models.Usuario;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUsuario {

	List<Usuario> getUsuarios();
	Usuario nuevoUsuario(Usuario usuario);
	Usuario buscarUsuarioPorId(int id);
	int borrarUsuario(Long id);

	int login(LoginDto loginDto);
	ResponseEntity<?> ingresar(LoginDto usuarioDto);


}
