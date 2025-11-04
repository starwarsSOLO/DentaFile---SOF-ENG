document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;
  const tableBody = document.querySelector("#appointmentTable tbody");
  const searchInput = document.getElementById("searchInput");

  let allAppointments = []; // store currently loaded appointments

  // --- Dark Mode Toggle ---
  modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    modeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ Dark Mode" : "🌙 Light Mode";
  });

  // --- Sidebar user info ---
  const fullnameEl = document.getElementById("user-fullname");
  fetch("../ProfilePage/profile.php")
    .then(res => res.json())
    .then(data => {
      fullnameEl.textContent = data.success ? data.user.fullname : "Guest";
    })
    .catch(err => {
      fullnameEl.textContent = "Guest";
      console.error("Failed to fetch user info:", err);
    });

  // --- Format functions ---
  function formatTime12Hour(time24) {
    if (!time24) return "";
    const [hoursStr, minutesStr] = time24.split(":");
    let hours = parseInt(hoursStr);
    const minutes = minutesStr;
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function formatDateReadable(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  // --- Load appointments ---
  async function loadAppointments(date) {
    tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center;'>Loading...</td></tr>";
    try {
      const response = await fetch(`getAppointments.php?date=${date}`);
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No appointments found for this date.</td></tr>`;
        allAppointments = [];
        return;
      }

      allAppointments = data; // store appointments for search
      displayAppointments(allAppointments);
    } catch (err) {
      tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Failed to load appointments</td></tr>`;
      console.error("Error loading appointments:", err);
    }
  }

  // --- Display appointments in table ---
  function displayAppointments(appointments) {
    tableBody.innerHTML = "";

    if (appointments.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No appointments match your search.</td></tr>`;
      return;
    }

    appointments.forEach(app => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${app.name}</td>
        <td>${app.service}</td>
        <td>${formatTime12Hour(app.time)}</td>
        <td>${formatDateReadable(app.date)}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // --- Search filter ---
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = allAppointments.filter(app =>
      app.name.toLowerCase().includes(query)
    );
    displayAppointments(filtered);
  });

  // --- View button ---
  document.getElementById("viewBtn").addEventListener("click", () => {
    const selectedDate = document.getElementById("appointmentDate").value;
    if (!selectedDate) return alert("Please select a date");
    loadAppointments(selectedDate);
  });

  // --- Auto-load today's appointments ---
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("appointmentDate").value = today;
  loadAppointments(today);
});
