package com.dcs.dcs_project;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentVariableLogger implements CommandLineRunner {

    @Value("${JAWSDB_URL}")
    private String jawsdbUrl;

    @Value("${DATASOURCE_USERNAME}")
    private String datasourceUsername;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("JAWSDB_URL: " + jawsdbUrl);
        System.out.println("DATASOURCE_USERNAME: " + datasourceUsername);
    }
}
