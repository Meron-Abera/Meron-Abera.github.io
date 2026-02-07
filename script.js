/**
 * Smooth scroll and active section highlighting for Meron Abera portfolio
 */

(function () {
  "use strict";

  const navLinks = document.querySelectorAll(".nav-link");
  const rightNavLinks = document.querySelectorAll(".page-nav-right a:not(.page-nav-cta)");
  const allNavLinks = Array.from(navLinks).concat(Array.from(rightNavLinks));
  const navIds = Array.from(rightNavLinks).length
    ? Array.from(rightNavLinks).map(function (l) {
        const href = l.getAttribute("href");
        return href && href.startsWith("#") ? href.slice(1) : null;
      }).filter(Boolean)
    : Array.from(navLinks).map(function (l) {
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

  // Update active nav link based on scroll position (document-relative, first match wins for overlapping sections)
  function setActiveSection() {
    const scrollY = window.pageYOffset;
    const offset = 120;
    let activeId = null;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY - offset;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        activeId = section.getAttribute("id");
        break;
      }
    }

    if (activeId) {
      allNavLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + activeId) {
          link.classList.add("active");
        }
      });
    } else if (sections.length > 0) {
      allNavLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#hero") {
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

  // Affiliations timeline: fade-in when section enters viewport
  const affiliationsSection = document.querySelector(".affiliations-section");
  if (affiliationsSection) {
    const affiliationsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );
    affiliationsObserver.observe(affiliationsSection);
  }
})();
