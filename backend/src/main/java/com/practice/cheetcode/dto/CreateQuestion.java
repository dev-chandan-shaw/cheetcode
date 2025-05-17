package com.practice.cheetcode.dto;

import lombok.Data;

@Data
public class CreateQuestion {
    private String title;
    private String link;
    private long categoryId;
}
