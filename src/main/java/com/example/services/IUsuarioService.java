package com.example.services;

import com.example.models.Usuario;

import java.util.List;

public interface IUsuarioService {
    List<Usuario> getUsuarios();

    Usuario nuevoUsuario(Usuario usuario);

    Usuario buscarUsuario(Long id);

    int borrarUsuario(Long id);
}
