package com.queue.config;

import com.queue.entity.*;
import com.queue.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final OfficeRepository officeRepository;
    private final DepartmentRepository departmentRepository;
    private final GovServiceRepository govServiceRepository;
    private final CounterRepository counterRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        User admin = userRepository.save(User.builder()
                .fullName("System Admin")
                .email("admin@govqueue.com")
                .phoneNumber("9000000001")
                .password(passwordEncoder.encode("Admin@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_ADMIN)
                .enabled(true)
                .build());

        User staff = userRepository.save(User.builder()
                .fullName("Counter Staff")
                .email("staff@govqueue.com")
                .phoneNumber("9000000002")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build());

        userRepository.save(User.builder()
                .fullName("Citizen User")
                .email("citizen@govqueue.com")
                .phoneNumber("9000000003")
                .password(passwordEncoder.encode("Citizen@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_CITIZEN)
                .enabled(true)
                .build());

        Office office = officeRepository.save(Office.builder()
                .name("Hyderabad Citizen Service Center")
                .address("Road No. 1, Banjara Hills")
                .city("Hyderabad")
                .state("Telangana")
                .contactNumber("04012345678")
                .active(true)
                .build());

        Department revenue = departmentRepository.save(Department.builder()
                .office(office)
                .name("Revenue Department")
                .description("Certificates and land records")
                .build());

        Department transport = departmentRepository.save(Department.builder()
                .office(office)
                .name("Transport Department")
                .description("Driving license and vehicle services")
                .build());

        govServiceRepository.save(GovService.builder()
                .department(revenue)
                .name("Income Certificate")
                .description("Issue and renewal of income certificates")
                .avgServiceTimeMinutes(12)
                .prioritySupported(true)
                .feeAmount(new BigDecimal("50.00"))
                .build());

        govServiceRepository.save(GovService.builder()
                .department(transport)
                .name("Driving License Renewal")
                .description("DL renewal service")
                .avgServiceTimeMinutes(15)
                .prioritySupported(true)
                .feeAmount(new BigDecimal("200.00"))
                .build());

        counterRepository.save(Counter.builder()
                .office(office)
                .department(revenue)
                .assignedStaff(staff)
                .name("Counter A1")
                .status("ACTIVE")
                .build());
    }
}
