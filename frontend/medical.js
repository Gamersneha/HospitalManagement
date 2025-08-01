const API_URL = "https://hospitalmanagement-q87w.onrender.com/api/medical-records";
const PATIENT_API = "https://hospitalmanagement-q87w.onrender.com/api/patients";

document.getElementById("medicalForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const record = {
        patient: { id: parseInt(document.getElementById("patientId").value) }, // link patient by ID
        diagnosis: document.getElementById("diagnosis").value,
        treatmentGiven: document.getElementById("treatmentGiven").value,
        prescription: document.getElementById("prescription").value,
        date: document.getElementById("date").value
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
    });

    if (res.ok) {
        const data = await res.json();
        document.getElementById("message").innerText = `Record saved! ID: ${data.id}`;
        document.getElementById("medicalForm").reset();
        loadRecords();
    } else {
        document.getElementById("message").innerText = "Error saving record!";
    }
});

async function loadRecords() {
    const res = await fetch(API_URL);
    const records = await res.json();

    const tbody = document.querySelector("#recordsTable tbody");
    tbody.innerHTML = "";

    records.forEach(r => {
        const row = `<tr>
            <td>${r.id}</td>
            <td>${r.patient ? r.patient.name : "N/A"}</td>
            <td>${r.diagnosis}</td>
            <td>${r.treatmentGiven}</td>
            <td>${r.prescription}</td>
            <td>${r.date}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

async function loadPatientOptions() {
    const res = await fetch(PATIENT_API);
    const patients = await res.json();

    const select = document.getElementById("patientId");
    select.innerHTML = '<option value="">Select Patient</option>'; // Clear & reset

    patients.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        select.appendChild(option);
    });
}

// Load records and patient options on page load
document.getElementById("refreshBtn").addEventListener("click", loadRecords);
loadRecords();
loadPatientOptions();
