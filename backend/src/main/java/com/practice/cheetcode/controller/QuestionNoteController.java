package com.practice.cheetcode.controller;

import com.practice.cheetcode.dto.AddQuestionNoteRequest;
import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.QuestionNote;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.QuestionNoteRepository;
import com.practice.cheetcode.repository.QuestionRepository;
import com.practice.cheetcode.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("api/question-note")
public class QuestionNoteController {
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionNoteRepository questionNoteRepository;

    @PostMapping
    public ResponseEntity<?> addQuestionNote(@RequestBody AddQuestionNoteRequest req, Principal principal) {

        Optional<Question> questionOptional = questionRepository.findById(req.getQuestionId());
        if (questionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not exist with id: " + req.getQuestionId());
        }

        Optional<User> userOptional = userRepository.findByEmail(principal.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not exist");
        }

        Question question = questionOptional.get();
        User user = userOptional.get();

        Optional<QuestionNote> questionNoteOptional = questionNoteRepository.findByQuestionAndUser(question, user);

        QuestionNote questionNote;
        if (questionNoteOptional.isPresent()) {
            // Update existing note
            questionNote = questionNoteOptional.get();
            questionNote.setNote(req.getNote());
        } else {
            // Create new note
            questionNote = new QuestionNote();
            questionNote.setQuestion(question);
            questionNote.setUser(user);
            questionNote.setNote(req.getNote());
        }

        questionNoteRepository.save(questionNote);

        return ResponseEntity.ok(questionNote);
    }

    @GetMapping()
    public ResponseEntity<?> getAllQuestionNote(Principal principal) {
        Optional<User> userOptional = userRepository.findByEmail(principal.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not exist");
        }
        User user = userOptional.get();
        return ResponseEntity.ok(questionNoteRepository.findByUser(user));
    }

}
