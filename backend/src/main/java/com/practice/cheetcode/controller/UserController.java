package com.practice.cheetcode.controller;

import com.practice.cheetcode.Exception.BadRequestException;
import com.practice.cheetcode.Exception.ResourceNotFoundException;
import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.dto.CreateUser;
import com.practice.cheetcode.dto.LoginRequest;
import com.practice.cheetcode.dto.LoginResponse;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.UserRepository;
import com.practice.cheetcode.service.CustomUserDetailsService;
import com.practice.cheetcode.service.JWTService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

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

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ApiResponse<?> getUser(@RequestBody LoginRequest req, HttpServletResponse httpServletResponse) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        String username = authentication.getName();
        User user = userRepository.findByEmail(username).get();

        // Convert user roles to GrantedAuthority collection
        Collection<? extends GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        String token = jwtService.generateToken(username, user.getId(), authorities);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setFirstName(user.getFirstName());
        loginResponse.setLastName(user.getLastName());
        loginResponse.setEmail(user.getEmail());
        loginResponse.setToken(token);

        Cookie jwtCookie = new Cookie("accessToken", token); // Cookie name can be anything

        jwtCookie.setHttpOnly(true); // Prevents JavaScript access
        jwtCookie.setSecure(true); // Should be true in production to send only over HTTPS
        jwtCookie.setPath("/"); // The cookie is available to all paths
        jwtCookie.setMaxAge(60 * 60 * 24); // Set cookie expiration (e.g., 24 hours in seconds)

        // 2. Add the cookie to the response
        httpServletResponse.addCookie(jwtCookie);
        return ApiResponse.success(loginResponse, "Logged in successfully", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ApiResponse<?> signUp(@RequestBody CreateUser request) {
        var existedUser = userRepository.findByEmail(request.getEmail().toLowerCase(Locale.ROOT));
        if (existedUser.isPresent()) {
            throw new BadRequestException("User already exists!");
        }
        var user = customUserDetailsService.createUser(request);
        Collection<? extends GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        String token = jwtService.generateToken(user.getEmail(), user.getId(), authorities);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setFirstName(user.getFirstName());
        loginResponse.setLastName(user.getLastName());
        loginResponse.setToken(token);
        loginResponse.setEmail(user.getEmail());

        return ApiResponse.success(loginResponse, "User created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/ping")
    public ResponseEntity<?> ping() {
        return ResponseEntity.ok(new Date());
    }

    @GetMapping("/user")
    public ApiResponse<?> getCurrentLoggedInUser(@RequestParam String token) {
        String username = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new BadRequestException("User Not found"));
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setFirstName(user.getFirstName());
        loginResponse.setLastName(user.getLastName());
        loginResponse.setToken(token);
        loginResponse.setEmail(user.getEmail());
        loginResponse.setProfilePictureUrl(user.getProfilePictureUrl());
        return ApiResponse.success(loginResponse, "User found", HttpStatus.OK);
    }
}
