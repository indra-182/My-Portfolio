import {
  SITE_INTERACTION,
  SITE_INTERACTION_ATTRIBUTE,
  type SiteInteraction,
} from "@/components/shell/site-interaction-contract";

const selectorFor = (interaction: SiteInteraction) =>
  `[${SITE_INTERACTION_ATTRIBUTE}='${interaction}']`;

const selectors = {
  themeToggle: selectorFor(SITE_INTERACTION.themeToggle),
  scrollToTop: selectorFor(SITE_INTERACTION.scrollToTop),
  activeNavLink: selectorFor(SITE_INTERACTION.activeNavLink),
  header: selectorFor(SITE_INTERACTION.header),
  mobileNavigation: selectorFor(SITE_INTERACTION.mobileNavigation),
  mobileNavigationOpen: selectorFor(SITE_INTERACTION.mobileNavigationOpen),
  mobileNavigationClose: selectorFor(SITE_INTERACTION.mobileNavigationClose),
};

const siteInteractions = String.raw`
(() => {
  const root = document.documentElement;
  let storedTheme = null;

  const applyTheme = (theme) => {
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor instanceof HTMLMetaElement) {
      themeColor.content = getComputedStyle(root).getPropertyValue("--background").trim();
    }
    const themeToggle = document.querySelector("${selectors.themeToggle}");
    if (themeToggle instanceof HTMLButtonElement) {
      themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    }
  };

  try {
    storedTheme = localStorage.getItem("theme");
  } catch {}

  applyTheme(storedTheme === "light" ? "light" : "dark");

  const start = () => {
    const scrollToTopButton = document.querySelector("${selectors.scrollToTop}");
    const header = document.querySelector("${selectors.header}");
    const navLinks = [...document.querySelectorAll("${selectors.activeNavLink}[href*='#']")].map(
      (link) => {
        const hash = new URL(link.href, window.location.href).hash;
        return {
          link,
          section: hash ? document.querySelector(hash) : null,
        };
      },
    );
    const scrollThreshold = 480;

    const updateScrollState = () => {
      const isVisible = window.scrollY >= scrollThreshold;
      const activationLine = (header?.getBoundingClientRect().height ?? 0) + 64;
      let activeLink = null;

      navLinks.forEach(({ section, link }) => {
        if (section instanceof HTMLElement && section.getBoundingClientRect().top <= activationLine) {
          activeLink = link;
        }
      });

      if (scrollToTopButton instanceof HTMLButtonElement) {
        scrollToTopButton.classList.toggle("is-visible", isVisible);
      }

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
    let scrollFrame = 0;
    const scheduleScrollState = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        updateScrollState();
      });
    };

    window.addEventListener("scroll", scheduleScrollState, { passive: true });
    window.addEventListener("resize", scheduleScrollState);

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const scrollToTop = target.closest("${selectors.scrollToTop}");
      if (scrollToTop instanceof HTMLButtonElement) {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth";
        window.scrollTo({ top: 0, behavior });
        return;
      }

      const themeToggle = target.closest("${selectors.themeToggle}");
      if (!(themeToggle instanceof HTMLButtonElement)) return;

      const nextTheme = root.classList.contains("dark") ? "light" : "dark";
      applyTheme(nextTheme);
      try {
        localStorage.setItem("theme", nextTheme);
      } catch {}
    });

    document.querySelectorAll("${selectors.mobileNavigation}").forEach((navigation) => {
      const dialog = navigation.querySelector("dialog");
      const openButton = navigation.querySelector("${selectors.mobileNavigationOpen}");
      const closeButton = navigation.querySelector("${selectors.mobileNavigationClose}");

      if (!(dialog instanceof HTMLDialogElement) || !(openButton instanceof HTMLButtonElement)) {
        return;
      }

      openButton.addEventListener("click", () => {
        dialog.showModal();
        openButton.setAttribute("aria-expanded", "true");
      });
      closeButton?.addEventListener("click", () => dialog.close());
      dialog.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => dialog.close());
      });
      dialog.addEventListener("close", () => {
        openButton.setAttribute("aria-expanded", "false");
        openButton.focus();
      });
    });

    const initializeCurrentState = () => {
      applyTheme(root.classList.contains("light") ? "light" : "dark");
      scheduleScrollState();
    };

    if (document.readyState === "complete") {
      initializeCurrentState();
    } else {
      window.addEventListener("load", initializeCurrentState, { once: true });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
`;

export function SiteInteractions() {
  return <script dangerouslySetInnerHTML={{ __html: siteInteractions }} />;
}
