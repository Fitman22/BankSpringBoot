package com.example.services;

import com.example.models.CuentaBancaria;
import com.example.repository.cuentaBancariaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CuentBancariaServicio implements ICuentaBancaria {

	@Autowired
	cuentaBancariaRepositorio cuentaBancariaRepositorio;

	@Override
	public List<CuentaBancaria> getCuentas() {
		return  cuentaBancariaRepositorio.findAll();
	}

	@Override
	public CuentaBancaria nuevaCuenta(CuentaBancaria cuenta) {
		return null;
	}

	@Override
	public CuentaBancaria buscarCuentaPorId(int id) {
		return null;
	}

	@Override
	public int borrarCuenta(CuentaBancaria cuenta) {
		return 0;
	}
}
