package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.SharedSheet;
import com.practice.cheetcode.entity.Sheet;
import com.practice.cheetcode.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SharedSheetRepository extends JpaRepository<SharedSheet, Long> {
    Optional<SharedSheet> findBySheetAndSharedWith(Sheet sheet, User user);

    List<SharedSheet> findAllBySharedWith(User user);
}
