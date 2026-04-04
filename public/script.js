document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("langToggle");

  // Load from session (default = English)
  let isHindi = sessionStorage.getItem("lang") === "hi";

  // Function to apply language
  function applyLanguage() {
    document.querySelectorAll(".en").forEach(e =>
      e.classList.toggle("hidden", isHindi)
    );

    document.querySelectorAll(".hi").forEach(e =>
      e.classList.toggle("hidden", !isHindi)
    );

    if (toggle) {
      if (isHindi) {
        toggle.textContent = "English";
        document.documentElement.lang = "hi-IN";
      } else {
        toggle.textContent = "हिन्दी";
        document.documentElement.lang = "en-IN";
      }
    }
  }

  // ✅ Apply on page load
  applyLanguage();

  // ✅ Toggle click
  if (toggle) {
    toggle.onclick = () => {
      isHindi = !isHindi;

      // Save in session
      sessionStorage.setItem("lang", isHindi ? "hi" : "en");

      applyLanguage();
    };
  }

  /* Hide Floating Buttons Near Contact Section */
  const contactSection = document.getElementById("contact");
  const floatCall = document.querySelector(".float-call");
  const floatWa = document.querySelector(".float-wa");

  function handleFloatingButtons() {
    if (!contactSection || !floatCall || !floatWa) return;

    const rect = contactSection.getBoundingClientRect();

    const triggerPoint = window.innerHeight * 0.6; // middle-ish

    if (rect.top < triggerPoint) {
      // Hide buttons
      floatCall.style.opacity = "0";
      floatWa.style.opacity = "0";
      floatCall.style.pointerEvents = "none";
      floatWa.style.pointerEvents = "none";
    } else {
      // Show buttons
      floatCall.style.opacity = "1";
      floatWa.style.opacity = "1";
      floatCall.style.pointerEvents = "auto";
      floatWa.style.pointerEvents = "auto";
    }
  }

  // Run on scroll
  window.addEventListener("scroll", handleFloatingButtons);

  // Run once on load
  handleFloatingButtons();

  /* Integrated Image Lightbox: Setup, Zoom & Drag */
  const images = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  // ✅ Only run if all elements exist
  if (images.length && lightbox && lightboxImg && closeBtn) {

    // 1. Shared Variables (Accessible by all functions below)
    let scale = 1;
    let pos = { x: 0, y: 0 };
    let isDragging = false;
    let start = { x: 0, y: 0 };

    // 2. Core Functions
    function updateView() {
      // Keep scale between 1 and 4
      scale = Math.min(Math.max(1, scale), 4);

      // Reset position if zoomed out
      if (scale === 1) {
        pos = { x: 0, y: 0 };
      }

      lightboxImg.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
    }

    function resetLightbox() {
      scale = 1;
      pos = { x: 0, y: 0 };
      updateView();
      lightboxImg.style.cursor = "grab";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
      resetLightbox();
    }

    // 3. Event Listeners: Opening & Closing
    images.forEach(img => {
      img.addEventListener("click", () => {
        resetLightbox(); // Start clean
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });

    // 4. Event Listeners: Zoom (Mouse Wheel)
    // Prevent global page zoom
    window.addEventListener("wheel", (e) => {
      if (lightbox.classList.contains("active") && e.ctrlKey) {
        e.preventDefault();
      }
    }, { passive: false });

    lightbox.addEventListener("wheel", (e) => {
      if (!lightbox.classList.contains("active")) return;
      e.preventDefault();

      const delta = e.deltaY < 0 ? 0.05 : -0.05;
      scale += delta;
      updateView();
    }, { passive: false });

    // 5. Event Listeners: Drag (Mouse)
    lightboxImg.addEventListener("mousedown", (e) => {
      if (scale === 1) return;
      e.preventDefault();
      isDragging = true;
      start = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      lightboxImg.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      pos.x = e.clientX - start.x;
      pos.y = e.clientY - start.y;
      updateView();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      if (lightboxImg) lightboxImg.style.cursor = "grab";
    });
  }

}) 