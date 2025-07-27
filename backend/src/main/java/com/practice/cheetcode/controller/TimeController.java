package com.practice.cheetcode.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import java.time.ZoneOffset;

@RestController
public class TimeController {
    @GetMapping("/api/v1/time/today")
    public LocalDate getCurrentUtcDate() {
        // Always return the date in UTC
        return LocalDate.now(ZoneOffset.UTC);
    }
}