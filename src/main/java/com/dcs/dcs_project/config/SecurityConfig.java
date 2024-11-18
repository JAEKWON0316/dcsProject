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
        // CORS 활성화 (실제 설정은 WebConfig에서 처리)
        http.cors().and()
            // Content Security Policy 설정
            .headers(headers -> headers
                .addHeaderWriter(new ContentSecurityPolicyHeaderWriter(
                    "default-src 'self'; connect-src 'self' https://www.daecheongse.com https://your-backend-api.com"
                )));

        return http.build();
    }
}
