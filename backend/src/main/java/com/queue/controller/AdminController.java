package com.queue.controller;

import com.queue.dto.AdminDtos;
import com.queue.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/offices")
    public Object createOffice(@RequestBody AdminDtos.OfficeRequest request) {
        return adminService.createOffice(request);
    }

    @PostMapping("/departments")
    public Object createDepartment(@RequestBody AdminDtos.DepartmentRequest request) {
        return adminService.createDepartment(request);
    }

    @PostMapping("/services")
    public Object createService(@RequestBody AdminDtos.ServiceRequest request) {
        return adminService.createService(request);
    }

    @PostMapping("/counters")
    public Object createCounter(@RequestBody AdminDtos.CounterRequest request) {
        return adminService.createCounter(request);
    }

    @GetMapping("/analytics")
    public Object analytics() {
        return adminService.getAnalytics();
    }
}
