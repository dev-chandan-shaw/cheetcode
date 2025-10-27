package com.practice.cheetcode.dto;

import lombok.Data;

@Data
public class CreateQuestionPatternRequest {
    private String name;
    private long categoryId;
}
