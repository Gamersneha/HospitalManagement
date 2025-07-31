const API_URL = "http://localhost:8080/api/patients";

document.getElementById("patientForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("patientId").value;
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    const patient = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        status: document.getElementById("status").value
    };

    try {
        const res = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patient)
        });

        if (!res.ok) throw new Error(`Error: ${res.statusText}`);

        const result = await res.json();
        document.getElementById("message").innerText = `Patient ${id ? 'updated' : 'added'} successfully!`;
        document.getElementById("message").style.color = "green";
        document.getElementById("patientForm").reset();
        document.getElementById("formTitle").innerText = "Add New Patient";
        document.getElementById("patientId").value = "";
        loadPatients();
    } catch (error) {
        document.getElementById("message").innerText = error.message;
        document.getElementById("message").style.color = "red";
    }
});

async function loadPatients() {
    try {
        const res = await fetch(API_URL);
        const patients = await res.json();
        const tbody = document.querySelector("#patientsTable tbody");
        tbody.innerHTML = "";

        patients.forEach(p => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.gender}</td>
                <td>${p.phone}</td>
                <td>${p.address}</td>
                <td>${p.status || "None"}</td>
                <td>
                    <button onclick="editPatient(${p.id})">Edit</button>
                    <button onclick="deletePatient(${p.id})" style="color: red;">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading patients:", error);
    }
}

async function editPatient(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const p = await res.json();

        document.getElementById("patientId").value = p.id;
        document.getElementById("name").value = p.name;
        document.getElementById("age").value = p.age;
        document.getElementById("gender").value = p.gender;
        document.getElementById("phone").value = p.phone;
        document.getElementById("address").value = p.address;
        document.getElementById("status").value = p.status;
        document.getElementById("formTitle").innerText = "Edit Patient";
    } catch (error) {
        console.error("Error editing patient:", error);
    }
}

async function deletePatient(id) {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed.");
        alert("Patient deleted successfully.");
        loadPatients();
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById("refreshBtn").addEventListener("click", loadPatients);
loadPatients();
