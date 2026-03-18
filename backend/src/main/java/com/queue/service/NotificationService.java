package com.queue.service;

import com.queue.entity.Notification;
import com.queue.entity.User;
import com.queue.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final JavaMailSender mailSender;

    public Notification create(User user, String title, String message, String type) {
        Notification notification = notificationRepository.save(Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(type)
                .build());
        messagingTemplate.convertAndSend("/topic/notifications/" + user.getId(), notification);
        return notification;
    }

    public List<Notification> getForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void sendEmail(String to, String subject, String body) {
        // Production email integration hook.
    }

    public void sendSms(String phoneNumber, String message) {
        // Optional SMS integration hook.
    }
}
