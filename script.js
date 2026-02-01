/**
 * Smooth scroll and active section highlighting for Meron Abera portfolio
 */

(function () {
  "use strict";

  const navLinks = document.querySelectorAll(".nav-link");
  const rightNavLinks = document.querySelectorAll(".page-nav-right a:not(.page-nav-cta)");
  const allNavLinks = Array.from(navLinks).concat(Array.from(rightNavLinks));
  const navIds = Array.from(navLinks).map(function (l) {
    return l.getAttribute("href").slice(1);
  });
  const sections = document.querySelectorAll(
    navIds.map(function (id) {
      return "#" + id;
    }).join(", ")
  );

  // Smooth scroll on nav click
  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Update active nav link based on scroll position
  function setActiveSection() {
    const scrollY = window.pageYOffset;
    let activeSet = false;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        allNavLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
            activeSet = true;
          }
        });
      }
    });

    if (!activeSet && sections.length > 0) {
      allNavLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#about") {
          link.classList.add("active");
        }
      });
    }
  }

  // Throttled scroll handler
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        setActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  setActiveSection();
})();
