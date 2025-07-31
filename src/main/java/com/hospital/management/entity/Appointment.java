package com.hospital.management.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    @JsonIgnoreProperties({"appointments", "medicalRecords"}) // Avoid circular JSON
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    @JsonIgnoreProperties({"appointments"})
    private Doctor doctor;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate appointmentDate;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime appointmentTime;

    private String reason;
    private String status;
}
