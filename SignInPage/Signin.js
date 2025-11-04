const PHP_URL = "Signin.php"; // relative path to your PHP file
const form = document.getElementById("signin-form");
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const response = await fetch(PHP_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (data.success) {
      // No need to store in localStorage anymore
      alert("Login successful!");
      window.location.href = "../Home Page/Home.html"; // redirect to Home page
    } else {
      alert("Error: " + data.message);
    }

  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while signing in. Make sure you opened this via http://localhost/");
  }
});

// Light/Dark Mode Toggle
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  modeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ Dark Mode" : "🌙 Light Mode";
});
