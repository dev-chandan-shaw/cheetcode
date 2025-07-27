package com.practice.cheetcode.dto;

import com.practice.cheetcode.entity.QuestionDifficulty;
import lombok.Data;

@Data
public class AddQuestionDto {
    private String title;
    private String link;
    private long categoryId;
    private QuestionDifficulty difficulty;
    private long sheetId;
}
