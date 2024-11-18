package com.dcs.dcs_project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.ContentSecurityPolicyHeaderWriter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors() // CORS 활성화
            .and()
            .csrf().disable() // CSRF 보호 비활성화
            .headers(headers -> headers
                .addHeaderWriter(new ContentSecurityPolicyHeaderWriter(
                    "default-src 'self'; connect-src 'self' https://www.daecheongse.com https://dcs-site-5dccc5b2f0e4.herokuapp.com/"
                )));

        return http.build();
    }
}
