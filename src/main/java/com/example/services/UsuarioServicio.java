package com.example.services;

import jakarta.transaction.Transactional;
import com.example.models.Usuario;
import com.example.repository.usuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
public class UsuarioServicio implements IUsuario {

	@Autowired
	usuarioRepositorio usuarioRepositorio;


	@Override
	public List<Usuario> getUsuarios() {
		return usuarioRepositorio.findAll();
	}

	@Override
	public Usuario nuevoUsuario(Usuario usuario) {
		return  usuarioRepositorio.save(usuario);
	}

	@Override
	public Usuario buscarUsuarioPorId(int id) {
		Usuario usuario = null;
		usuario = usuarioRepositorio.findById((long) id).orElse(null);
		if (usuario == null) {
			return null;
		}
		return usuario;
	}

	@Override
	public int borrarUsuario(Usuario cuenta) {
		usuarioRepositorio.delete(cuenta);
		return 1;
	}
}
