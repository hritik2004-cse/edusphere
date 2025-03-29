document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Login Function
    loginForm?.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const errorMessage = document.getElementById("login-error-message");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // Store auth token
                alert(`Welcome back, ${data.user.name}!`);
                window.location.href = "index.html"; // Redirect to dashboard
            } else {
                errorMessage.textContent = data.msg || "Invalid credentials!";
                errorMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Login Error:", error);
            errorMessage.textContent = "Something went wrong. Try again!";
        }
    });

    // Register Function
    registerForm?.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const errorMessage = document.getElementById("register-error-message");

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert(`Registration Successful! Welcome, ${data.user.name}!`);
                window.location.href = "index.html"; // Redirect to dashboard
            } else {
                errorMessage.textContent = data.msg || "Registration failed!";
                errorMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Registration Error:", error);
            errorMessage.textContent = "Something went wrong. Try again!";
        }
    });
});
