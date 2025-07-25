package com.practice.cheetcode.controller;


import com.practice.cheetcode.Exception.BadRequestException;
import com.practice.cheetcode.Exception.ResourceNotFoundException;
import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.dto.CreateSheetQuestionRequest;
import com.practice.cheetcode.dto.PageResponse;
import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.Sheet;
import com.practice.cheetcode.entity.SheetQuestion;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.QuestionRepository;
import com.practice.cheetcode.repository.SheetQuestionRepository;
import com.practice.cheetcode.repository.SheetRepository;
import com.practice.cheetcode.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/sheet-question")
public class SheetQuestionController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SheetQuestionRepository sheetQuestionRepository;

    @Autowired
    private SheetRepository sheetRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping
    public ApiResponse<?> createSheetQuestion(@RequestBody CreateSheetQuestionRequest req, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResourceNotFoundException("User not found!"));
        Sheet sheet = sheetRepository.findById(req.getSheetId()).orElseThrow(() -> new ResourceNotFoundException("Sheet not found!"));

        if (sheet.getCreatedBy().getId() != user.getId()) {
            throw new BadRequestException("You are not the creator of this sheet!");
        }

        Question question = questionRepository.findById(req.getQuestionId()).orElseThrow(() -> new ResourceNotFoundException("Question not found!"));

        SheetQuestion sheetQuestion = sheetQuestionRepository.findBySheetAndQuestion(sheet, question);
        if (sheetQuestion != null) {
            throw new BadRequestException("Question already exists!");
        }

        sheetQuestion = new SheetQuestion();
        sheetQuestion.setSheet(sheet);
        sheetQuestion.setQuestion(question);
        sheetQuestionRepository.save(sheetQuestion);
        return ApiResponse.success(sheetQuestion, "Sheet Question Created Successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/sheet/{sheetId}")
    public ApiResponse<?> getSheetQuestions(
            @PathVariable long sheetId,
            @RequestParam(required = false) Long categoryId,
            @PageableDefault(size = 20) Pageable pageable) {

        Page<SheetQuestion> page;

        if (categoryId == null) {
            page = sheetQuestionRepository.findBySheetId(sheetId, pageable);
        } else {
            page = sheetQuestionRepository.findBySheetIdAndCategoryId(sheetId, categoryId, pageable);
        }

        PageResponse<SheetQuestion> pageResponse = new PageResponse<>(
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
