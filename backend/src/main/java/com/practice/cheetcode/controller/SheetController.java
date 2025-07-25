package com.practice.cheetcode.controller;

import com.practice.cheetcode.Exception.ResourceNotFoundException;
import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.entity.Sheet;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.SheetRepository;
import com.practice.cheetcode.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/sheet")
public class SheetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SheetRepository sheetRepository;

    @PostMapping
    public ApiResponse<?> createSheet(@RequestParam String title, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("User not found!"));
        Sheet sheet = new Sheet(title, user);
        sheetRepository.save(sheet);
        return ApiResponse.success(sheet, "Sheet Created Successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/slug/{slug}")
    public ApiResponse<?> getSheetBySlug(@PathVariable String slug) {
        Sheet sheet = sheetRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid sheet link"));
        return ApiResponse.success(sheet, "Request success", HttpStatus.OK);
    }

    @GetMapping
    public ApiResponse<?> findSheetByCreator(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("User not found!"));
        List<Sheet> sheets = sheetRepository.findByCreatedBy(user);
        return ApiResponse.success(sheets, "Request success", HttpStatus.OK);
    }

}
