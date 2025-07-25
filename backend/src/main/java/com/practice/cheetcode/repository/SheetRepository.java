package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Sheet;
import com.practice.cheetcode.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SheetRepository extends JpaRepository<Sheet, Long> {
    Optional<Sheet> findBySlug(String slug);

    List<Sheet> findByCreatedBy(User user);
}

