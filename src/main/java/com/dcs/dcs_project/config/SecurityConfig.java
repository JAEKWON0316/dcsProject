package com.dcs.dcs_project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .headers()
            .contentSecurityPolicy("default-src 'self'; connect-src 'self' https://dcs-site-5dccc5b2f0e4.herokuapp.com/");
        
        return http.build();
    }
}
