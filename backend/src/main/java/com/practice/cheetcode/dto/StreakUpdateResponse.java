package com.practice.cheetcode.dto;

import com.practice.cheetcode.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StreakUpdateResponse {
    private User user;
    private boolean streakUpdated;
}