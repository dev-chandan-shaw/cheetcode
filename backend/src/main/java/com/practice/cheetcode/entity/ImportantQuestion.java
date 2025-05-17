package com.practice.cheetcode.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ImportantQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Question question;
}
