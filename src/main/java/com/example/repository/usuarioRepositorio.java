package com.example.repository;

import com.example.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface usuarioRepositorio extends JpaRepository<Usuario, Long> {
}

