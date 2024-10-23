package com.example.services;

import com.example.models.LoginDto;
import jakarta.transaction.Transactional;
import com.example.models.Usuario;
import com.example.repository.usuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
	public Usuario buscarUsuarioPorId(long id) {
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
/**
	@Override
	public int login(LoginDto usuarioDto) {
		System.out.println(usuarioDto.getNombre_usuario());
		int u= usuarioRepositorio.findByNombreUsuarioAndPassword(usuarioDto.getNombre_usuario(), usuarioDto.getPassword_hash());
		return u;
	}

	@Override
	public ResponseEntity<?> ingresar(LoginDto usuarioDto) {
		Map<String,Object> response= new HashMap<>();
		Usuario usuario=null;

		try{

		usuario=usuarioRepositorio.findByNombreAndPassword(usuarioDto.getNombre_usuario(),usuarioDto.getPassword_hash());
        if(usuario==null){
			response.put("Usuario",null);
			response.put("Mensaje"," Alerta : Usuario  o password incorrectos");
			response.put("statusCode", HttpStatus.NOT_FOUND);
			return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
		}else{
			response.put("Usuario",usuario);
			response.put("Mensaje"," Datos Correctos");
			response.put("statusCode", HttpStatus.OK.value());
			return new ResponseEntity<>(response,HttpStatus.OK);
		}
		}
		catch(Exception e){
          response.put("Usuario",null);
		  response.put("Mensaje"," Ha ocurrido un error");
		  response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
		  return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}



	}**/
}
