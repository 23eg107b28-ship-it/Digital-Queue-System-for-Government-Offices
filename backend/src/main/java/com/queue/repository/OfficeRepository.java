package com.queue.repository;

import com.queue.entity.Office;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRepository extends JpaRepository<Office, Long> {
}
