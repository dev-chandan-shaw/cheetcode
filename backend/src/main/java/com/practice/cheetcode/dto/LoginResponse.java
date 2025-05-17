package com.practice.cheetcode.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String firstName;
    private String lastName;
    private String token;
}
