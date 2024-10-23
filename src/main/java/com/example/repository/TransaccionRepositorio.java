package com.example.repository;

import com.example.models.Transaccion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransaccionRepositorio extends JpaRepository<Transaccion, Long> {
}
