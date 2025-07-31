const API_URL = "http://localhost:8080/api/doctors";

document.getElementById("doctorForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const doctorId = document.getElementById("doctorForm").dataset.editingId;
  const method = doctorId ? "PUT" : "POST";
  const url = doctorId ? `${API_URL}/${doctorId}` : API_URL;

  const doctor = {
    name: document.getElementById("name").value,
    specialization: document.getElementById("specialization").value,
    contactNumber: document.getElementById("contactNumber").value,
    availability: document.getElementById("availability").value
  };

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doctor)
  });

  if (res.ok) {
    alert(doctorId ? "Doctor updated successfully!" : "Doctor added!");
    loadDoctors();
    document.getElementById("doctorForm").reset();
    delete document.getElementById("doctorForm").dataset.editingId;
  } else {
    alert("Failed to save doctor.");
  }
});

async function loadDoctors() {
  const res = await fetch(API_URL);
  const doctors = await res.json();
  const tableBody = document.getElementById("doctorTableBody");
  tableBody.innerHTML = "";

  doctors.forEach(d => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${d.id}</td>
      <td>${d.name}</td>
      <td>${d.specialization}</td>
      <td>${d.contactNumber}</td>
      <td>${d.availability}</td>
      <td>
        <button onclick='editDoctor(${JSON.stringify(d)})'>Edit</button>
        <button onclick='deleteDoctor(${d.id})'>Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editDoctor(doctor) {
  document.getElementById("name").value = doctor.name;
  document.getElementById("specialization").value = doctor.specialization;
  document.getElementById("contactNumber").value = doctor.contactNumber;
  document.getElementById("availability").value = doctor.availability;
  document.getElementById("doctorForm").dataset.editingId = doctor.id;
}

async function deleteDoctor(id) {
  if (!confirm("Are you sure you want to delete this doctor?")) return;

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert("Doctor deleted!");
    loadDoctors();
  } else {
    alert("Failed to delete doctor.");
  }
}

loadDoctors();
