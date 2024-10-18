package com.example.services;

import com.example.models.TipoCuenta;
import com.example.models.Usuario;

import java.util.List;

public interface ITipoCuenta {
	List<TipoCuenta> getTiposCuentas();
	TipoCuenta nuevaTipoCuenta(TipoCuenta cuenta);
	TipoCuenta buscarTipoCuentaPorId(TipoCuenta id);
	int borrarTipoCuenta(Usuario cuenta);

}


