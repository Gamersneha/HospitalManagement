package com.hospital.management.repository;

import com.hospital.management.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Long> {
    // Optional: add custom methods if needed
}
