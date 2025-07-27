package com.practice.cheetcode.controller;

import com.practice.cheetcode.Exception.BadRequestException;
import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.entity.Role;
import com.practice.cheetcode.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/role")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;
    @PostMapping
    public ApiResponse<?> createRole(@RequestParam String name) {
        Optional<Role> existedRole = roleRepository.findByName(name);
        if (existedRole.isPresent()) {
            throw new BadRequestException("Role already exists!");
        }
        Role role = new Role();
        role.setName(name);
        roleRepository.save(role);
        return ApiResponse.success(role, "Role created successfully", HttpStatus.CREATED);
    }
}
