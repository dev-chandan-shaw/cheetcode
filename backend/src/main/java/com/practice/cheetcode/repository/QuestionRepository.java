package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Category;
import com.practice.cheetcode.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findByCategoryIdAndApproved(long categoryId, Pageable pageable, boolean approved);
    Page<Question> findByApproved(Pageable pageable, boolean approved);

    Page<Question> findByApprovedAndArchived(Pageable pageable, boolean approved, boolean archived);

    @Query(value = "SELECT * FROM question WHERE approved = true AND archived = false ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<Question> findRandomQuestion();

    /**
     * Fetches one random, approved, and non-archived question from a specific category by its name.
     */
    @Query(value = """
        SELECT q.* FROM question q
        JOIN category c ON q.category_id = c.id
        WHERE c.id = :categoryId
        AND q.approved = true
        AND q.archived = false
        ORDER BY RANDOM()
        LIMIT 1
    """, nativeQuery = true)
    Optional<Question> findRandomQuestionByCategory(@Param("categoryId") long categoryId);

    // --- NEW: Methods to exclude a specific question ID ---
    @Query(value = "SELECT * FROM question WHERE approved = true AND archived = false AND id != :excludeId ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<Question> findRandomQuestionExcludingId(@Param("excludeId") long excludeId);

    @Query(value = """
        SELECT q.* FROM question q JOIN category c ON q.category_id = c.id
        WHERE c.id = :categoryId AND q.approved = true AND q.archived = false AND q.id != :excludeId
        ORDER BY RANDOM() LIMIT 1
    """, nativeQuery = true)
    Optional<Question> findRandomQuestionByCategoryExcludingId(@Param("categoryId") long categoryId, @Param("excludeId") long excludeId);
}


