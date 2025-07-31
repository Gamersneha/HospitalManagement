package com.hospital.management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String name;
    private int age;
    private String gender;
    private String address;
    private String phone;

    private String status; // ✅ Add this if it's missing

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @JsonIgnore

    private List<Appointment> appointments;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<MedicalRecord> medicalRecords;
}
