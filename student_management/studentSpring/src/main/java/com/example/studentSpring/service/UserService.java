package com.example.studentSpring.service;

import org.springframework.stereotype.Service;

import com.example.studentSpring.model.User;
import com.example.studentSpring.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }


    // =========================
    // REGISTER
    // =========================

    public User registerUser(User user) {

        // Hash password
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        // If no role was provided,
        // make the user a normal USER
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        return userRepository.save(user);
    }


    // =========================
    // LOGIN
    // =========================

    public String loginUser(String username, String password) {

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );


        // Check password

        if (!passwordEncoder.matches(
                password,
                user.getPassword()
        )) {

            throw new RuntimeException("Invalid password");
        }


        // Generate JWT containing:
        // username + role

        return jwtService.generateToken(
                user.getUsername(),
                user.getRole()
        );
    }
}