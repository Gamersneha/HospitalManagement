package com.hospital.management.controller;

import com.hospital.management.entity.Patient;
import com.hospital.management.repository.PatientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")  // Allow frontend
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Create a new patient (with status field)
    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        // Default status if none is provided
        if (patient.getStatus() == null || patient.getStatus().isEmpty()) {
            patient.setStatus("None");
        }
        return patientRepository.save(patient);
    }

    // Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get a patient by ID
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + id));
    }

    // Update patient (with status)
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient updatedPatient) {
        Patient existing = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + id));

        existing.setName(updatedPatient.getName());
        existing.setAge(updatedPatient.getAge());
        existing.setGender(updatedPatient.getGender());
        existing.setAddress(updatedPatient.getAddress());
        existing.setPhone(updatedPatient.getPhone());
        existing.setStatus(updatedPatient.getStatus() != null ? updatedPatient.getStatus() : "None");

        return patientRepository.save(existing);
    }

    // Delete a patient
    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientRepository.deleteById(id);
    }
}
