package com.dcs.dcs_project;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class DcsProjectApplication extends SpringBootServletInitializer {

    // WAR 배포를 위한 configure() 메서드 재정의
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(DcsProjectApplication.class);
    }

    // 애플리케이션이 시작될 때 실행될 메서드
    @PostConstruct
    public void started() {
        // 기본 시간대를 Asia/Seoul로 설정
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }

    public static void main(String[] args) {
        // 내장 서버에서 애플리케이션을 실행
        SpringApplication.run(DcsProjectApplication.class, args);
    }
}
