const API_URL = "https://hospitalmanagement-q87w.onrender.com/api/bills";
const PATIENT_API = "https://hospitalmanagement-q87w.onrender.com/api/patients";

// Load all bills and patients on page load
document.addEventListener("DOMContentLoaded", () => {
    loadBills();
    loadPatientDropdown();
});

document.getElementById("billForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const bill = {
        patient: { id: parseInt(document.getElementById("patientId").value) },
        amount: parseFloat(document.getElementById("amount").value),
        date: document.getElementById("date").value,
        description: document.getElementById("description").value
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bill)
    });

    if (res.ok) {
        alert("Bill added successfully!");
        loadBills();
        document.getElementById("billForm").reset();
    } else {
        alert("Error adding bill. Check if Patient ID exists.");
    }
});

// Fetch all bills and show in table
async function loadBills() {
    const res = await fetch(API_URL);
    const bills = await res.json();

    const tableBody = document.getElementById("billTableBody");
    tableBody.innerHTML = "";

    bills.forEach(b => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${b.id}</td>
            <td>${b.patient?.name || "N/A"}</td>
            <td>₹${b.amount}</td>
            <td>${b.date}</td>
            <td>${b.description}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Load patient names into the dropdown
async function loadPatientDropdown() {
    const res = await fetch("https://hospitalmanagement-q87w.onrender.com/api/patients");
    const patients = await res.json();

    const select = document.getElementById("patientId");
    select.innerHTML = '<option value="">Select Patient</option>';

    patients.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        select.appendChild(option);
    });
}
