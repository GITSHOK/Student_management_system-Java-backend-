package com.example.studentSpring.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.studentSpring.security.JwtAuthFilter;


@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;


    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }


    // =========================
    // PASSWORD ENCODER
    // =========================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }


    // =========================
    // CORS
    // =========================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }


    // =========================
    // SECURITY
    // =========================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http

            // Disable CSRF because we're using JWT
            .csrf(csrf -> csrf.disable())


            // Enable CORS
            .cors(cors -> {})


            // No sessions
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )


            // =========================
            // ACCESS RULES
            // =========================

            .authorizeHttpRequests(auth -> auth


                // Anyone can register

                .requestMatchers(
                    "/auth/register"
                ).permitAll()


                // Anyone can login

                .requestMatchers(
                    "/auth/login"
                ).permitAll()


                // =========================
                // STUDENT GET
                // =========================

                // USER + ADMIN can view students

                .requestMatchers(
                    HttpMethod.GET,
                    "/students/**"
                ).hasAnyRole(
                    "USER",
                    "ADMIN"
                )


                // =========================
                // STUDENT POST
                // =========================

                // Only ADMIN can add

                .requestMatchers(
                    HttpMethod.POST,
                    "/students/**"
                ).hasRole("ADMIN")


                // =========================
                // STUDENT PUT
                // =========================

                // Only ADMIN can update

                .requestMatchers(
                    HttpMethod.PUT,
                    "/students/**"
                ).hasRole("ADMIN")


                // =========================
                // STUDENT DELETE
                // =========================

                // Only ADMIN can delete

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/students/**"
                ).hasRole("ADMIN")


                // Everything else requires login

                .anyRequest().authenticated()
            )


            // JWT filter

            .addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class
            );


        return http.build();
    }
}