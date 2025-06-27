// ✅ Password toggle logic
function togglePassword(inputId, toggleIcon) {
  const input = document.getElementById(inputId);
  const type = input.getAttribute("type");
  input.setAttribute("type", type === "password" ? "text" : "password");
  toggleIcon.textContent = type === "password" ? "🚫👁️" : "👁️";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");

  const registerForm = document.getElementById("register-form");
  const registerError = document.getElementById("register-error");

  const navAuth = document.getElementById("nav-auth");
  const profileDropdown = document.getElementById("profile-dropdown");

  const BACKEND_URL = "https://armor-backend-y28q.onrender.com"; // ✅ Your Render backend

  // ✅ PROFILE DROPDOWN DISPLAY
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    if (navAuth) navAuth.style.display = "none";
    if (profileDropdown) profileDropdown.style.display = "inline-block";
  }

  // ✅ LOGIN HANDLER
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      showError(loginError, "Please fill all the details.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        alert("Login successful! Redirecting...");
        window.location.href = "index.html";
      } else {
        showError(loginError, data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      showError(loginError, "Server error. Please try again later.");
    }
  });

  // ✅ REGISTER HANDLER
  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const confirm = document.getElementById("confirm-password").value.trim();
    const dob = document.getElementById("register-dob").value.trim();
    const phone = document.getElementById("register-phone").value.trim();

    if (!name || !email || !password || !confirm || !dob || !phone) {
      showError(registerError, "Please fill all the details.");
      return;
    }

    if (password !== confirm) {
      showError(registerError, "Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, dob, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        alert("Registration successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        if (response.status === 409 || data.message?.toLowerCase().includes("exist")) {
          showError(registerError, "User already registered. Please log in.");
        } else {
          showError(registerError, data.message || "Registration failed.");
        }
      }
    } catch (err) {
      console.error(err);
      showError(registerError, "Server error. Please try again later.");
    }
  });

  // ✅ Error Utility Function
  function showError(element, message) {
    if (!element) return;
    element.textContent = message;
    element.classList.add("show");
    setTimeout(() => element.classList.remove("show"), 4000);
  }
});

// ✅ LOGOUT
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  window.location.href = "index.html";
}
