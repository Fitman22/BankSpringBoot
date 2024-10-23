package com.example.controllers;


import com.example.models.CuentaBancaria;
import com.example.services.CuentBancariaServicio;
import com.example.services.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CuentaBancariaController {

	@Autowired
	CuentBancariaServicio cuentBancariaServicio;



	@CrossOrigin(origins="*")
	@GetMapping("/listAccounts")
	public List<CuentaBancaria> cargarUsuarios(){
		return  cuentBancariaServicio.getCuentas();
	}


}
