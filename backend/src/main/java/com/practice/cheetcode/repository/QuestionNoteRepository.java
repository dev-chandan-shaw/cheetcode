package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.QuestionNote;
import com.practice.cheetcode.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionNoteRepository extends JpaRepository<QuestionNote, Long> {
    Optional<QuestionNote> findByQuestionAndUser(Question question, User user);
}
