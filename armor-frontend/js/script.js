function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");

  // Wait for splash to finish
  setTimeout(() => {
    splash.style.display = "none";

    // Now start the typing animation
    startTypingAnimation();
  }, 2000); // matches animation-delay + splashFadeOut
});

function startTypingAnimation() {
  const text = "Your Personal Safety. Reinvented.";
  const el = document.getElementById("hero-text");
  let i = 0;

  el.textContent = ""; // Clear initial

  function typeChar() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 70); // Typing speed
    } else {
      // Reveal hero content
      document.getElementById("hero-content").style.opacity = 1;
      document.getElementById("hero-content").style.transition = "opacity 1s ease";
    }
  }

  typeChar();
}



  document.addEventListener("DOMContentLoaded", function () {
  const lines = [
    "Just a glimpse — ARMOR’s full power lies in how seamlessly our app and wearable protects you.",
    "Want to explore more? Scroll down to discover the features."
  ];

  const el = document.querySelector(".typewriter-text");
  let currentLine = 0;
  let charIndex = 0;
  let isDeleting = false;
  let hasStarted = false;

  function loopTyping() {
    const fullText = lines[currentLine];
    const visibleText = fullText.substring(0, charIndex);
    el.textContent = visibleText;
    el.style.borderRight = "2px solid #ff007f";

    if (!isDeleting && charIndex < fullText.length) {
      charIndex++;
      setTimeout(loopTyping, 50);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(loopTyping, 30);
    } else {
      if (!isDeleting) {
        setTimeout(() => {
          isDeleting = true;
          loopTyping();
        }, 2500); // Hold full line for 2 seconds
      } else {
        isDeleting = false;
        currentLine = (currentLine + 1) % lines.length;
        setTimeout(loopTyping, 800); // Pause before next line starts
      }
    }
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasStarted) {
        hasStarted = true;
        loopTyping();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(el);
});


