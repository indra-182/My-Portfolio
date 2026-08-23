const siteInteractions = String.raw`
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

  let started = false;
  const start = () => {
    if (started) return;
    started = true;

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
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
