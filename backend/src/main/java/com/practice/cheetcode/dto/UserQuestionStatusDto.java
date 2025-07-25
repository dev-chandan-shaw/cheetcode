package com.practice.cheetcode.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
@Data
public class UserQuestionStatusDto {
    private Long questionId;
    @JsonProperty("isMarkedForRevision")
    private Boolean revision;
    @JsonProperty("isSolved")
    private Boolean solved;
    private String note;
}
