import type { Locale } from "./config";

export type Dictionary = {
  navigation: {
    about: string;
    experience: string;
    writing: string;
    portfolio: string;
    blog: string;
    downloadCv: string;
  };
  theme: { label: string; light: string; dark: string };
  portfolio: {
    heroEyebrow: string;
    aboutEyebrow: string;
    experienceEyebrow: string;
    writingEyebrow: string;
    visitBlog: string;
    unavailableWriting: string;
    viewProject: string;
    location: string;
    technologies: string;
    role: string;
    period: string;
  };
  footer: {
    linkedin: string;
    email: string;
    language: string;
    rights: string;
  };
  errors: { notFoundTitle: string; notFoundDescription: string; retry: string };
  actions: { backHome: string; skipToContent: string; openMenu: string; closeMenu: string };
};

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  id: () => import("./messages/id.json"),
  en: () => import("./messages/en.json"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await loaders[locale]()).default;
}
