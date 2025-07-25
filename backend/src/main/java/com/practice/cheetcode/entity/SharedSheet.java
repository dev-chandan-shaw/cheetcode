package com.practice.cheetcode.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class SharedSheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Sheet sheet;

    @ManyToOne
    @JsonIgnore
    private User sharedWith;

    public SharedSheet(Sheet sheet, User sharedWith) {
        this.sheet = sheet;
        this.sharedWith = sharedWith;
    }
}
