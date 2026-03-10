const reveals = document.querySelectorAll(".reveal");
const toTop = document.getElementById("toTop");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

const revealOnScroll = () => {
  reveals.forEach((item) => {
    const windowHeight = window.innerHeight;
    const top = item.getBoundingClientRect().top;

    if (top < windowHeight - 80) {
      item.classList.add("show");
    }
  });

  if (window.scrollY > 400) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".chips span, .card, .hero-card").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(85,217,255,0.18), rgba(255,255,255,0.05) 40%)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.background = "";
  });
});