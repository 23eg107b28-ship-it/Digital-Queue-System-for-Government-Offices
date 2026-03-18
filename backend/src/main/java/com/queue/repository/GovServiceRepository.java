package com.queue.repository;

import com.queue.entity.GovService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GovServiceRepository extends JpaRepository<GovService, Long> {
    List<GovService> findByDepartmentId(Long departmentId);
}
