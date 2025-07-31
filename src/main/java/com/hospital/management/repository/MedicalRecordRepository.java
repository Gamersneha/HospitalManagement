package com.hospital.management.repository;

import com.hospital.management.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    // Optional: Add custom query if needed, like:
    // List<MedicalRecord> findByPatientId(Long patientId);
}
