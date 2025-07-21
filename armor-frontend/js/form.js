// ✅ Password toggle logic
function togglePassword(inputId, toggleIcon) {
  const input = document.getElementById(inputId);
  const type = input.getAttribute("type");
  if (type === "password") {
    input.setAttribute("type", "text");
    toggleIcon.textContent = "🚫👁️";
  } else {
    input.setAttribute("type", "password");
    toggleIcon.textContent = "👁️";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");

  const registerForm = document.getElementById("register-form");
  const registerError = document.getElementById("register-error");

  const navAuth = document.getElementById("nav-auth");
  const profileDropdown = document.getElementById("profile-dropdown");

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
      loginError.textContent = "Please fill all the details.";
      loginError.classList.add("show");
      setTimeout(() => loginError.classList.remove("show"), 4000);
      return;
    }

    try {
      const response = await fetch("https://armor-backend-y28q.onrender.com/api/auth/login", {
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
        loginError.textContent = data.message || "Login failed.";
        loginError.classList.add("show");
        setTimeout(() => loginError.classList.remove("show"), 4000);
      }
    } catch (err) {
      loginError.textContent = "Server error. Try again later.";
      loginError.classList.add("show");
      setTimeout(() => loginError.classList.remove("show"), 4000);
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
      registerError.textContent = "Please fill all the details.";
      registerError.classList.add("show");
      setTimeout(() => registerError.classList.remove("show"), 4000);
      return;
    }

    if (password !== confirm) {
      registerError.textContent = "Passwords do not match.";
      registerError.classList.add("show");
      setTimeout(() => registerError.classList.remove("show"), 4000);
      return;
    }

    try {
      const response = await fetch("https://armor-backend-y28q.onrender.com/api/auth/register", {
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
          registerError.textContent = "User already registered. Please log in.";
        } else {
          registerError.textContent = data.message || "Registration failed.";
        }
        registerError.classList.add("show");
        setTimeout(() => registerError.classList.remove("show"), 4000);
      }
    } catch (err) {
      registerError.textContent = "Server error. Try again later.";
      registerError.classList.add("show");
      setTimeout(() => registerError.classList.remove("show"), 4000);
    }
  });
});

// ✅ LOGOUT
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  window.location.href = "index.html";
}
