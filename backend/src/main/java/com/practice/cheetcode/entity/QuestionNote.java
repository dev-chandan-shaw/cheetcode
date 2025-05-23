package com.practice.cheetcode.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class QuestionNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String note;

    @ManyToOne
    private Question question;
    @ManyToOne
    private User user;
}
