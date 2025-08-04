package com.hospital.management.controller;

import com.hospital.management.entity.Bill;
import com.hospital.management.entity.Patient;
import com.hospital.management.repository.BillRepository;
import com.hospital.management.repository.PatientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"https://hospitalmanagement-q87w.onrender.com/api/bills"})  // Allow frontend access

@RestController
@RequestMapping("/api/bills")
public class BillController {

    private final BillRepository billRepository;
    private final PatientRepository patientRepository;

    public BillController(BillRepository billRepository, PatientRepository patientRepository) {
        this.billRepository = billRepository;
        this.patientRepository = patientRepository;
    }

    @PostMapping
    public Bill createBill(@RequestBody Bill bill) {
        Long patientId = bill.getPatient().getId();
        Patient fullPatient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        bill.setPatient(fullPatient);
        return billRepository.save(bill);
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    @GetMapping("/{id}")
    public Bill getBillById(@PathVariable Long id) {
        return billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));
    }

    @PutMapping("/{id}")
    public Bill updateBill(@PathVariable Long id, @RequestBody Bill updatedBill) {
        Bill bill = billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));

        bill.setAmount(updatedBill.getAmount());
        bill.setDate(updatedBill.getDate());
        bill.setDescription(updatedBill.getDescription());

        Long patientId = updatedBill.getPatient().getId();
        Patient fullPatient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        bill.setPatient(fullPatient);

        return billRepository.save(bill);
    }

    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable Long id) {
        billRepository.deleteById(id);
    }

    // Delete ALL bills at once
    @DeleteMapping
    public void deleteAllBills() {
        billRepository.deleteAll();
    }
}
