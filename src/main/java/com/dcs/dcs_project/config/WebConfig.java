package com.dcs.dcs_project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    /* 
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        
        String os = System.getProperty("os.name").toLowerCase();
        String uploadPath;

        if (os.contains("win")) {
            uploadPath = "file:///C:/dcsDB/";
        } else if (os.contains("mac")) {
            uploadPath = "file:///Users/an-yeseon//dcsDB/";
        } else {
            uploadPath = "file:///home/YourUsername/dcsDB/";
        }
        
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadPath);
    }
        */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // API 경로를 설정
                .allowedOrigins("https://www.daecheongse.com", "http://localhost:3000") // React 앱의 출처
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(true); // 자격 증명 허용
    }

}