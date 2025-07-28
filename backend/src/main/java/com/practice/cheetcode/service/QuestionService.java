package com.practice.cheetcode.service;

import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Optional<Question> getRandomQuestion(Long categoryId, Long lastQuestionId) {
        // If a last question ID is provided, try to find a different one first.
        if (lastQuestionId != null) {
            Optional<Question> newQuestion;
            if (categoryId != null) {
                newQuestion = questionRepository.findRandomQuestionByCategoryExcludingId(categoryId, lastQuestionId);
            } else {
                newQuestion = questionRepository.findRandomQuestionExcludingId(lastQuestionId);
            }

            // If we found a new question, great! Return it.
            // If not, it might be the only question available. Fall back to the original method.
            if (newQuestion.isPresent()) {
                return newQuestion;
            }
        }

        // Fallback logic: either no lastQuestionId was given, or it was the only one available.
        if (categoryId != null) {
            return questionRepository.findRandomQuestionByCategory(categoryId);
        } else {
            return questionRepository.findRandomQuestion();
        }
    }
}