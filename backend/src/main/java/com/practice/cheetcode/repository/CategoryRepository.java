package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Category;
import com.practice.cheetcode.entity.UserQuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByNameIgnoreCase(String name);
}


