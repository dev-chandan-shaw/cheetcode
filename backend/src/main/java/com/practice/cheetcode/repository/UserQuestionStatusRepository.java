package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.UserQuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserQuestionStatusRepository extends JpaRepository<UserQuestionStatus, Long> {
    Optional<UserQuestionStatus> findByQuestionIdAndUserId(Long questionId, Long userId);
    List<UserQuestionStatus> findByUserId(Long userId);
}
