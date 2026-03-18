package com.queue.controller;

import com.queue.repository.UserRepository;
import com.queue.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping
    public Object notifications(Authentication authentication) {
        Long userId = userRepository.findByEmail(authentication.getName()).orElseThrow().getId();
        return notificationService.getForUser(userId);
    }
}
