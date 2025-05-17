package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Category;
import com.practice.cheetcode.entity.SavedQuestion;
import com.practice.cheetcode.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}

