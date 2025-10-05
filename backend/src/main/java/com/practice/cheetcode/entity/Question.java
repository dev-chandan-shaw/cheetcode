package com.practice.cheetcode.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = "question",
        indexes = {
                @Index(name = "idx_question_approved", columnList = "approved")
        }
)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private String link;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;

    private QuestionDifficulty difficulty;

    @JsonProperty("isApproved")
    private boolean approved;

    @JsonProperty("isArchived")
    private boolean archived;

    @ManyToOne
    @JoinColumn(name = "question_pattern_id")
    @JsonBackReference
    private QuestionPattern pattern;

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", link='" + link + '\'' +
                ", category=" + category.getName() +
                ", difficulty=" + difficulty +
                ", approved=" + approved +
                ", archived=" + archived +
                '}';
    }
}
