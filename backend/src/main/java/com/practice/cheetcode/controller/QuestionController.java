package com.practice.cheetcode.controller;
import com.practice.cheetcode.Exception.ResourceNotFoundException;
import com.practice.cheetcode.dto.*;
import com.practice.cheetcode.entity.*;
import com.practice.cheetcode.repository.*;
import com.practice.cheetcode.service.QuestionService;
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

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuestionPatternRepository questionPatternRepository;

//    @GetMapping()
//    public ApiResponse<?> getQuestionsByCategoryId(@RequestParam(required = false) Long categoryId, @PageableDefault(size = 20) Pageable pageable) {
//        Page<Question> page;
//        if (categoryId == null) {
//            page = questionRepository.findByApproved(pageable, true);
//        } else {
//            page = questionRepository.findByCategoryIdAndApproved(categoryId, pageable, true);
//        }
//        PageResponse<Question> pageResponse = new PageResponse<>(
//                page.getContent(),
//                page.getPageable().getPageNumber(),
//                page.getPageable().getPageSize(),
//                page.getTotalElements(),
//                page.getTotalPages(),
//                !page.isLast()
//        );
//        return ApiResponse.success(pageResponse, "Request success", HttpStatus.OK);
//    }

    @GetMapping()
    public ApiResponse<?> getAllQuestion() {
        List<Question> byApproved = questionRepository.findByApproved(true);
        List<QuestionResponseDto> questionResponseList = byApproved.stream().map(q -> new QuestionResponseDto(
                q.getId(),
                q.getTitle(),
                q.getLink(),
                q.getCategory() != null ? q.getCategory().getId() : 0, // avoid NPE
                q.getDifficulty(),
                q.isApproved(),
                q.isArchived(),
                q.getPattern() != null ? q.getPattern().getName() : ""
        )).toList();
        return ApiResponse.success(questionResponseList, "Request Success", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody AddQuestionDto req) {
        long categoryId = req.getCategoryId();
        long sheetId = req.getSheetId();
        long questionPatternId = req.getQuestionPatternId();

        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found!"));
        Sheet sheet = sheetRepository.findById(sheetId).orElseThrow(() -> new ResourceNotFoundException("Sheet not found!"));
        Optional<QuestionPattern> questionPattern = questionPatternRepository.findById(questionPatternId);

        Question question = new Question();
        question.setLink(req.getLink());
        question.setTitle(req.getTitle());
        question.setCategory(category);
        question.setDifficulty(req.getDifficulty());
        questionPattern.ifPresent(question::setPattern);
        questionRepository.save(question);

        SheetQuestion sheetQuestion = new SheetQuestion();
        sheetQuestion.setSheet(sheet);
        sheetQuestion.setQuestion(question);
        sheetQuestionRepository.save(sheetQuestion);

        return ResponseEntity.ok(question);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody AddQuestionDto req) {
        // Fetch existing question
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found!"));

        // Update basic fields
        question.setTitle(req.getTitle());
        question.setLink(req.getLink());
        question.setDifficulty(req.getDifficulty());

        // Update category if provided
        if (req.getCategoryId() != 0) {
            Category category = categoryRepository.findById(req.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found!"));
            question.setCategory(category);
        }

        // Update pattern if provided
        if (req.getQuestionPatternId() != 0) {
            Optional<QuestionPattern> pattern = questionPatternRepository.findById(req.getQuestionPatternId());
            pattern.ifPresent(question::setPattern);
        }

        // Save the updated question
        questionRepository.save(question);

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


    @GetMapping("/random")
    public ApiResponse<Question> getRandomQuestion(
            @RequestParam(name = "categoryId", required = false) Long categoryId,
            @RequestParam(name = "lastQuestionId", required = false) Long lastQuestionId) {
            Question question = questionService.getRandomQuestion(categoryId, lastQuestionId).orElseThrow(() -> new ResourceNotFoundException("Question not found!"));
        return ApiResponse.success(question, "Request success", HttpStatus.OK);
    }

}
