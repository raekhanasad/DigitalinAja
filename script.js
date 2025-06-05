/*
 * scripts.js - JavaScript functionality for interactive website features
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navbar = document.querySelector(".navbar");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const backToTopBtn = document.querySelector(".back-to-top");
  const loadingScreen = document.querySelector(".loading-screen");
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const testimonialDots = document.querySelectorAll(".dot");

  // ------------------------
  // Loading Screen - hide after page load
  // ------------------------
  window.addEventListener("load", () => {
    if (loadingScreen) {
      loadingScreen.classList.add("hidden");
    }
  });

  // ------------------------
  // Mobile Menu Toggle
  // ------------------------
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });
  }

  // ------------------------
  // Navbar Scroll Behavior
  // - Hide on scroll down
  // - Show on scroll up
  // - Add scrolled class on scroll
  // ------------------------
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for background and shadow
    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll down/up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Back to Top Button show/hide
    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  });

  // ------------------------
  // Back to Top Button click smooth scroll
  // ------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ------------------------
  // Smooth scrolling for anchor links (if any)
  // ------------------------
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetID = link.getAttribute("href").substring(1);
      const targetElem = document.getElementById(targetID);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ------------------------
  // Custom Cursor Effects
  // ------------------------
  if (cursor && cursorFollower) {
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    // Show cursors on mouse enter
    window.addEventListener("mousemove", (e) => {
      cursor.style.opacity = "1";
      cursorFollower.style.opacity = "1";

      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Animate follower lag behind cursor
    function followCursor() {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;

      cursorFollower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;

      requestAnimationFrame(followCursor);
    }
    followCursor();

    // Optional: cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .ripple-effect, .nav-link, .cta-btn"
    );
    interactiveElements.forEach((elem) => {
      elem.addEventListener("mouseenter", () => {
        cursor.style.transform += " scale(1.5)";
        cursorFollower.style.transform += " scale(2)";
      });
      elem.addEventListener("mouseleave", () => {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
        cursorFollower.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(1)`;
      });
    });
  }

  // ------------------------
  // Testimonial Slider
  // ------------------------
  if (testimonialCards.length && testimonialDots.length) {
    let activeIndex = 0;

    const setActiveSlide = (index) => {
      testimonialCards.forEach((card, i) => {
        card.classList.toggle("active", i === index);
      });
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
      activeIndex = index;
    };

    testimonialDots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        setActiveSlide(i);
      });
    });

    // Optional: auto slide every 5 seconds
    setInterval(() => {
      activeIndex = (activeIndex + 1) % testimonialCards.length;
      setActiveSlide(activeIndex);
    }, 5000);
  }

  // ------------------------
  // Ripple effect on buttons with .ripple-effect class
  // ------------------------
  const rippleButtons = document.querySelectorAll(".ripple-effect");
  rippleButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");

      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      ripple.className = "ripple";

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
