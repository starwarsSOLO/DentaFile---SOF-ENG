document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode Toggle
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    modeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ Dark Mode" : "🌙 Light Mode";
  });

  // Add Patient Button
  const addBtn = document.getElementById("addBtn");
  addBtn.addEventListener("click", async () => {
    const confirmAdd = confirm("Are you sure you want to add this patient?");
    if (!confirmAdd) return;

    // Gather form data
    const data = {
      doctor: document.getElementById("doctor").value,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      gender: document.querySelector('input[name="gender"]:checked')?.value || "",
      age: document.getElementById("age").value || null,
      birthday: document.getElementById("birthday").value,
      country: document.getElementById("country").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      city: document.getElementById("city").value,
      medical_history: document.getElementById("medicalHistory").value,
      remarks: document.getElementById("remarks").value
    };

    try {
      const response = await fetch("addpatient.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        // Use relative path to avoid 404
        window.location.href = "../PatientRecords/Patient.html";

      } else {
        alert("Error adding patient: " + result.message);
      }

    } catch (err) {
      console.error("Error adding patient:", err);
      alert("Error adding patient. Check console for details.");
    }
  });

  // Cancel Button
  const cancelBtn = document.getElementById("cancelBtn");
  cancelBtn.addEventListener("click", () => {
    // Use relative path to Patient.html to avoid 404
    window.location.href = "../PatientRecords/Patient.html";

  });
});
