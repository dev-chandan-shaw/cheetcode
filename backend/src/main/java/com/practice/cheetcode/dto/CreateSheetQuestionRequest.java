package com.practice.cheetcode.dto;

import lombok.Data;

@Data
public class CreateSheetQuestionRequest {
    private long questionId;
    private Long sheetId;
    private String sheetSlug;
}
