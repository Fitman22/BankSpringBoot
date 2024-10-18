package com.example.services;

import com.example.models.CuentaBancaria;

import java.util.List;

public interface ICuentaBancaria {
	List<CuentaBancaria> getCuentas();
	CuentaBancaria nuevaCuenta(CuentaBancaria cuenta);
	CuentaBancaria buscarCuentaPorId(int id);
	int borrarCuenta(CuentaBancaria cuenta);


}

