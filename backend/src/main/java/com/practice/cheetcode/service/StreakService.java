package com.practice.cheetcode.service;

// StreakService.java

import com.practice.cheetcode.dto.StreakUpdateResponse;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneOffset;

@Service
public class StreakService {

    @Autowired
    private UserRepository userRepository;

    // StreakService.java
    @Transactional
    public StreakUpdateResponse updateStreak(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        LocalDate today = LocalDate.now(ZoneOffset.UTC);
        LocalDate lastVisit = user.getLastVisitDate();

        // If the user already visited today, no update is needed.
        if (lastVisit != null && lastVisit.equals(today)) {
            return new StreakUpdateResponse(user, false); // `streakUpdated` is false
        }

        // --- Streak update logic ---
        if (lastVisit != null && lastVisit.equals(today.minusDays(1))) {
            user.setStreakCount(user.getStreakCount() + 1);
        } else {
            user.setStreakCount(1);
        }
        user.setLastVisitDate(today);
        User updatedUser = userRepository.save(user);

        // The streak was updated, so the flag is true.
        return new StreakUpdateResponse(updatedUser, true); // `streakUpdated` is true
    }
}