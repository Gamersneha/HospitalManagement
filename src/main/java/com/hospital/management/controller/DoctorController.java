package com.hospital.management.controller;

import com.hospital.management.entity.Doctor;
import com.hospital.management.repository.DoctorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorRepository repo;

    public DoctorController(DoctorRepository repo) {
        this.repo = repo;
    }

    // CREATE
    @PostMapping
    public Doctor create(@RequestBody Doctor doctor) {
        return repo.save(doctor);
    }

    // READ ALL
    @GetMapping
    public List<Doctor> getAll() {
        return repo.findAll();
    }

    // READ ONE (optional)
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> update(@PathVariable Long id, @RequestBody Doctor updatedDoctor) {
        Optional<Doctor> optionalDoctor = repo.findById(id);
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            doctor.setName(updatedDoctor.getName());
            doctor.setSpecialization(updatedDoctor.getSpecialization());
            doctor.setContactNumber(updatedDoctor.getContactNumber());
            doctor.setAvailability(updatedDoctor.getAvailability());
            return ResponseEntity.ok(repo.save(doctor));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
