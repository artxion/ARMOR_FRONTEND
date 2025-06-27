function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

// Typing animation for hero text
document.addEventListener("DOMContentLoaded", () => {
  const text = "Your Personal Safety. Reinvented.";
  const el = document.getElementById("hero-text");
  let i = 0;

  el.textContent = ""; // Clear original

  function typeChar() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 70); // typing speed
    } else {
      // Show the rest after typing
      document.getElementById("hero-content").style.opacity = 1;
      document.getElementById("hero-content").style.transition = "opacity 1s ease";
    }
  }

  typeChar();
});
