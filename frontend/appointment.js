const API_BASE = "http://localhost:8080/api";

// Populate patients and doctors dropdown
async function loadDropdowns() {
    try {
        const patients = await fetch(`${API_BASE}/patients`).then(res => res.json());
        const doctors = await fetch(`${API_BASE}/doctors`).then(res => res.json());

        const patientSelect = document.getElementById("patientId");
        const doctorSelect = document.getElementById("doctorId");

        patientSelect.innerHTML = '<option value="">Select Patient</option>';
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';

        patients.forEach(p => {
            const option = document.createElement("option");
            option.value = p.id;
            option.textContent = `${p.name} (Age ${p.age})`;
            patientSelect.appendChild(option);
        });

        doctors.forEach(d => {
            const option = document.createElement("option");
            option.value = d.id;
            option.textContent = `${d.name} - ${d.specialization}`;
            doctorSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading dropdowns:", error);
        alert("Failed to load dropdown data.");
    }
}

// Submit appointment
document.getElementById("appointmentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const appointment = {
        patient: { id: parseInt(document.getElementById("patientId").value) },
        doctor: { id: parseInt(document.getElementById("doctorId").value) },
        appointmentDate: document.getElementById("appointmentDate").value,
        appointmentTime: document.getElementById("appointmentTime").value,
        reason: document.getElementById("reason").value,
        status: document.getElementById("status").value
    };

    try {
        const res = await fetch(`${API_BASE}/appointments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment)
        });

        if (res.ok) {
            document.getElementById("message").innerText = "Appointment Saved!";
            document.getElementById("appointmentForm").reset();
            loadAppointments();
        } else {
            const errorData = await res.json();
            console.error("Save failed:", errorData);
            document.getElementById("message").innerText = "Error saving appointment.";
        }
    } catch (err) {
        console.error("Network error:", err);
        document.getElementById("message").innerText = "Network error occurred.";
    }
});

// Load all appointments
async function loadAppointments() {
    try {
        const res = await fetch(`${API_BASE}/appointments`);
        const data = await res.json();

        if (!Array.isArray(data)) {
            console.error("Expected array, got:", data);
            document.getElementById("message").innerText = "Error loading appointments.";
            return;
        }

        const tbody = document.querySelector("#appointmentsTable tbody");
        tbody.innerHTML = "";

        data.forEach(a => {
            const row = `<tr>
                <td>${a.id}</td>
                <td>${a.patient?.name || 'N/A'}</td>
                <td>${a.doctor?.name || 'N/A'}</td>
                <td>${a.appointmentDate}</td>
                <td>${a.appointmentTime}</td>
                <td>${a.reason}</td>
                <td>${a.status}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading appointments:", error);
        document.getElementById("message").innerText = "Failed to load appointments.";
    }
}

// Attach refresh button
document.getElementById("refreshBtn").addEventListener("click", loadAppointments);

// Initial load
loadDropdowns();
loadAppointments();
