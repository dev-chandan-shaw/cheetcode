package com.practice.cheetcode.controller;

import com.practice.cheetcode.entity.ImportantQuestion;
import com.practice.cheetcode.entity.Question;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.ImportantQuestionRepository;
import com.practice.cheetcode.repository.QuestionRepository;
import com.practice.cheetcode.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/important-question")
public class ImportantQuestionController {

    @Autowired
    private ImportantQuestionRepository importantQuestionRepository;

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
        ImportantQuestion importantQuestion = new ImportantQuestion();
        importantQuestion.setQuestion(question);
        importantQuestion.setUser(user);
        importantQuestionRepository.save(importantQuestion);
        return ResponseEntity.ok(importantQuestion);
    }

    @GetMapping
    public ResponseEntity<?>  getQuestions(Principal principal) {
        Optional<User> userOptional = userRepository.findByEmail(principal.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not exist");
        }
        User user = userOptional.get();
        List<ImportantQuestion> importantQuestions = importantQuestionRepository.findByUser(user);
        List<Question> questions = importantQuestions.stream().map(ImportantQuestion::getQuestion).toList();
        return ResponseEntity.ok(questions);
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<?> removeQuestion(@RequestParam long questionId, Principal principal) {
        Optional<User> userOptional = userRepository.findByEmail(principal.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not exist");
        }
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question does not exist");
        }
        User user = userOptional.get();
        Question question = questionOptional.get();
        importantQuestionRepository.deleteByQuestionAndUser(question, user);
        return ResponseEntity.ok("Deleted Successfully");
    }
}
