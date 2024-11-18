package com.dcs.dcs_project;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class DcsProjectApplication {


	 @PostConstruct
    public void started() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		
    }

	public static void main(String[] args) {

		
		SpringApplication.run(DcsProjectApplication.class, args);
	}

}
