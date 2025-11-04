const form = document.getElementById("register-form");
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const role = document.getElementById("role").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm_password = document.getElementById("confirm-password").value.trim();

    // Basic validation
    if (!fullname || !email || !phone || !role || !password || !confirm_password) {
        alert("Please fill in all fields.");
        return;
    }
    if (password !== confirm_password) {
        alert("Passwords do not match.");
        return;
    }

    // Use FormData instead of URLSearchParams
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", role);
    formData.append("password", password);
    formData.append("confirm_password", confirm_password);

    try {
        const response = await fetch("register.php", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Server response:", result);

        if (result.success) {
            alert(result.message);
            localStorage.setItem("fullname", result.data.fullname);
            localStorage.setItem("email", result.data.email);
            localStorage.setItem("phone", result.data.phone);
            localStorage.setItem("role", result.data.role);
            window.location.href = "../SignInPage/Signin.html";

        } else {
            alert(result.message);
            if (result.received_data) console.log("Data received by server:", result.received_data);
        }

    } catch (error) {
        console.error("Fetch error:", error);
        alert("Connection error. Check console for details.");
    }
});

// Light/Dark Mode
modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    modeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ Dark Mode" : "🌙 Light Mode";
});

