package com.practice.cheetcode.dto;

import lombok.Getter;

@Getter
public class AddQuestionNoteRequest {
    private long questionId;
    private String note;
}
