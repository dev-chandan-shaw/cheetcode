package com.practice.cheetcode.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionPatternResponse {
    private Long id;
    private String name;
    private Long categoryId;
}
