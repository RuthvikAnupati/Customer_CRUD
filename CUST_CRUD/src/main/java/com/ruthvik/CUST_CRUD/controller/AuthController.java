package com.ruthvik.CUST_CRUD.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ruthvik.CUST_CRUD.model.User;
import com.ruthvik.CUST_CRUD.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        return authService.signup(user);
    }


    @PostMapping("/login")
    public String login(@RequestBody User user) {

        return authService.login(
                user.getEmail(),
                user.getPassword()
        );
    }
}