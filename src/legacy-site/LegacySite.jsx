import { useEffect, useRef, useState } from "react";
import "./main.css";

export default function LegacySite() {
  const typedRef = useRef(null);
  const [mobileActive, setMobileActive] = useState(false);

  // Simple typed effect (cycles through comma-separated items)
  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;
    const items = (el.getAttribute("data-typed-items") || "")
      .split(",")
      .map((s) => s.trim());
    let idx = 0;
    let charIdx = 0;
    let forward = true;
    let timeout;

    function tick() {
      const current = items[idx] || "";
      if (forward) {
        charIdx++;
        if (charIdx >= current.length) {
          forward = false;
          timeout = setTimeout(tick, 800);
          return;
        }
      } else {
        charIdx--;
        if (charIdx <= 0) {
          forward = true;
          idx = (idx + 1) % items.length;
        }
      }
      el.textContent = current.slice(0, charIdx);
      timeout = setTimeout(tick, forward ? 100 : 50);
    }

    tick();
    return () => clearTimeout(timeout);
  }, []);

  // Toggle header site name & body scrolled class
  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 80) {
        document.querySelector(".header-sitename")?.classList?.add("visible");
        document.body.classList.add("scrolled");
      } else {
        document
          .querySelector(".header-sitename")
          ?.classList?.remove("visible");
        document.body.classList.remove("scrolled");
      }

      // Update active nav link
      const links = Array.from(
        document.querySelectorAll('#navmenu a[href^="#"]')
      );
      const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);
      const scrollPos = window.scrollY + 120;
      let currentSection = null;
      sections.forEach((section) => {
        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          currentSection = section;
        }
      });
      links.forEach((link) => link.classList.remove("active"));
      if (currentSection) {
        const activeLink = document.querySelector(
          `#navmenu a[href="#${currentSection.id}"]`
        );
        activeLink?.classList.add("active");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate counters and skills when visible
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target.classList.contains("purecounter")) {
            const end = parseInt(
              entry.target.getAttribute("data-purecounter-end") || "0",
              10
            );
            let val = 0;
            const step = Math.max(1, Math.floor(end / 40));
            const id = setInterval(() => {
              val += step;
              if (val >= end) {
                entry.target.textContent = String(end);
                clearInterval(id);
              } else {
                entry.target.textContent = String(val);
              }
            }, 20);
          }

          // progress bars
          entry.target.querySelectorAll &&
            entry.target
              .querySelectorAll(".progress .progress-bar")
              .forEach((pb) => {
                const width = pb.getAttribute("aria-valuenow") + "%";
                pb.style.width = width;
              });
        });
      },
      { threshold: 0.4 }
    );

    document
      .querySelectorAll(".purecounter, .skills-animation")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function toggleMobileNav() {
    setMobileActive((v) => {
      const next = !v;
      document.body.classList.toggle("mobile-nav-active", next);
      return next;
    });
  }

  // Close mobile nav on link click
  useEffect(() => {
    const links = Array.from(document.querySelectorAll("#navmenu a"));
    const handler = () => {
      if (document.body.classList.contains("mobile-nav-active")) {
        document.body.classList.remove("mobile-nav-active");
        setMobileActive(false);
      }
    };
    links.forEach((l) => l.addEventListener("click", handler));
    return () => links.forEach((l) => l.removeEventListener("click", handler));
  }, []);

  return (
    <div>
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a href="#home-scroll" className="logo d-flex align-items-center">
            <h1 className="sitename header-sitename">Mayank Yadav</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#home-scroll" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#about-scroll">About</a>
              </li>
              <li>
                <a href="#portfolio-scroll">Portfolio</a>
              </li>
              <li>
                <a href="#contact-scroll">Contact</a>
              </li>
            </ul>
            <button
              className="mobile-nav-toggle d-xl-none"
              onClick={toggleMobileNav}
              aria-label="Toggle navigation"
            >
              {mobileActive ? "✕" : "☰"}
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        <section id="home-scroll" className="hero section dark-background">
          <picture>
            <source srcSet="assets/img/bg-4.png" media="(max-width: 768px)" />
            <img src="assets/img/hero-bg-3.png" alt="" />
          </picture>

          <div className="container">
            <h2>Mayank Yadav</h2>
            <p>
              I'm{" "}
              <span
                ref={typedRef}
                className="typed"
                data-typed-items="Mobile Engineer, Flutter Specialist, Building Production-Ready Apps, Turning Ideas into Scalable Products"
              ></span>
              <span className="typed-cursor typed-cursor--blink">|</span>
            </p>
            <div className="social-links">
              <a href="https://www.github.com/captainrogers69/">
                <i className="bi bi-github" />
              </a>
              <a href="https://www.linkedin.com/in/captainrogers69/">
                <i className="bi bi-linkedin" />
              </a>
              <a href="https://instagram.com/captainrogers69?igshid=ZmZhODViOGI=">
                <i className="bi bi-instagram" />
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about-scroll" className="about section main">
          <div className="about section">
            <div className="hero-footer text-center mx-auto px-3 px-md-0 pb-4">
              <h3 className="sitename">Greetings 👋🏻</h3>
              <p>
                Looking for a Flutter-weight champion? You've landed in the
                right place!
              </p>
            </div>

            <div className="container" data-aos="fade-up">
              <div className="row gy-4 justify-content-center">
                <div className="col-lg-4">
                  <img
                    src="assets/img/profile-img.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="col-lg-8 content">
                  <h1>Mobile Engineer</h1>
                  <p className="fst py-3">
                    I build production-ready mobile applications using Flutter,
                    with a strong focus on performance, clean architecture, and
                    scalability...
                  </p>
                  <div className="row">
                    <div className="col-lg-6">
                      <ul>
                        <li>
                          <i className="bi bi-chevron-right" />
                          <strong>Email:</strong>
                          <span>myyadavmayank1998@gmail.com</span>
                        </li>
                        <li>
                          <i className="bi bi-chevron-right" />
                          <strong>Degree:</strong>
                          <span>Master of Computer Application</span>
                        </li>
                        <li>
                          <i className="bi bi-chevron-right" />
                          <strong>City:</strong>
                          <span>Moradabad, India</span>
                        </li>
                        <li>
                          <i className="bi bi-chevron-right" />
                          <strong>Freelance:</strong>
                          <span>Available</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="py-3">
                    Interested in working together?{" "}
                    <strong>Let's build something solid.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <section id="stats" className="stats section">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                    <i className="bi bi-journal-richtext" />
                    <div className="stats-item">
                      <span data-purecounter-end="25" className="purecounter">
                        0
                      </span>
                      <p>Apps</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                    <i className="bi bi-journal-richtext" />
                    <div className="stats-item">
                      <span data-purecounter-end="20" className="purecounter">
                        0
                      </span>
                      <p>Projects</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                    <i className="bi bi-emoji-smile" />
                    <div className="stats-item">
                      <span data-purecounter-end="15" className="purecounter">
                        0
                      </span>
                      <p>Happy Clients</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                    <i className="bi bi-headset" />
                    <div className="stats-item">
                      <span data-purecounter-end="4" className="purecounter">
                        0
                      </span>
                      <p>Years Of Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section id="skills" className="skills section">
              <div className="container section-title" data-aos="fade-up">
                <h2>Skills</h2>
                <div>
                  <span>My</span>{" "}
                  <span className="description-title">Skills</span>
                </div>
              </div>

              <div
                className="container"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="row skills-content skills-animation">
                  <div className="col-lg-6">
                    <div className="progress">
                      <span className="skill">
                        <span>Flutter</span>
                      </span>
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow="85"
                          aria-valuemin="0"
                          aria-valuemax="85"
                        />
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">
                        <span>Dart</span>
                      </span>
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow="87"
                        />
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">
                        <span>Firebase</span>
                      </span>
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow="85"
                        />
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">
                        <span>State Management - Bloc, Riverpod, GetX</span>
                      </span>
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow="88"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="progress">
                      <span className="skill">
                        <span>CI/CD</span>
                      </span>
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow="82"
                        />
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">
                        <span>API Developement (Node.js/PHP)</span>
                      </span>
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow="55"
                        />
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">
                        <span>MySQL</span>
                      </span>
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow="73"
                        />
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">
                        <span>Git/Github/Gitlab</span>
                      </span>
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow="80"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Resume / Portfolio truncated for brevity - kept markup structure in place */}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio-scroll" className="portfolio section">
          <div className="hero-footer text-center mx-auto px-3 px-md-0 pb-4">
            <p>I'm not just a Flutter developer, I'm a Flutter-fly!</p>
          </div>

          <div className="container">
            <div className="row gy-4 isotope-container">
              <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                <div className="portfolio-content h-100">
                  <img
                    src="assets/img/portfolio/allevents-1.png"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>AllEvents 1</h4>
                    <a
                      href="assets/img/portfolio/allevents-1.png"
                      title="AllEvents - Home"
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in" />
                    </a>
                    <a
                      href="https://allevents.in/app"
                      title="More Details"
                      className="details-link"
                    >
                      <i className="bi bi-link-45deg" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                <div className="portfolio-content h-100">
                  <img
                    src="assets/img/portfolio/allevents-2.png"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>AllEvents 2</h4>
                    <a
                      href="assets/img/portfolio/allevents-2.png"
                      title="AllEvents - Curated"
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in" />
                    </a>
                    <a
                      href="https://allevents.in/app"
                      title="More Details"
                      className="details-link"
                    >
                      <i className="bi bi-link-45deg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container text-center py-4">
          <p className="mb-0">
            © {new Date().getFullYear()} Mayank Yadav — Built with React
          </p>
        </div>
      </footer>
    </div>
  );
}
