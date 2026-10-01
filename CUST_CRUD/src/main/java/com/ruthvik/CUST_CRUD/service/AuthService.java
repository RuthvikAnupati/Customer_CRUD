package com.ruthvik.CUST_CRUD.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ruthvik.CUST_CRUD.model.User;
import com.ruthvik.CUST_CRUD.repository.UserRepo;
import com.ruthvik.CUST_CRUD.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    // =========================
    // SIGN UP
    // =========================

    public String signup(User user) {

        if (userRepo.existsByEmail(user.getEmail())) {
            return "Email already exists";
        }

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        userRepo.save(user);

        return "User registered successfully";
    }


    // =========================
    // LOGIN
    // =========================

    public String login(String email, String password) {

        User user =
                userRepo.findByEmail(email).orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            return "Invalid password";
        }

        String token = jwtUtil.generateToken(user);

        return token;
    }
}