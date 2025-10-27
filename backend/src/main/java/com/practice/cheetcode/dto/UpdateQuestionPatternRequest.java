package com.practice.cheetcode.dto;

import lombok.Data;

@Data
public class UpdateQuestionPatternRequest {
    private Long id;
    private String name;
    private Long categoryId;
}
