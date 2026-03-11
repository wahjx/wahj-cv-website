const reveals = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const toTop = document.getElementById("toTop");
const menuToggle = document.getElementById("menuToggle");
const navLinksBox = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const skillBars = document.querySelectorAll(".skill-fill");

skillBars.forEach((bar) => {
  const target = bar.getAttribute("data-width") || bar.style.width || "0%";
  bar.dataset.width = target;
  bar.style.width = "0";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      const bars = entry.target.querySelectorAll(".skill-fill");
      bars.forEach((bar) => {
        const targetWidth = bar.dataset.width || "0%";
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 150);
      });
    }
  });
}, { threshold: 0.14 });

reveals.forEach((section) => observer.observe(section));

const sections = [...document.querySelectorAll("section[id]")];

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }
  });

  toTop.classList.toggle("show", scrollY > 500);
});

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinksBox.classList.toggle("show");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinksBox) {
      navLinksBox.classList.remove("show");
    }
  });
});

document.querySelectorAll(".card, .btn, .chip, .tech-card").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const isRTL = document.documentElement.dir === "rtl";
    const isLightMode = document.body.classList.contains("light-mode");

    if (isRTL || isLightMode) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.background =
      `radial-gradient(circle at ${x}px ${y}px, rgba(79,209,255,0.14), rgba(255,255,255,0.04) 40%), ${getComputedStyle(document.documentElement).getPropertyValue("--card-solid")}`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.background = "";
  });
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  if (themeToggle) {
    themeToggle.textContent = "☀️";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "🌙";
    }

    document.querySelectorAll(".card, .btn, .chip, .tech-card").forEach((el) => {
      el.style.background = "";
    });
  });
}

function setLanguage(lang) {
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
    el.textContent = lang === "ar"
      ? el.getAttribute("data-ar")
      : el.getAttribute("data-en");
  });

  if (langToggle) {
    langToggle.textContent = lang === "ar" ? "EN" : "AR";
  }

  document.querySelectorAll(".card, .btn, .chip, .tech-card").forEach((el) => {
    el.style.background = "";
  });

  localStorage.setItem("lang", lang);
}

const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const currentLang = localStorage.getItem("lang") || "en";
    setLanguage(currentLang === "en" ? "ar" : "en");
  });
}
