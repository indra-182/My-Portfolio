const siteInteractions = `
(() => {
  const root = document.documentElement;
  let storedTheme = null;

  try {
    storedTheme = localStorage.getItem("theme");
  } catch {}

  const applyTheme = (theme) => {
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
  };

  applyTheme(storedTheme === "light" ? "light" : "dark");

  const start = () => {

    const scrollToTopButton = document.querySelector("[data-scroll-to-top]");
    const navLinks = [...document.querySelectorAll(".site-nav-link[href*='#']")].map((link) => {
      const hash = new URL(link.href, window.location.href).hash;
      return {
        link,
        section: hash ? document.querySelector(hash) : null,
      };
    });
    const scrollThreshold = 480;

    const updateScrollState = () => {
      if (scrollToTopButton instanceof HTMLButtonElement) {
        const isVisible = window.scrollY >= scrollThreshold;
        scrollToTopButton.classList.toggle("is-visible", isVisible);
      }

      const header = document.querySelector(".site-header");
      const activationLine = (header?.getBoundingClientRect().height ?? 0) + 64;
      let activeLink = null;

      navLinks.forEach(({ section, link }) => {
        if (section instanceof HTMLElement && section.getBoundingClientRect().top <= activationLine) {
          activeLink = link;
        }
      });

      navLinks.forEach(({ link }) => {
        const isActive = link === activeLink;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else if (link.getAttribute("aria-current") === "location") {
          link.removeAttribute("aria-current");
        }
      });
    };

    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const scrollToTop = target.closest("[data-scroll-to-top]");
      if (scrollToTop instanceof HTMLButtonElement) {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth";
        window.scrollTo({ top: 0, behavior });
        return;
      }

      const themeToggle = target.closest("[data-theme-toggle]");
      if (!(themeToggle instanceof HTMLButtonElement)) return;

      const nextTheme = root.classList.contains("dark") ? "light" : "dark";
      applyTheme(nextTheme);
      try {
        localStorage.setItem("theme", nextTheme);
      } catch {}
    });

    document.querySelectorAll("[data-mobile-navigation]").forEach((navigation) => {
      const dialog = navigation.querySelector("dialog");
      const openButton = navigation.querySelector("[data-mobile-navigation-open]");
      const closeButton = navigation.querySelector("[data-mobile-navigation-close]");

      if (!(dialog instanceof HTMLDialogElement) || !(openButton instanceof HTMLButtonElement)) {
        return;
      }

      openButton.addEventListener("click", () => dialog.showModal());
      closeButton?.addEventListener("click", () => dialog.close());
      dialog.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => dialog.close());
      });
      dialog.addEventListener("close", () => openButton.focus());
    });
  };

  if (document.readyState === "complete") {
    setTimeout(start, 0);
  } else {
    window.addEventListener("load", () => setTimeout(start, 0), { once: true });
  }
})();
`;

export function SiteInteractions() {
  return <script dangerouslySetInnerHTML={{ __html: siteInteractions }} />;
}
