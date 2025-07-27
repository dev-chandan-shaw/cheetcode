package com.practice.cheetcode.controller;
import com.practice.cheetcode.Exception.ResourceNotFoundException;
import com.practice.cheetcode.dto.*;
import com.practice.cheetcode.entity.Category;
import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.Sheet;
import com.practice.cheetcode.entity.SheetQuestion;
import com.practice.cheetcode.repository.CategoryRepository;
import com.practice.cheetcode.repository.QuestionRepository;
import com.practice.cheetcode.repository.SheetQuestionRepository;
import com.practice.cheetcode.repository.SheetRepository;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/question")
public class QuestionController {
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SheetRepository sheetRepository;

    @Autowired
    private SheetQuestionRepository sheetQuestionRepository;

    @GetMapping
    public ApiResponse<?> getQuestionsByCategoryId(@RequestParam(required = false) Long categoryId, @PageableDefault(size = 20) Pageable pageable) {
        Page<Question> page;
        if (categoryId == null) {
            page = questionRepository.findByApproved(pageable, true);
        } else {
            page = questionRepository.findByCategoryIdAndApproved(categoryId, pageable, true);
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

    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody AddQuestionDto req) {
        long categoryId = req.getCategoryId();
        long sheetId = req.getSheetId();

        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found!"));
        Sheet sheet = sheetRepository.findById(sheetId).orElseThrow(() -> new ResourceNotFoundException("Sheet not found!"));

        Question question = new Question();
        question.setLink(req.getLink());
        question.setTitle(req.getTitle());
        question.setCategory(category);
        question.setDifficulty(req.getDifficulty());
        questionRepository.save(question);

        SheetQuestion sheetQuestion = new SheetQuestion();
        sheetQuestion.setSheet(sheet);
        sheetQuestion.setQuestion(question);
        sheetQuestionRepository.save(sheetQuestion);

        return ResponseEntity.ok(question);
    }

    @GetMapping("/unapproved")
    public ApiResponse<?> getUnapprovedQuestions(@PageableDefault(size = 20) Pageable pageable) {
        Page<Question> page = questionRepository.findByApprovedAndArchived(pageable, false, false);
        List<UnapprovedQuestionResponse> unapprovedQuestionResponses = page.getContent().stream().map(UnapprovedQuestionResponse::new).toList();
        PageResponse<UnapprovedQuestionResponse> pageResponse = new PageResponse<>(
                unapprovedQuestionResponses,
                page.getPageable().getPageNumber(),
                page.getPageable().getPageSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                !page.isLast()
        );
        return ApiResponse.success(pageResponse, "Request success", HttpStatus.OK);
    }

    @PutMapping("/approve/{questionId}")
    @RolesAllowed({"ADMIN"})
    public ApiResponse<?> approveQuestion(@PathVariable long questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isEmpty()) {
            throw new ResourceNotFoundException("Question not found!");
        }
        Question question = questionOptional.get();
        question.setApproved(true);
        questionRepository.save(question);
        return ApiResponse.success(question, "Question approved", HttpStatus.OK);
    }


    @PutMapping("/archive/{questionId}")
    @RolesAllowed({"ADMIN"})
    public ApiResponse<?> archiveQuestion(@PathVariable long questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isEmpty()) {
            throw new ResourceNotFoundException("Question not found!");
        }
        Question question = questionOptional.get();
        question.setArchived(true);
        questionRepository.save(question);
        return ApiResponse.success(question, "Question archived", HttpStatus.OK);
    }
}
