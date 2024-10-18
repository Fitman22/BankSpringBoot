package com.example.controllers;

import com.example.models.Usuario;
import com.example.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Usuario")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/list")
    public List<Usuario> cargarUsuarios(){
        return usuarioService.getUsuarios();
    }

    @GetMapping("/list/{id}")
    public Usuario buscarPorId(@PathVariable Long id){
        return usuarioService.buscarUsuario(id);
    }

    @PostMapping("/crear")
    public ResponseEntity<Usuario> agregar(@RequestBody Usuario usuario){
        Usuario obj = usuarioService.nuevoUsuario(usuario);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Usuario> editar(@RequestBody Usuario usuario){
        Usuario obj = usuarioService.buscarUsuario(usuario.getId());
        if(obj != null){
            obj.setEmail(usuario.getEmail());
            obj.setNombre(usuario.getNombre());
            obj.setContrasena(usuario.getContrasena());
            obj.setTelefono(usuario.getTelefono());
            usuarioService.nuevoUsuario(obj);
        }else{
            return new ResponseEntity<>(obj,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj,HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Usuario> eliminar(@PathVariable Long id){
        Usuario obj = usuarioService.buscarUsuario(id);
        if(obj != null){
            usuarioService.borrarUsuario(id);

        } else{
            return new ResponseEntity<>(obj,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj,HttpStatus.OK);

    }
}
