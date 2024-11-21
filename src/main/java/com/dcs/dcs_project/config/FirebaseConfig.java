package com.dcs.dcs_project.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {
    public FirebaseConfig() throws IOException {
        String firebaseConfig = System.getenv("FIREBASE_CONFIG");
        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(
                new ByteArrayInputStream(firebaseConfig.getBytes())
            ))
            .setStorageBucket("dcsdb-1df4b.appspot.com")
            .build();
        FirebaseApp.initializeApp(options);
    }
}
