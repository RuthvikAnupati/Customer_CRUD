package com.ruthvik.CUST_CRUD.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import com.ruthvik.CUST_CRUD.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(
                    "CUST_CRUD_SECRET_KEY_2026_RUTHVIK_REDDY_SECURE"
                            .getBytes()
            );

    private final long expirationTime = 1000 * 60 * 60; // 1 hour


    // Generate JWT token
    public String generateToken(User user) {

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("role", user.getRole())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                + expirationTime
                        )
                )
                .signWith(secretKey)
                .compact();
    }


    // Extract email from token
    public String extractEmail(String token) {

        return getClaims(token)
                .getSubject();
    }


    // Extract role from token
    public String extractRole(String token) {

        return getClaims(token)
                .get("role", String.class);
    }


    // Validate token
    public boolean validateToken(String token) {

        try {

            getClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }


    // Get token claims
    private Claims getClaims(String token) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}