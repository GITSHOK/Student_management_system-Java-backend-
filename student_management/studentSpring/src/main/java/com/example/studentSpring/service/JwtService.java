package com.example.studentSpring.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    private final String secretKey =
            "my-super-secret-key-for-student-management-system-12345";

    private final long expirationTime = 1000 * 60 * 60; // 1 hour


    // Generate JWT
    public String generateToken(String username, String role) {

        SecretKey key = Keys.hmacShaKeyFor(
                secretKey.getBytes()
        );

        return Jwts.builder()
                .subject(username)

                // ADD ROLE TO JWT
                .claim("role", role)

                .issuedAt(new Date())

                .expiration(
                    new Date(
                        System.currentTimeMillis() + expirationTime
                    )
                )

                .signWith(key)
                .compact();
    }


    // Extract username
    public String extractUsername(String token) {

        SecretKey key = Keys.hmacShaKeyFor(
                secretKey.getBytes()
        );

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }


    // Extract role
    public String extractRole(String token) {

        SecretKey key = Keys.hmacShaKeyFor(
                secretKey.getBytes()
        );

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("role", String.class);
    }
}