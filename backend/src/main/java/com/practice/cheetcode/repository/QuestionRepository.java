package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Category;
import com.practice.cheetcode.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCategoryId(long categoryId);
}

