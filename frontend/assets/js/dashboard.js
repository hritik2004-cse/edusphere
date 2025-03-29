document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profile-form");
    const profilePictureInput = document.getElementById("profile-picture");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const dobInput = document.getElementById("dob");
    const passwordInput = document.getElementById("password");

    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", nameInput.value);
        formData.append("email", emailInput.value);
        formData.append("dob", dobInput.value);
        if (passwordInput.value) {
            formData.append("password", passwordInput.value);
        }
        if (profilePictureInput.files[0]) {
            formData.append("profilePicture", profilePictureInput.files[0]);
        }

        try {
            const response = await fetch("/api/dashboard/update", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (response.ok) {
                alert("Profile updated successfully!");
                window.location.reload();
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    });
});
