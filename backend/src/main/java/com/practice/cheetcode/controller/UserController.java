package com.practice.cheetcode.controller;

import com.practice.cheetcode.dto.CreateUser;
import com.practice.cheetcode.dto.LoginRequest;
import com.practice.cheetcode.dto.LoginResponse;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.UserRepository;
import com.practice.cheetcode.service.CustomUserDetailsService;
import com.practice.cheetcode.service.JWTService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;

@RestController
@RequestMapping("api/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;


    @Autowired
    private JWTService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> getUser(@RequestBody LoginRequest req) {
        Optional<User> userOptional = userRepository.findByEmail(req.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is not registered");
        }
        User user = userOptional.get();
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect password");
        }
        String token = jwtService.generateToken(user.getEmail());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setFirstName(user.getFirstName());
        loginResponse.setLastName(user.getLastName());
        loginResponse.setEmail(user.getEmail());
        loginResponse.setToken(token);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody CreateUser request) {
        var existedUser = userRepository.findByEmail(request.getEmail().toLowerCase(Locale.ROOT));
        if (existedUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already registered");
        }
        var user = customUserDetailsService.createUser(request);
        String token = jwtService.generateToken(user.getEmail());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setFirstName(user.getFirstName());
        loginResponse.setLastName(user.getLastName());
        loginResponse.setToken(token);
        loginResponse.setEmail(user.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(loginResponse);
    }

    @GetMapping("/ping")
    public ResponseEntity<?> ping() {
        return ResponseEntity.ok(new Date());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentLoggedInUser(@RequestParam String token) {
        String username = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User Not found"));
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setFirstName(user.getFirstName());
        loginResponse.setLastName(user.getLastName());
        loginResponse.setToken(token);
        loginResponse.setEmail(user.getEmail());
        loginResponse.setProfilePictureUrl(user.getProfilePictureUrl());
        return ResponseEntity.ok(loginResponse);
    }
}
