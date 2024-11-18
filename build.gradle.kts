plugins {
    java
    war
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
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    implementation("mysql:mysql-connector-java:8.0.32")
    implementation("io.github.cdimascio:dotenv-java:3.0.2")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

// WAR 파일로 빌드하려면 다음을 추가해야 합니다.
tasks.bootWar {
    mainClass.set("com.dcs.DcsProjectApplication")  // 메인 클래스 지정
    archiveFileName.set("dcs_project-0.0.1-SNAPSHOT.war") // WAR 파일 이름 설정
}

// Heroku에서 WAR 파일을 실행할 수 있도록 프로세스를 설정
springBoot {
    buildInfo()
}

// Heroku에서 WAR 배포를 위한 설정
tasks.withType<War> {
    webAppDirName = "src/main/webapp"
}
