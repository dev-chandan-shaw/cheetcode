package com.practice.cheetcode.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateUser {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}