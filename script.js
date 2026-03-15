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

    scale = 1;
    originX = 0;
    originY = 0;

    lightboxImg.style.transform = "translate(0px,0px) scale(1)";
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";

  scale = 1;
  originX = 0;
  originY = 0;

  lightboxImage.style.transform = "translate(0px,0px) scale(1)";
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

if(contactSection){
    observer.observe(contactSection);
}

document.addEventListener("wheel", function(e) {
  if (e.ctrlKey === true) {
    e.preventDefault();
  }
}, { passive: false });

const lightboxImage = document.getElementById("lightbox-img");

let scale = 1;
let startX = 0;
let startY = 0;
let originX = 0;
let originY = 0;
let isDragging = false;
let touchStartX = 0;
let touchStartY = 0;
let startDistance = 0;

lightboxImage.style.cursor = "grab";

lightboxImage.addEventListener("dragstart", (e) => e.preventDefault());

function clampPosition() {

  const rect = lightboxImage.getBoundingClientRect();
  const maxX = (rect.width * scale - rect.width) / 2;
  const maxY = (rect.height * scale - rect.height) / 2;

  originX = Math.min(Math.max(originX, -maxX), maxX);
  originY = Math.min(Math.max(originY, -maxY), maxY);
}

lightboxImage.addEventListener("wheel", (e) => {
  e.preventDefault();

  const rect = lightboxImage.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const prevScale = scale;
  const zoomSpeed = 0.15;

  if (e.deltaY < 0) scale += zoomSpeed;
  else scale -= zoomSpeed;

  scale = Math.min(Math.max(1, scale), 4);

  const scaleRatio = scale / prevScale;

  originX -= (mouseX - originX) * (scaleRatio - 1);
  originY -= (mouseY - originY) * (scaleRatio - 1);

  if (scale === 1) {
    originX = 0;
    originY = 0;
  }

  clampPosition();

  lightboxImage.style.transform =
    `translate(${originX}px, ${originY}px) scale(${scale})`;
});

lightboxImage.addEventListener("mousedown", (e) => {
  if (scale === 1) return;

  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;

  lightboxImage.style.cursor = "grabbing";
});

lightboxImage.addEventListener("touchstart", (e) => {

  if (e.touches.length === 1) {

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;

  }

  if (e.touches.length === 2) {

    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;

    startDistance = Math.sqrt(dx * dx + dy * dy);

  }

});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  originX += dx;
  originY += dy;

  startX = e.clientX;
  startY = e.clientY;

  clampPosition();

  lightboxImage.style.transform =
    `translate(${originX}px, ${originY}px) scale(${scale})`;
});

lightboxImage.addEventListener("touchmove", (e) => {

  e.preventDefault();

  /* ONE FINGER PAN */
  if (e.touches.length === 1 && scale > 1) {

    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;

    originX += dx;
    originY += dy;

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;

    clampPosition();

    lightboxImage.style.transform =
      `translate(${originX}px, ${originY}px) scale(${scale})`;

  }

  /* TWO FINGER PINCH ZOOM */
  if (e.touches.length === 2) {

    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;

    const newDistance = Math.sqrt(dx * dx + dy * dy);

    const delta = newDistance - startDistance;

    const zoomSpeed = 0.005;

    scale += delta * zoomSpeed;

    scale = Math.min(Math.max(1, scale), 4);

    if (scale === 1) {
      originX = 0;
      originY = 0;
    }

    clampPosition();

    lightboxImage.style.transform =
      `translate(${originX}px, ${originY}px) scale(${scale})`;

    startDistance = newDistance;

  }

});

document.addEventListener("mouseup", () => {
  if(!lightbox.classList.contains("active")) return;

  isDragging = false;
  lightboxImage.style.cursor = "grab";
});

lightboxImage.addEventListener("touchend", () => {

  if (scale === 1) {
    originX = 0;
    originY = 0;

    lightboxImage.style.transform =
      "translate(0px,0px) scale(1)";
  }

});

scale = 1;
originX = 0;
originY = 0;
lightboxImage.style.transform = "translate(0px,0px) scale(1)";