package com.practice.cheetcode.controller;
import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.dto.CreateQuestion;
import com.practice.cheetcode.dto.PageResponse;
import com.practice.cheetcode.entity.Category;
import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.repository.CategoryRepository;
import com.practice.cheetcode.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/question")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody CreateQuestion req) {
        long categoryId = req.getCategoryId();
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid CategoryId");
        }
        Category category = categoryOptional.get();
        Question question = new Question();
        question.setLink(req.getLink());
        question.setTitle(req.getTitle());
        question.setCategory(category);
        question.setDifficulty(req.getDifficulty());
        category.getQuestions().add(question);
        categoryRepository.save(category);
        return ResponseEntity.ok(question);
    }

    @GetMapping
    public ApiResponse<?> getQuestionsByCategoryId(@RequestParam(required = false) Long categoryId, @PageableDefault(size = 20) Pageable pageable) {
        Page<Question> page;
        if (categoryId == null) {
            page = questionRepository.findAll(pageable);
        } else {
            page = questionRepository.findByCategoryId(categoryId, pageable);
        }
        PageResponse<Question> pageResponse = new PageResponse<>(
                page.getContent(),
                page.getPageable().getPageNumber(),
                page.getPageable().getPageSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                !page.isLast()
        );
        return ApiResponse.success(pageResponse, "Request success", HttpStatus.OK);
    }
}
