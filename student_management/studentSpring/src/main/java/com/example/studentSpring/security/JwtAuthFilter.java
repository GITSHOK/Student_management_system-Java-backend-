package com.example.studentSpring.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.studentSpring.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {


        // Get Authorization header

        String authHeader = request.getHeader("Authorization");


        // No token

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);

            return;
        }


        // Remove "Bearer " from token

        String token = authHeader.substring(7);


        try {

            // Extract username

            String username =
                    jwtService.extractUsername(token);


            // Extract role

            String role =
                    jwtService.extractRole(token);


            // Create authority

            SimpleGrantedAuthority authority =
                    new SimpleGrantedAuthority(
                            "ROLE_" + role
                    );


            // Create authentication

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            List.of(authority)
                    );


            // Tell Spring Security who the user is

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);


        } catch (Exception e) {

            System.out.println("Invalid JWT token");

        }


        filterChain.doFilter(request, response);
    }
}