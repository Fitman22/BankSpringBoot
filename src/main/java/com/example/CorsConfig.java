package com.example;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Rutas a las que se aplica CORS
                .allowedOrigins("http://localhost:8000") // Origen permitido (puede ser el de tu frontend)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
                .allowedHeaders("*") // Cabeceras permitidas
                .allowCredentials(true); // Si se permiten las credenciales (cookies, headers)
    }
}

