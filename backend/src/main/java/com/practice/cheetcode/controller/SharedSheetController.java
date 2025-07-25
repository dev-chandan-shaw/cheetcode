package com.practice.cheetcode.controller;

import com.practice.cheetcode.Exception.BadRequestException;
import com.practice.cheetcode.dto.ApiResponse;
import com.practice.cheetcode.entity.SharedSheet;
import com.practice.cheetcode.entity.Sheet;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.SharedSheetRepository;
import com.practice.cheetcode.repository.SheetRepository;
import com.practice.cheetcode.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/shared-sheet")
public class SharedSheetController {

    @Autowired
    private SheetRepository sheetRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private SharedSheetRepository sharedSheetRepository;


    @RequestMapping("/join/{slug}")
    public ApiResponse<?> acceptSharedSheet(@PathVariable String slug, Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Sheet sheet = sheetRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Sheet not found!"));

        if (sheet.getCreatedBy().getId() == user.getId()) {
            throw new BadRequestException("You already have joined this sheet!");
        }

        Optional<SharedSheet> optionalSharedSheet = sharedSheetRepository.findBySheetAndSharedWith(sheet, user);
        if (optionalSharedSheet.isPresent()) {
            throw new BadRequestException("You already have joined this sheet!");
        }

        SharedSheet sharedSheet = new SharedSheet(sheet, user);

        sharedSheetRepository.save(sharedSheet);

        return ApiResponse.success(sharedSheet.getSheet(), "Sheet accepted successfully!", HttpStatus.CREATED);
    }

    @GetMapping
    public ApiResponse<?> getAllSharedSheet(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        List<Sheet> sharedSheets = sharedSheetRepository.findAllBySharedWith(user).stream().map(SharedSheet::getSheet).toList();

        return ApiResponse.success(sharedSheets, "Request success", HttpStatus.OK);
    }

}
