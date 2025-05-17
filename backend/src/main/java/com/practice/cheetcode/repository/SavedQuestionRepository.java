package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.SavedQuestion;
import com.practice.cheetcode.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedQuestionRepository extends JpaRepository<SavedQuestion, Long> {
    List<SavedQuestion> findByUser(User user);
    void deleteByQuestionAndUser(Question question, User user);
}
