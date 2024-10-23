package com.example.repository;

import com.example.models.TipoTransaccion;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TipoTransaccionRepository extends JpaRepository<TipoTransaccion, Long> {
}
