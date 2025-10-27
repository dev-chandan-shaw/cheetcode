package com.practice.cheetcode.controller;

import com.practice.cheetcode.Exception.ResourceNotFoundException;
import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.dto.CreateQuestionPatternRequest;
import com.practice.cheetcode.dto.QuestionPatternResponse;
import com.practice.cheetcode.dto.UpdateQuestionPatternRequest;
import com.practice.cheetcode.entity.Category;
import com.practice.cheetcode.entity.QuestionPattern;
import com.practice.cheetcode.repository.CategoryRepository;
import com.practice.cheetcode.repository.QuestionPatternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/question-pattern")
public class QuestionPatternController {
    @Autowired
    private QuestionPatternRepository questionPatternRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping()
    private ApiResponse<?> createQuestionPattern(@RequestBody CreateQuestionPatternRequest req) {
        Category category = categoryRepository.findById(req.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category not found!"));
        QuestionPattern questionPattern = new QuestionPattern();
        questionPattern.setName(req.getName());
        questionPattern.setCategory(category);
        questionPatternRepository.save(questionPattern);
        return ApiResponse.success(questionPattern, "Successfully created question pattern!", HttpStatus.CREATED);
    }

    @GetMapping
    private ApiResponse<?> getAllQuestionPattern() {
        List<QuestionPattern> questionPatterns = questionPatternRepository.findAll();
        List<QuestionPatternResponse> questionPatternResponses = questionPatterns.stream().map(q -> new QuestionPatternResponse(
                q.getId(),
                q.getName(),
                q.getCategory() != null ? q.getCategory().getId() : null
        )).toList();
        return ApiResponse.success(questionPatternResponses, "Success", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    private ApiResponse<?> updateQuestionPattern(@PathVariable Long id, @RequestBody UpdateQuestionPatternRequest req) {
        QuestionPattern questionPattern = questionPatternRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Question pattern not found!"));
        questionPattern.setName(req.getName());
        questionPattern.setCategory(categoryRepository.findById(req.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category not found!")));
        questionPatternRepository.save(questionPattern);
        return ApiResponse.success(questionPattern, "Successfully updated question pattern!", HttpStatus.OK);
    }
}
