package com.practice.cheetcode.controller;

import com.practice.cheetcode.entity.Category;
import com.practice.cheetcode.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/category")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestParam String name) {
        Category category = new Category();
        category.setName(name);
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }
}
