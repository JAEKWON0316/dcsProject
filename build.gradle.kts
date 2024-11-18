plugins {
    java
    war  // WAR 플러그인 활성화
    id("org.springframework.boot") version "3.2.11"
    id("io.spring.dependency-management") version "1.1.6"
}

group = "com.dcs"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.projectlombok:lombok")
    
    // Tomcat을 providedRuntime으로 설정하여 WAR 배포용으로 설정
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
    
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    implementation("mysql:mysql-connector-java:8.0.32")
    implementation("io.github.cdimascio:dotenv-java:3.0.2")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

// WAR 빌드를 위한 Spring Boot 설정
bootWar {
    mainClassName = "com.dcs.DcsProjectApplication"  // 메인 클래스 지정
}

