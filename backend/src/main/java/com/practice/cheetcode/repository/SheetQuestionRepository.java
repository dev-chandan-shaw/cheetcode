package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.Sheet;
import com.practice.cheetcode.entity.SheetQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SheetQuestionRepository extends JpaRepository<SheetQuestion, Long> {
    @Query("""
                SELECT sq FROM SheetQuestion sq
                WHERE sq.sheet.id = :sheetId
                AND sq.question.category.id = :categoryId
            """)
    Page<SheetQuestion> findBySheetIdAndCategoryId(
            @Param("sheetId") Long sheetId,
            @Param("categoryId") Long categoryId,
            Pageable pageable
    );


    Page<SheetQuestion> findBySheetId(long sheetId, Pageable pageable);

    SheetQuestion findBySheetAndQuestion(Sheet sheet, Question question);

    List<SheetQuestion> findBySheetId(long sheetId);

    @Query(value = """
    SELECT q.* 
    FROM sheet_question sq
    JOIN question q ON sq.question_id = q.id
    JOIN category c ON q.category_id = c.id
    WHERE sq.sheet_id = :sheetId
      AND c.id = :categoryId
      AND q.approved = true
      AND q.archived = false
      AND q.id != :excludeId
    ORDER BY RANDOM()
    LIMIT 1
""", nativeQuery = true)
    Optional<Question> findRandomQuestionByCategoryAndSheetExcludingId(
            @Param("sheetId") Long sheetId,
            @Param("categoryId") Long categoryId,
            @Param("excludeId") Long excludeId);


    @Query(value = """
    SELECT q.* 
    FROM sheet_question sq
    JOIN question q ON sq.question_id = q.id
    WHERE sq.sheet_id = :sheetId
      AND q.approved = true
      AND q.archived = false
      AND q.id != :excludeId
    ORDER BY RANDOM()
    LIMIT 1
""", nativeQuery = true)
    Optional<Question> findRandomQuestionExcludingId(
            @Param("excludeId") Long lastQuestionId,
            @Param("sheetId") Long sheetId);

    @Query(value = """
    SELECT q.* 
    FROM question q
    JOIN category c ON q.category_id = c.id
    WHERE c.id = :categoryId
      AND q.approved = true
      AND q.archived = false
    ORDER BY RANDOM()
    LIMIT 1
""", nativeQuery = true)
    Optional<Question> findRandomQuestionByCategory(@Param("categoryId") Long categoryId);

    @Query(value = """
    SELECT * 
    FROM question
    WHERE approved = true
      AND archived = false
    ORDER BY RANDOM()
    LIMIT 1
""", nativeQuery = true)
    Optional<Question> findRandomQuestion();

}
