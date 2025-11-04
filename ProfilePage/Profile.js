document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("Profile.php");
    const data = await response.json();

    if (!data.success) {
      alert("Please log in first");
      window.location.href = "../SignInPage/Signin.html";
      return;
    }

    const user = data.user;

    // Fill sidebar
    document.getElementById("user-fullname").textContent = user.fullname;

    // Fill profile card
    document.getElementById("profile-name").textContent = user.fullname;
    document.getElementById("profile-role").textContent = user.role;

    // Fill info card
    document.getElementById("info-fullname").textContent = user.fullname;
    document.getElementById("info-email").textContent = user.email;
    document.getElementById("info-phone").textContent = user.phone;
    document.getElementById("info-role").textContent = user.role;

    // Fill hidden inputs
    document.getElementById("input-fullname").value = user.fullname;
    document.getElementById("input-email").value = user.email;
    document.getElementById("input-phone").value = user.phone;
    document.getElementById("input-role").value = user.role;

    // Edit button
    const editBtn = document.getElementById("edit-profile-btn");
    const saveBtn = document.getElementById("save-btn");
    const inputs = document.querySelectorAll(".edit-input");
    const spans = document.querySelectorAll(".info-group span");

    editBtn.addEventListener("click", () => {
      inputs.forEach(input => input.style.display = "inline-block");
      spans.forEach(span => span.style.display = "none");
      saveBtn.style.display = "inline-block";
    });

    saveBtn.addEventListener("click", async () => {
      const updatedData = {
        fullname: document.getElementById("input-fullname").value,
        email: document.getElementById("input-email").value,
        phone: document.getElementById("input-phone").value,
        role: document.getElementById("input-role").value
      };

      try {
        const res = await fetch("UpdateProfile.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData)
        });
        const result = await res.json();

        if (result.success) {
          alert("Profile updated successfully!");
          // Update displayed info
          document.getElementById("info-fullname").textContent = updatedData.fullname;
          document.getElementById("info-email").textContent = updatedData.email;
          document.getElementById("info-phone").textContent = updatedData.phone;
          document.getElementById("info-role").textContent = updatedData.role;
          document.getElementById("profile-name").textContent = updatedData.fullname;
          document.getElementById("profile-role").textContent = updatedData.role;
          document.getElementById("user-fullname").textContent = updatedData.fullname;

          // Hide inputs
          inputs.forEach(input => input.style.display = "none");
          spans.forEach(span => span.style.display = "inline");
          saveBtn.style.display = "none";
        } else {
          alert("Update failed: " + result.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error updating profile.");
      }
    });

  } catch (err) {
    console.error(err);
    alert("Error fetching profile info.");
  }
});
