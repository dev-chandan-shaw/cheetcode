package com.practice.cheetcode.controller;

import com.practice.cheetcode.Exception.ResourceNotFoundException;
import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.entity.Category;
import com.practice.cheetcode.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/category")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestParam String name) {
        Optional<Category> categoryOptional = categoryRepository.findByNameIgnoreCase(name);
        if(categoryOptional.isPresent()) {
            return  ResponseEntity.badRequest().body("Category name already exist.");
        }
        Category category = new Category();
        category.setName(name);
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@RequestParam String name, @PathVariable Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found!"));
        category.setName(name);
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    public ApiResponse<?> getAllCategory() {
        return ApiResponse.success(categoryRepository.findAll(), "Request success", HttpStatus.OK);
    }
}
