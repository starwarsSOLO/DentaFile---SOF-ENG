// Select elements
const menuItems = document.querySelectorAll(".menu-item");
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

// Sidebar menu highlight
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(btn => btn.classList.remove("active"));
    item.classList.add("active");
  });
});

// Light/Dark Mode Toggle
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    modeToggle.textContent = "☀️ Dark Mode";
  } else {
    modeToggle.textContent = "🌙 Light Mode";
  }
});

// Optional: Sidebar collapse with key 'S'
const sidebar = document.querySelector(".sidebar");
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "s") {
    sidebar.classList.toggle("collapsed");
  }
});
