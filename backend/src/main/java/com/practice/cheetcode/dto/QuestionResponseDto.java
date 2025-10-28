package com.practice.cheetcode.dto;

import com.practice.cheetcode.entity.QuestionDifficulty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestionResponseDto {
    private long id;
    private String title;
    private String link;
    private long categoryId;
    private QuestionDifficulty difficulty;
    private boolean isApproved;
    private boolean isArchived;
    private String patternName;
    private Long patternId;
}


