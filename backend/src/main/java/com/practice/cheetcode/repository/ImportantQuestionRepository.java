package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.ImportantQuestion;
import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImportantQuestionRepository extends JpaRepository<ImportantQuestion, Long> {
    List<ImportantQuestion> findByUser(User user);
    void deleteByQuestionAndUser(Question question, User user);
}
