package com.example.repository;

import com.example.models.CuentaBancaria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface cuentaBancariaRepositorio extends JpaRepository<CuentaBancaria, Integer> {
}

