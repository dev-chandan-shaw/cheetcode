package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.QuestionPattern;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionPatternRepository extends JpaRepository<QuestionPattern, Long> {
}
