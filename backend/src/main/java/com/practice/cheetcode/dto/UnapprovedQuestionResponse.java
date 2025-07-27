package com.practice.cheetcode.dto;

import com.practice.cheetcode.entity.Question;
import lombok.Data;

@Data
public class UnapprovedQuestionResponse {
    private long id;
    private String title;
    private String link;
    private String difficulty;
    private String category;

    public UnapprovedQuestionResponse(Question question) {
        this.id = question.getId();
        this.title = question.getTitle();
        this.link = question.getLink();
        this.difficulty = question.getDifficulty().name();
        this.category = question.getCategory().getName();
    }

    public UnapprovedQuestionResponse() {}
}
