package com.practice.cheetcode.controller;

import com.practice.cheetcode.entity.ImportantQuestion;
import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.SavedQuestion;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.ImportantQuestionRepository;
import com.practice.cheetcode.repository.QuestionRepository;
import com.practice.cheetcode.repository.SavedQuestionRepository;
import com.practice.cheetcode.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/saved-question")
public class SavedQuestionController {
    @Autowired
    private SavedQuestionRepository savedQuestionRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> addQuestion(@RequestParam long questionId, Principal principal) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not exist");
        }

        Optional<User> userOptional = userRepository.findByEmail(principal.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not exist");
        }

        Question question = questionOptional.get();
        User user = userOptional.get();

        SavedQuestion savedQuestion = new SavedQuestion();
        savedQuestion.setQuestion(question);
        savedQuestion.setUser(user);
        savedQuestionRepository.save(savedQuestion);
        return ResponseEntity.ok(savedQuestion);
    }

    @GetMapping
    public ResponseEntity<?> getQuestions(Principal principal) {
        Optional<User> userOptional = userRepository.findByEmail(principal.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not exist");
        }
        User user = userOptional.get();
        List<SavedQuestion> savedQuestions = savedQuestionRepository.findByUser(user);
        List<Question> questions = savedQuestions.stream().map(SavedQuestion::getQuestion).toList();
        return ResponseEntity.ok(questions);
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<?> removeSavedQuestion(@RequestParam long questionId, Principal principal) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not exist");
        }
        Optional<User> userOptional = userRepository.findByEmail(principal.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not exist");
        }
        User user = userOptional.get();
        Question question = questionOptional.get();
        savedQuestionRepository.deleteByQuestionAndUser(question, user);
        return ResponseEntity.ok("Deleted Successfully");
    }
}
