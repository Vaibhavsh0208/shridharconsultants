/* Language Toggle */
const toggle = document.getElementById("langToggle");
let isHindi = false;

toggle.onclick = () => {
  document.querySelectorAll(".en").forEach(e => e.classList.toggle("hidden"));
  document.querySelectorAll(".hi").forEach(e => e.classList.toggle("hidden"));

  isHindi = !isHindi;

  if (isHindi) {
    toggle.textContent = "English";
    document.documentElement.lang = "hi-IN";
  } else {
    toggle.textContent = "हिन्दी";
    document.documentElement.lang = "en-IN";
  }
};


/* Footer Year */
document.querySelectorAll(".year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });


/* Image Lightbox */
const images = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});


/* Hide Floating Buttons Near Contact Section */
const contactSection = document.getElementById("contact");
const floatCall = document.querySelector(".float-call");
const floatWa = document.querySelector(".float-wa");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.5) {
        floatCall.style.opacity = "0";
        floatWa.style.opacity = "0";
        floatCall.style.pointerEvents = "none";
        floatWa.style.pointerEvents = "none";
      } else {
        floatCall.style.opacity = "1";
        floatWa.style.opacity = "1";
        floatCall.style.pointerEvents = "auto";
        floatWa.style.pointerEvents = "auto";
      }
    });
  },
  {
    threshold: [0.5]
  }
);

observer.observe(contactSection);