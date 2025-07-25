package com.practice.cheetcode.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = "user_question_status",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "question_id"})
        }
)
public class UserQuestionStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonProperty("isMarkedForRevision")
    private boolean revision;

    @JsonProperty("isSolved")
    private boolean solved;

    @Column(length = 2000) // You can adjust based on average word length
    private String note;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
