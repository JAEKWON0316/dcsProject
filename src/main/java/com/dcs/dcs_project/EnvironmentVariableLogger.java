package com.dcs.dcs_project;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentVariableLogger implements CommandLineRunner {

    @Value("${DATASOURCE_URL}")
    private String datasourceUrl;

    @Value("${DATASOURCE_USERNAME}")
    private String datasourceUsername;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("DATASOURCE_URL: " + datasourceUrl);
        System.out.println("DATASOURCE_USERNAME: " + datasourceUsername);
    }
}
