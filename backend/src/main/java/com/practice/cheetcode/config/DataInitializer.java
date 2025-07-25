// Create a new file, e.g., in a 'config' or 'startup' package
package com.practice.cheetcode.config;

import com.practice.cheetcode.entity.*;
import com.practice.cheetcode.repository.QuestionNoteRepository;
import com.practice.cheetcode.repository.QuestionRepository;
import com.practice.cheetcode.repository.UserQuestionStatusRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class DataInitializer implements ApplicationRunner {

    private final QuestionNoteRepository questionNoteRepository;

    private final UserQuestionStatusRepository userQuestionStatusRepository;

    public DataInitializer(QuestionNoteRepository questionNoteRepository, UserQuestionStatusRepository userQuestionStatusRepository) {
        this.questionNoteRepository = questionNoteRepository;
        this.userQuestionStatusRepository = userQuestionStatusRepository;
    }

    @Override
    @Transactional // Use a transaction to ensure all changes are saved together
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("Checking for questions with missing difficulty...");

        List<QuestionNote> questionNotes = questionNoteRepository.findAll();
        for (QuestionNote questionNote : questionNotes) {
            String note = questionNote.getNote();
            User user = questionNote.getUser();
            UserQuestionStatus userQuestionStatus = new UserQuestionStatus();
            userQuestionStatus.setNote(note);
            userQuestionStatus.setQuestion(questionNote.getQuestion());
            userQuestionStatus.setUser(user);
            userQuestionStatusRepository.save(userQuestionStatus);
        }

    }
}