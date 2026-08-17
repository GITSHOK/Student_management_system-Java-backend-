package com.example.studentSpring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class StudentSpringApplication {
    public static void main(String[] args) {
        var ctx = SpringApplication.run(StudentSpringApplication.class, args);
        Environment env = ctx.getEnvironment();
        System.out.println(">>> MONGO URI SEEN BY SPRING: " + env.getProperty("spring.mongodb.uri"));
    }
}
