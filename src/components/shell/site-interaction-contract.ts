export const SITE_INTERACTION_ATTRIBUTE = "data-site-interaction";

export const SITE_INTERACTION = {
  themeToggle: "theme-toggle",
  scrollToTop: "scroll-to-top",
  activeNavLink: "active-nav-link",
  header: "header",
  mobileNavigation: "mobile-navigation",
  mobileNavigationOpen: "mobile-navigation-open",
  mobileNavigationClose: "mobile-navigation-close",
} as const;

export type SiteInteraction = (typeof SITE_INTERACTION)[keyof typeof SITE_INTERACTION];
