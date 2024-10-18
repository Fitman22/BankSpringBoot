package com.example.repository;

import com.example.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface usuarioRepositorio extends JpaRepository<Usuario, Long> {

	@Query("select count (*) from Usuario as p where p.nombre_usuario= :nombre_usuario and p.password_hash= :password_hash")
	Integer findByNombreUsuarioAndPassword(@Param("nombre_usuario") String nombre_usuario,@Param("password_hash") String password_hash);

	@Query("select p from Usuario as p where p.nombre_usuario=:nombre_usuario and p.password_hash=:password_hash")
	Usuario findByNombreAndPassword(@Param("nombre_usuario") String nombre_usuario,@Param("password_hash") String password_hash);

}

