package com.hospital.management.repository;

import com.hospital.management.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // You can add custom query methods here if needed (e.g., findByDoctorId, etc.)
}
