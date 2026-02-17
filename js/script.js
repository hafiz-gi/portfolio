// ===== LOADER =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1500);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});

document
  .querySelectorAll("a, button, .filter-btn, .slider-btn, .slider-dot")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });

// ===== PARTICLES =====
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(108, 99, 255, ${0.1 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== NAVBAR =====
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// Active nav on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 200;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        navLinks
          .querySelectorAll("a")
          .forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
});

// ===== TYPEWRITER =====
const typewriterEl = document.getElementById("typewriter");
const words = [
  "Flutter Developer",
  "Mobile App Expert",
  "UI/UX Enthusiast",
  "Freelancer",
  "Problem Solver",
];
let wordIndex = 0,
  charIndex = 0,
  isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 500;
  }

  setTimeout(typeWriter, speed);
}

typeWriter();

// ===== COUNTER =====
const counters = document.querySelectorAll(".number[data-target]");
let countersStarted = false;

function startCounters() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function updateCounter() {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";
      }
    }
    updateCounter();
  });
}

// ===== SCROLL REVEAL =====
function revealOnScroll() {
  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });

  if (!countersStarted) {
    const statsSection = document.querySelector(".stats");
    if (
      statsSection &&
      statsSection.getBoundingClientRect().top < window.innerHeight - 100
    ) {
      countersStarted = true;
      startCounters();
    }
  }

  document.querySelectorAll(".skill-bar .fill").forEach((fill) => {
    if (fill.getBoundingClientRect().top < window.innerHeight - 50) {
      fill.style.width = fill.getAttribute("data-width");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===== PORTFOLIO FILTER =====
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");

    document.querySelectorAll(".portfolio-card").forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 400);
      }
    });
  });
});

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById("testimonialTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".slider-dot");
let currentSlide = 0;
const totalSlides = document.querySelectorAll(".testimonial-card").length;

function updateSlider() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
}

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
});
prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentSlide = +dot.getAttribute("data-index");
    updateSlider();
  });
});

setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}, 6000);

// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector(".btn-primary");
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = "linear-gradient(135deg, #00d4aa, #00a885)";

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = "";
    e.target.reset();
  }, 3000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Skip modal buttons
    if (this.id === "modalGithub") return;

    e.preventDefault();
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
// ===== EMAILJS INIT =====
emailjs.init("EvDKZPGy8Gp8dGUma"); // <-- Replace with your Public Key

// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");

  // Reset status
  status.className = "form-status";
  status.textContent = "";

  // Show loading
  btn.classList.add("sending");
  btn.innerHTML = '<span class="spinner"></span> Sending...';

  // Get server time (UTC)
  // Get client's local time
  const now = new Date();

  const clientTime = now.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  // Convert to your country time (Pakistan - Change if needed)
  const myCountryTime = now.toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const serverTime = `📍 Client: ${clientTime}\n🏠 Pakistan: ${myCountryTime} PKT`;

  // Prepare template params
  const templateParams = {
    "app-name": "Hafiz.Dev", // <-- Change to your app/portfolio name
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    time: serverTime,
    message: document.getElementById("message").value,
  };

  // Send email
  emailjs.send("service_ghw5n7e", "template_oxybg2l", templateParams).then(
    function () {
      // Success
      btn.classList.remove("sending");
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = "linear-gradient(135deg, #00d4aa, #00a885)";

      status.className = "form-status success";
      status.innerHTML =
        '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';

      // Reset form
      document.getElementById("contactForm").reset();

      // Reset button after 4 seconds
      setTimeout(function () {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = "";
        status.className = "form-status";
        status.textContent = "";
      }, 4000);
    },
    function (error) {
      // Error
      btn.classList.remove("sending");
      btn.innerHTML = '<i class="fas fa-times"></i> Failed!';
      btn.style.background = "linear-gradient(135deg, #ff6584, #e0456a)";

      status.className = "form-status error";
      status.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';

      console.error("EmailJS Error:", error);

      // Reset button after 4 seconds
      setTimeout(function () {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = "";
        status.className = "form-status";
        status.textContent = "";
      }, 4000);
    },
  );
});

// ==========================================
// PROJECT MODAL
// ==========================================
const projectModal = document.getElementById("projectModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

// Open modal
document.querySelectorAll(".portfolio-view-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const card = this.closest(".portfolio-card");

    const title = card.getAttribute("data-title");
    const category = card.getAttribute("data-cat");
    const skills = card.getAttribute("data-skills");
    const description = card.getAttribute("data-description");
    const thumbnail = card.getAttribute("data-thumbnail");
    const mockup = card.getAttribute("data-mockup");
    const github = card.getAttribute("data-github");
    const year = card.getAttribute("data-year");

    // Populate text
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalCategory").textContent = "Mobile App";
    document.getElementById("modalCat").textContent = category;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalGithub").href = github;
    document.getElementById("modalYear").textContent = year || "2024";

    // Populate skills
    const skillsContainer = document.getElementById("modalSkills");
    skillsContainer.innerHTML = "";
    skills.split(",").forEach((skill) => {
      const tag = document.createElement("span");
      tag.className = "modal-skill-tag";
      tag.textContent = skill.trim();
      skillsContainer.appendChild(tag);
    });

    // Thumbnail
    const thumbImg = document.getElementById("modalThumbImg");
    const thumbContainer = document.getElementById("modalThumbnail");
    thumbImg.onerror = function () {
      this.style.display = "none";
      thumbContainer.style.background = getPlaceholderGradient(title);
      thumbContainer.style.minHeight = "300px";
    };
    if (thumbnail && thumbnail !== "") {
      thumbImg.src = thumbnail;
      thumbImg.alt = title;
      thumbImg.style.display = "block";
      thumbContainer.style.background = "";
      thumbContainer.style.minHeight = "";
    } else {
      thumbImg.style.display = "none";
      thumbContainer.style.background = getPlaceholderGradient(title);
      thumbContainer.style.minHeight = "300px";
    }

    // Mockup
    const mockupContainer = document.getElementById("modalMockup");
    const mockupImg = document.getElementById("modalMockupImg");
    if (mockup && mockup !== "") {
      mockupImg.src = mockup;
      mockupImg.alt = title + " Mockup";
      mockupImg.style.display = "block";
      mockupContainer.innerHTML = "";
      mockupContainer.appendChild(mockupImg);
      mockupImg.onerror = function () {
        mockupContainer.innerHTML = `
                    <div class="modal-img-placeholder">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Mockup Coming Soon</span>
                    </div>
                `;
      };
    } else {
      mockupContainer.innerHTML = `
                <div class="modal-img-placeholder">
                    <i class="fas fa-mobile-alt"></i>
                    <span>Mockup Coming Soon</span>
                </div>
            `;
    }

    // Scroll to top
    document.getElementById("modalContent").scrollTop = 0;

    // Show modal
    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function getPlaceholderGradient(title) {
  const gradients = [
    "linear-gradient(135deg, #1a1a3e, #2a1a4e)",
    "linear-gradient(135deg, #1a2a3e, #1a3a4e)",
    "linear-gradient(135deg, #2a1a2e, #3a1a3e)",
    "linear-gradient(135deg, #1a2a2e, #1a3a3e)",
    "linear-gradient(135deg, #2a2a1e, #3a3a1e)",
    "linear-gradient(135deg, #1a1a2e, #2a1a3e)",
  ];
  return gradients[title.length % gradients.length];
}

// Close modal
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
    } else if (projectModal.classList.contains("active")) {
      closeModal();
    }
  }
});

function closeModal() {
  projectModal.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================
// GITHUB BUTTON RIPPLE EFFECT
// ==========================================
document.getElementById("modalGithub").addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  // Get the href
  const url = this.getAttribute("href");

  // Create ripple
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = e.clientX - rect.left - size / 2 + "px";
  ripple.style.top = e.clientY - rect.top - size / 2 + "px";
  this.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);

  // Open link in new tab
  if (url && url !== "#") {
    window.open(url, "_blank");
  }
});

// ==========================================
// IMAGE LIGHTBOX (Click to Fullscreen)
// ==========================================

// Create lightbox element
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.id = "lightbox";
lightbox.innerHTML = `
    <button class="lightbox-close"><i class="fas fa-times"></i></button>
    <img src="" alt="" id="lightboxImg">
`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = lightbox.querySelector(".lightbox-close");

// Open lightbox on thumbnail click
document
  .getElementById("modalThumbnail")
  .addEventListener("click", function () {
    const img = this.querySelector("img");
    if (img && img.src && img.style.display !== "none") {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("active");
    }
  });

// Open lightbox on mockup click (use event delegation since mockup content may change)
document.getElementById("modalMockup").addEventListener("click", function () {
  const img = this.querySelector("img");
  if (img && img.src && img.style.display !== "none") {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
  }
});

// Close lightbox
lightboxClose.addEventListener("click", (e) => {
  e.stopPropagation();
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});
