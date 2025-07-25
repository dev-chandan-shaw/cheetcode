package com.practice.cheetcode.controller;

import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.dto.UserQuestionStatusDto;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.entity.UserQuestionStatus;
import com.practice.cheetcode.repository.UserQuestionStatusRepository;
import com.practice.cheetcode.repository.UserRepository;
import com.practice.cheetcode.service.UserQuestionStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/user-question-status")
public class UserQuestionStatusController {

    @Autowired
    private UserQuestionStatusService userQuestionStatusService;

    @Autowired
    private UserQuestionStatusRepository userQuestionStatusRepository;

    @Autowired
    private UserRepository userRepository;

    @PatchMapping
    public ApiResponse<?> updateStatus(@RequestBody UserQuestionStatusDto dto, Principal principal) {
        UserQuestionStatus status = userQuestionStatusService.updateStatus(principal.getName(), dto);
        return ApiResponse.success(status, "Updated", HttpStatus.OK);
    }

    @GetMapping
    public ApiResponse<?> getStatus(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));
        List<UserQuestionStatus> statuses = userQuestionStatusRepository.findByUserId(user.getId());
        return ApiResponse.success(statuses, "Get Status", HttpStatus.OK);
    }
}
