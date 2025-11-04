const urlParams = new URLSearchParams(window.location.search);
const patientId = urlParams.get("id");
const services = ["Filling", "Extraction", "Brace Adjustment", "Cleaning", "Root Canal"];

// Load patient info
async function loadPatientInfo() {
    try {
        const response = await fetch(`getPatient.php?id=${patientId}`);
        const data = await response.json();
        const info = document.getElementById("patientInfo");
        if (data.success) {
            info.textContent = `Patient: ${data.patient.name} ${data.patient.surname} | Age: ${data.patient.age}`;
        } else {
            info.textContent = "Patient not found.";
        }
    } catch (err) {
        console.error("Error loading patient info:", err);
        document.getElementById("patientInfo").textContent = "Error loading patient info.";
    }
}

// Populate table with services
function populateServiceTable() {
    const tbody = document.querySelector("#serviceTable tbody");
    tbody.innerHTML = "";

    services.forEach(service => {
        const tr = document.createElement("tr");
        const serviceId = service.replace(/\s+/g, "-"); // unique ID for accessibility

        tr.innerHTML = `
            <td>${service}</td>
            <td><input type="date" class="appt-date" required aria-label="Appointment Date for ${service}" id="appt-date-${serviceId}" /></td>
            <td><input type="time" class="appt-time" required aria-label="Appointment Time for ${service}" id="appt-time-${serviceId}" /></td>
            <td><button class="select-btn">Select</button></td>
        `;

        // Handle button click
        tr.querySelector(".select-btn").addEventListener("click", async () => {
            const dateInput = tr.querySelector(".appt-date").value;
            const timeInput = tr.querySelector(".appt-time").value;

            if (!dateInput || !timeInput) {
                alert("Please select both appointment date and time.");
                return;
            }

            if (confirm(`Confirm selecting ${service} for this patient on ${dateInput} at ${timeInput}?`)) {
                try {
                    const response = await fetch("saveService.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            patient_id: patientId,
                            service: service,
                            date: dateInput,
                            time: timeInput
                        })
                    });

                    const dataText = await response.text();
                    let data;
                    try {
                        data = JSON.parse(dataText);
                    } catch (e) {
                        data = { success: false, message: "Invalid response from server: " + dataText };
                    }

                    alert(data.message);
                    if (data.success) {
                        window.location.href = "../Appointment/Appointment.html";
                    }
                } catch (err) {
                    console.error("Error saving service:", err);
                    alert("Failed to save service. See console for details.");
                }
            }
        });

        tbody.appendChild(tr);
    });
}

// Dark mode toggle
document.getElementById("mode-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

loadPatientInfo();
populateServiceTable();
