package com.practice.cheetcode.service;

import com.practice.cheetcode.dto.UserQuestionStatusDto;
import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.entity.UserQuestionStatus;
import com.practice.cheetcode.repository.QuestionRepository;
import com.practice.cheetcode.repository.UserQuestionStatusRepository;
import com.practice.cheetcode.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserQuestionStatusService {

    @Autowired
    private UserQuestionStatusRepository userQuestionStatusRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Transactional
    public UserQuestionStatus updateStatus(String email, UserQuestionStatusDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Question question = questionRepository.findById(dto.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        UserQuestionStatus status = userQuestionStatusRepository
                .findByQuestionIdAndUserId(question.getId(), user.getId())
                .orElseGet(() -> {
                    UserQuestionStatus s = new UserQuestionStatus();
                    s.setUser(user);
                    s.setQuestion(question);
                    return s;
                });

        if (dto.getRevision() != null) status.setRevision(dto.getRevision());
        if (dto.getSolved() != null) status.setSolved(dto.getSolved());
        if (dto.getNote() != null) status.setNote(dto.getNote());

        userQuestionStatusRepository.save(status);
        return status;
    }
}
