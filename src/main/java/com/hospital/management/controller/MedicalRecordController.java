package com.hospital.management.controller;

import com.hospital.management.entity.MedicalRecord;
import com.hospital.management.repository.MedicalRecordRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")  // Allow frontend access
@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {

    private final MedicalRecordRepository medicalRecordRepository;

    public MedicalRecordController(MedicalRecordRepository medicalRecordRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
    }

    @PostMapping
    public MedicalRecord create(@RequestBody MedicalRecord record) {
        return medicalRecordRepository.save(record);
    }

    @GetMapping
    public List<MedicalRecord> getAll() {
        return medicalRecordRepository.findAll();
    }

    @GetMapping("/{id}")
    public MedicalRecord getById(@PathVariable Long id) {
        return medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));
    }

    @PutMapping("/{id}")
    public MedicalRecord update(@PathVariable Long id, @RequestBody MedicalRecord updatedRecord) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        record.setDiagnosis(updatedRecord.getDiagnosis());
        record.setTreatmentGiven(updatedRecord.getTreatmentGiven());
        record.setPrescription(updatedRecord.getPrescription());
        record.setDate(updatedRecord.getDate());
        record.setPatient(updatedRecord.getPatient());

        return medicalRecordRepository.save(record);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        medicalRecordRepository.deleteById(id);
    }
}
