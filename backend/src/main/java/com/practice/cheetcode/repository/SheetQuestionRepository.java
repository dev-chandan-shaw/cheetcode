package com.practice.cheetcode.repository;

import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.Sheet;
import com.practice.cheetcode.entity.SheetQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
}
