package com.practice.cheetcode.controller;

import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.entity.QuestionPattern;
import com.practice.cheetcode.repository.QuestionPatternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/question-pattern")
public class QuestionPatternController {
    @Autowired
    private QuestionPatternRepository questionPatternRepository;
    @PostMapping()
    private ApiResponse<?> createQuestionPattern(@RequestParam String name) {
        QuestionPattern questionPattern = new QuestionPattern();
        questionPattern.setName(name);
        questionPatternRepository.save(questionPattern);
        return ApiResponse.success(questionPattern, "Successfully created question pattern!", HttpStatus.CREATED);
    }

    @GetMapping
    private ApiResponse<?> getAllQuestionPattern() {
        return ApiResponse.success(questionPatternRepository.findAll(), "Success", HttpStatus.OK);
    }
}
