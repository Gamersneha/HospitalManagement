package com.hospital.management.controller;

import com.hospital.management.entity.Appointment;
import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.Patient;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PatientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://hospitalmanagement-q87w.onrender.com/api/appointments")
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentController(AppointmentRepository appointmentRepository,
                                 PatientRepository patientRepository,
                                 DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @PostMapping
    public Appointment create(@RequestBody Appointment appointment) {
        Long patientId = appointment.getPatient().getId();
        Long doctorId = appointment.getDoctor().getId();

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        return appointmentRepository.save(appointment);
    }

    @GetMapping
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Appointment getById(@PathVariable Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    @PutMapping("/{id}")
    public Appointment update(@PathVariable Long id, @RequestBody Appointment updated) {
        Appointment existing = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        existing.setAppointmentDate(updated.getAppointmentDate());
        existing.setAppointmentTime(updated.getAppointmentTime());
        existing.setReason(updated.getReason());
        existing.setStatus(updated.getStatus());

        return appointmentRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
    }
}
