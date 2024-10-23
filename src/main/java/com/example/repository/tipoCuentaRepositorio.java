package com.example.repository;

import com.example.models.TipoCuenta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface tipoCuentaRepositorio extends JpaRepository<TipoCuenta, Integer> {
}

