const tableBody = document.querySelector("#patientTable tbody");
const searchInput = document.getElementById("search");
let allPatients = []; // Store loaded patients for search filtering

// --- Load Patients ---
async function loadPatients() {
  try {
    const res = await fetch("PatientRecord.php");
    const text = await res.text();
    console.log("Raw loadPatients response:", text);

    if (!text) throw new Error("Empty response from server");

    const data = JSON.parse(text);

    tableBody.innerHTML = "";

    if (data.success && data.patients.length) {
      allPatients = data.patients;
      displayPatients(allPatients);
    } else {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No patients found.</td></tr>`;
    }
  } catch (err) {
    console.error("Error fetching patients:", err);
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Error loading patients.</td></tr>`;
  }
}

// --- Display patients in table ---
function displayPatients(patients) {
  tableBody.innerHTML = "";

  if (!patients.length) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No matching patients.</td></tr>`;
    return;
  }

  patients.forEach(patient => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><button class="service-btn" data-id="${patient.id}">Select Service</button></td>
      <td>${patient.name} ${patient.surname || ""}</td>
      <td>${patient.age || ""}</td>
      <td>${patient.phone || ""}</td>
      <td>${patient.doctor}</td>
      <td>
        <button class="edit">✏️</button>
        <button class="delete">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);

    const editBtn = row.querySelector(".edit");
    const deleteBtn = row.querySelector(".delete");

    // --- Edit button ---
    editBtn.addEventListener("click", () => {
      const cells = row.cells;
      const id = patient.id;

      cells[1].innerHTML = `<input type="text" value="${cells[1].textContent}" placeholder="Full Name">`;
      cells[2].innerHTML = `<input type="number" value="${cells[2].textContent}" placeholder="Age">`;
      cells[3].innerHTML = `<input type="text" value="${cells[3].textContent}" placeholder="Phone">`;
      cells[4].innerHTML = `<input type="text" value="${cells[4].textContent}" placeholder="Doctor">`;

      const save = async () => {
        const fullName = cells[1].querySelector("input").value.trim();
        const updatedData = {
          id: id,
          name: fullName.split(" ")[0] || "",
          surname: fullName.split(" ").slice(1).join(" ") || "",
          age: cells[2].querySelector("input").value,
          phone: cells[3].querySelector("input").value,
          doctor: cells[4].querySelector("input").value
        };

        try {
          const res = await fetch("updatePatient.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(updatedData)
          });
          const text = await res.text();
          console.log("Raw update response:", text);
          const data = JSON.parse(text);
          if (data.success) loadPatients();
          else alert("Update failed: " + (data.message || "Unknown error"));
        } catch (err) {
          console.error("Update error:", err);
        }
      };

      Array.from(cells).slice(1, 5).forEach(cell => {
        const input = cell.querySelector("input");
        input.addEventListener("keypress", e => { if (e.key === "Enter") save(); });
        input.addEventListener("blur", save);
      });
    });

    // --- Delete button ---
    deleteBtn.addEventListener("click", async () => {
      const id = patient.id;
      if (!id) return alert("Invalid patient ID!");

      if (confirm("Are you sure you want to delete this patient?")) {
        try {
          const res = await fetch("deletePatient.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${encodeURIComponent(id)}`
          });

          const text = await res.text();
          console.log("Raw delete response:", text);

          if (!text) {
            alert("Delete error: Empty response from server. Check PHP logs.");
            return;
          }

          let data;
          try { data = JSON.parse(text); }
          catch (e) {
            console.error("Failed to parse JSON:", e);
            alert("Delete error: Invalid JSON returned by PHP. Check console for details.");
            return;
          }

          if (data.success) loadPatients();
          else alert("Failed to delete patient: " + (data.message || "Unknown error"));
        } catch (err) {
          console.error("Delete request error:", err);
          alert("Error deleting patient. Check console.");
        }
      }
    });
  });

  // --- Select Service button ---
  document.querySelectorAll(".service-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      window.location.href = `../PatientRecords/SelectService.html?id=${id}`;
    });
  });
}

// --- Search functionality ---
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = allPatients.filter(patient =>
    (patient.name + " " + (patient.surname || "")).toLowerCase().includes(query)
  );
  displayPatients(filtered);
});

// --- Add Patient Button ---
document.getElementById("addBtn").addEventListener("click", () => {
  if (confirm("Do you want to add a new patient?")) {
    window.location.href = "../AddPatientPage/AddPatient.html";
  }
});

// Load patients on page load
document.addEventListener("DOMContentLoaded", loadPatients);
