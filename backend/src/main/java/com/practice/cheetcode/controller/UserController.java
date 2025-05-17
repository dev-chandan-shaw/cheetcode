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
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/login")
    public ResponseEntity<?> getUser(@RequestBody LoginRequest req) {
        Optional<User> userOptional = userRepository.findByEmail(req.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is not registered");
        }
        User user = userOptional.get();
        String token = jwtService.generateToken(user.getEmail());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setFirstName(user.getFirstName());
        loginResponse.setLastName(user.getLastName());
        loginResponse.setToken(token);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody CreateUser request) {
        var existedUser = userRepository.findByEmail(request.getEmail().toLowerCase(Locale.ROOT));
        if (existedUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is registered");
        }
        var user = customUserDetailsService.createUser(request);
        String token = jwtService.generateToken(user.getEmail());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setFirstName(user.getFirstName());
        loginResponse.setLastName(user.getLastName());
        loginResponse.setToken(token);
        return ResponseEntity.status(HttpStatus.CREATED).body(loginResponse);
    }
}
