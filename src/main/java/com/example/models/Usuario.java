package com.example.models;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name=Usuario.TABLE_NAME)
public class Usuario {
	public static final String TABLE_NAME = "usuarios";
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "usuario_id")
	private Long id;

	@Column(name = "nombre_usuario")
	private String nombre;

	@Column(name = "contraseña_hash")
	private String contrasena;

	@Column(name = "email")
	private String email;

	@Column(name = "telefono")
	private String telefono;

	@Column(name = "fecha_registro")
	private LocalDateTime fecha;

}
