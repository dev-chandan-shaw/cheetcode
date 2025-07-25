package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findByCategoryId(long categoryId, Pageable pageable);
}

