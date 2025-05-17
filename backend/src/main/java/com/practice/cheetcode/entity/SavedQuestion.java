package com.practice.cheetcode.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SavedQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Question question;
    @ManyToOne
    private User user;
}
