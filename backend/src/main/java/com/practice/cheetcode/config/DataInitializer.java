//package com.practice.cheetcode.config;
//
//import com.practice.cheetcode.entity.Question;
//import com.practice.cheetcode.entity.Role;
//import com.practice.cheetcode.entity.User;
//import com.practice.cheetcode.repository.QuestionRepository;
//import com.practice.cheetcode.repository.RoleRepository;
//import com.practice.cheetcode.repository.UserRepository;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//@Component
//public class DataInitializer implements ApplicationRunner {
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Override
//    @Transactional
//    public void run(ApplicationArguments args) throws Exception {
//        List<User> users = userRepository.findAll();
//        Role userRole = roleRepository.findByName("ROLE_USER")
//                .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));
//
//        for (User user : users) {
//            if (user.getRoles().isEmpty()) {
//                user.getRoles().add(userRole);
//                userRepository.save(user);
//            }
//        }
//    }
//}
