package com.example.bankspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.example.controllers.TransaccionController")
@SpringBootApplication
public class BankSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankSpringBootApplication.class, args);
	}

}
