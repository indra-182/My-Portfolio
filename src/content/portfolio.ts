import { locales, type Locale } from "@/i18n/config";
import {
  PortfolioContentSchema,
  PortfolioFactsSchema,
  PortfolioTranslationsSchema,
  type PortfolioContent,
} from "./portfolio-schema";

export const portfolioFacts = PortfolioFactsSchema.parse({
  profile: {
    name: "Mahadi Indra Manurung",
    role: "Senior Frontend Engineer",
    location: {
      locality: "Bogor",
      countryName: "Indonesia",
      countryCode: "ID",
    },
    imageSrc: "/images/mahadi-indra.webp",
  },
  projects: [
    {
      id: "petron-philippines-corporate-dashboard",
      title: "Petron Philippines Corporate Dashboard",
      technologies: ["React", "Next.js", "TypeScript", "State management", "Data fetching"],
      featured: true,
    },
    {
      id: "maybank-unit-trust",
      title: "Maybank Unit Trust",
      technologies: ["React", "TypeScript", "Playwright", "Tailwind CSS"],
      featured: false,
    },
    {
      id: "bca-fixed-income",
      title: "BCA Fixed Income",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      featured: false,
    },
    {
      id: "pegadaian-asuransi",
      title: "Pegadaian Asuransi",
      technologies: ["React", "TypeScript", "State management", "Data fetching"],
      featured: false,
    },
    {
      id: "bank-danamon-mutual-fund",
      title: "Bank Danamon Mutual Fund",
      technologies: ["React", "Next.js", "TypeScript", "shadcn/ui"],
      featured: false,
    },
  ],
  experiences: [
    {
      id: "indivara-group",
      company: "Indivara Group",
      role: "Senior Frontend Engineer",
      projectIds: [
        "petron-philippines-corporate-dashboard",
        "maybank-unit-trust",
        "bca-fixed-income",
        "pegadaian-asuransi",
        "bank-danamon-mutual-fund",
      ],
    },
  ],
  testimonials: [
    {
      author: "Frisko Mayufid",
      role: "Senior Frontend Engineer",
      organization: "Indivara Group",
      quote:
        "Indra is a highly recommended engineer with strong technical skills and a collaborative mindset. He consistently delivers quality work across complex financial projects and is someone you can always rely on.",
      approved: true,
      category: "collaborator",
    },
    {
      author: "Wahyu Aziz",
      role: "Backend Engineer",
      organization: "Indivara Group",
      quote:
        "Working with Indra has been a great experience. He has deep frontend expertise and communicates well across the stack. Highly recommended as a teammate and engineer.",
      approved: true,
      category: "collaborator",
    },
    {
      author: "Rehan Zibran",
      role: "Computer Science Student",
      organization: "Indraprasta PGRI University",
      quote:
        "Indra helped me with my thesis project using Java. He explained everything clearly and made sure I understood the concepts. Great mentor and teacher.",
      approved: true,
      category: "mentoring",
    },
    {
      author: "Muhammad Abdurrafi",
      role: "Computer Science Student",
      organization: "Indraprasta PGRI University",
      quote:
        "Indra is a thoughtful mentor who makes technical concepts easier to understand. His guidance helped me approach my project with more confidence and structure.",
      approved: true,
      category: "mentoring",
    },
  ],
});

export const portfolioTranslations = PortfolioTranslationsSchema.parse({
  id: {
    profile: {
      headline:
        "Saya merancang frontend untuk workflow finansial yang tidak boleh membingungkan pengguna.",
      valueProposition:
        "Dari registrasi korporat sampai transaksi investasi, saya mengubah state, validasi, dan keputusan yang rumit menjadi alur yang jelas, tangguh, dan dapat diuji.",
      imageAlt: "Mahadi Indra Manurung, Senior Frontend Engineer",
    },
    capabilities: [
      {
        title: "Menjernihkan alur yang rumit",
        description:
          "Saya memecah workflow multi-langkah menjadi state, keputusan, dan feedback yang dapat dipahami pengguna.",
      },
      {
        title: "Menjaga batas data tetap eksplisit",
        description:
          "Saya menyusun komponen dan data flow agar validasi, perubahan state, dan tanggung jawab setiap bagian tetap dapat diprediksi.",
      },
      {
        title: "Memvalidasi perjalanan end-to-end",
        description:
          "Saya menghubungkan implementasi dengan pengujian browser dan feedback lintas fungsi sebelum perubahan dirilis.",
      },
    ],
    experiences: {
      "indivara-group": {
        period: "Agustus 2021 - Sekarang",
        responsibilities: [
          "Mengembangkan pengalaman frontend untuk produk finansial dan operasional dengan fokus pada maintainability.",
          "Berkolaborasi dengan product, design, backend, dan QA untuk menyelesaikan workflow end-to-end.",
        ],
        projects: {
          "petron-philippines-corporate-dashboard": {
            summary:
              "Dashboard korporat untuk registrasi, autentikasi, dan perpindahan dana antar perusahaan.",
            problem:
              "Pengguna korporat membutuhkan satu alur yang konsisten untuk mengelola akses dan transaksi dengan beberapa langkah penting.",
            ownership:
              "Memimpin implementasi frontend untuk registrasi, penyiapan PIN, autentikasi, transfer antarperusahaan, serta pengunggahan transaksi massal melalui CSV dan Excel.",
            delivery:
              "Memecah workflow menjadi state UI yang jelas dan menghubungkan validasi input dengan feedback yang dapat ditindaklanjuti.",
            outcome:
              "Workflow operasional tersusun sebagai pengalaman dashboard yang lebih terarah dan mudah diuji.",
          },
          "maybank-unit-trust": {
            summary: "Alur produk unit trust dengan coverage regresi berbasis browser.",
            problem:
              "Workflow investasi perlu konsisten di berbagai state dan tetap aman ketika mengalami perubahan fitur.",
            ownership:
              "Mengembangkan UI untuk alur unit trust dan menulis coverage regresi dengan Playwright.",
            delivery:
              "Menyusun komponen dan skenario pengujian yang mengikuti perjalanan pengguna dari input hingga konfirmasi.",
            outcome:
              "Perubahan pada alur utama dapat diverifikasi dengan lebih terstruktur sebelum dirilis.",
          },
          "bca-fixed-income": {
            summary: "Pengalaman frontend untuk workflow produk fixed income.",
            problem:
              "Informasi dan langkah transaksi perlu disajikan secara bertahap agar pengguna dapat mengambil keputusan dengan konteks yang cukup.",
            ownership:
              "Mengerjakan bagian frontend dari workflow fixed-income dan menyelaraskan state antar tahap transaksi.",
            delivery:
              "Menerjemahkan kebutuhan produk menjadi layout dan interaksi yang konsisten dengan sistem desain yang digunakan tim.",
            outcome:
              "Workflow fixed-income memiliki struktur antarmuka yang lebih mudah dipahami dan dipelihara.",
          },
          "pegadaian-asuransi": {
            summary: "Pengajuan dan pelacakan klaim asuransi.",
            problem:
              "Pengguna membutuhkan visibilitas yang jelas terhadap pengajuan klaim dan tahap prosesnya.",
            ownership:
              "Mengimplementasikan tampilan pengajuan klaim dan pelacakan status untuk pengalaman asuransi.",
            delivery:
              "Menyusun form, penyajian status, serta state kosong dan error agar setiap langkah memiliki feedback yang jelas.",
            outcome:
              "Pengguna dapat memahami posisi klaimnya tanpa harus menebak langkah berikutnya.",
          },
          "bank-danamon-mutual-fund": {
            summary: "Workflow subscription, redemption, dan switching reksa dana.",
            problem:
              "Beberapa jenis transaksi reksa dana perlu terasa sebagai satu pengalaman yang kohesif.",
            ownership:
              "Membangun UI untuk subscription, redemption, dan switching dengan perhatian pada state dan validasi.",
            delivery:
              "Menggunakan pola komponen dan data flow yang konsisten untuk membedakan kebutuhan setiap transaksi.",
            outcome:
              "Serangkaian workflow reksa dana disajikan dengan pola interaksi yang lebih konsisten.",
          },
        },
      },
    },
  },
  en: {
    profile: {
      headline:
        "I design frontend systems for financial workflows that cannot afford to confuse users.",
      valueProposition:
        "From corporate onboarding to investment transactions, I turn complex states, validation, and decisions into clear, resilient, testable flows.",
      imageAlt: "Mahadi Indra Manurung, Senior Frontend Engineer",
    },
    capabilities: [
      {
        title: "Clarify complex flows",
        description:
          "I break multi-step workflows into states, decisions, and feedback that users can understand.",
      },
      {
        title: "Keep data boundaries explicit",
        description:
          "I structure components and data flow so validation, state changes, and ownership remain predictable.",
      },
      {
        title: "Verify the journey end to end",
        description:
          "I connect implementation with browser testing and cross-functional feedback before changes ship.",
      },
    ],
    experiences: {
      "indivara-group": {
        period: "August 2021 - Present",
        responsibilities: [
          "Develop frontend experiences for financial and operational products with a focus on maintainability.",
          "Collaborate with product, design, backend, and QA to deliver end-to-end workflows.",
        ],
        projects: {
          "petron-philippines-corporate-dashboard": {
            summary:
              "A corporate dashboard for registration, authentication, and inter-company transfers.",
            problem:
              "Corporate users needed a consistent flow for managing access and transactions across several important steps.",
            ownership:
              "Led frontend implementation for registration, PIN setup, authentication, inter-company transfer, and bulk CSV and Excel transaction uploads.",
            delivery:
              "Structured the workflow into clear UI states and connected input validation with actionable feedback.",
            outcome:
              "Operational workflows were shaped into a more directed and testable dashboard experience.",
          },
          "maybank-unit-trust": {
            summary: "Unit trust product flows with browser-based regression coverage.",
            problem:
              "Investment workflows needed to stay consistent across states and safe as features changed.",
            ownership:
              "Developed unit trust UI flows and added regression coverage with Playwright.",
            delivery:
              "Built components and test scenarios around the user journey from input through confirmation.",
            outcome: "Changes to core flows could be verified more systematically before release.",
          },
          "bca-fixed-income": {
            summary: "Frontend experience for fixed-income product workflows.",
            problem:
              "Information and transaction steps needed to be presented progressively so users had enough context to decide.",
            ownership:
              "Worked on the frontend of fixed-income workflows and aligned state across transaction stages.",
            delivery:
              "Translated product requirements into layouts and interactions consistent with the team design system.",
            outcome: "The fixed-income workflow became easier to understand and maintain.",
          },
          "pegadaian-asuransi": {
            summary: "Insurance claim submission and tracking.",
            problem:
              "Users needed clear visibility into claim submission and its current processing stage.",
            ownership:
              "Implemented claim submission and status tracking views for the insurance experience.",
            delivery:
              "Built forms, status presentation, and empty/error states so every step provided clear feedback.",
            outcome:
              "Users could understand the position of a claim without guessing the next step.",
          },
          "bank-danamon-mutual-fund": {
            summary: "Mutual fund subscription, redemption, and switching workflows.",
            problem:
              "Several mutual fund transaction types needed to feel like one cohesive experience.",
            ownership:
              "Built UI for subscription, redemption, and switching with attention to state and validation.",
            delivery:
              "Applied consistent component and data-flow patterns while accounting for each transaction type.",
            outcome:
              "A set of mutual fund workflows was presented with a more consistent interaction model.",
          },
        },
      },
    },
  },
});

const projectsById = new Map(portfolioFacts.projects.map((project) => [project.id, project]));

function assertExactKeys(actual: Record<string, unknown>, expected: string[], path: string) {
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = [...expected].sort();
  if (
    actualKeys.length !== expectedKeys.length ||
    actualKeys.some((key, index) => key !== expectedKeys[index])
  ) {
    throw new Error(`Missing or unexpected localized portfolio content at ${path}.`);
  }
}

function assemblePortfolio(locale: Locale): PortfolioContent {
  const copy = portfolioTranslations[locale];
  const experienceIds = portfolioFacts.experiences.map((experience) => experience.id);
  assertExactKeys(copy.experiences, experienceIds, `${locale}.experiences`);

  const experiences = portfolioFacts.experiences.map((experience) => {
    const experienceCopy = copy.experiences[experience.id];
    assertExactKeys(
      experienceCopy.projects,
      experience.projectIds,
      `${locale}.${experience.id}.projects`,
    );

    const projects = experience.projectIds.map((projectId) => {
      const project = projectsById.get(projectId);
      if (!project) throw new Error(`Missing project facts for ${projectId}.`);
      const projectCopy = experienceCopy.projects[projectId];
      if (!projectCopy)
        throw new Error(`Missing localized project content for ${locale}.${projectId}.`);
      return { ...project, ...projectCopy };
    });

    return {
      id: experience.id,
      company: experience.company,
      role: experience.role,
      period: experienceCopy.period,
      responsibilities: experienceCopy.responsibilities,
      projects,
    };
  });

  return PortfolioContentSchema.parse({
    locale,
    profile: { ...portfolioFacts.profile, ...copy.profile },
    capabilities: copy.capabilities,
    experiences,
    testimonials: portfolioFacts.testimonials,
  });
}

export const portfolioByLocale = Object.fromEntries(
  locales.map((locale) => [locale, assemblePortfolio(locale)]),
) as Record<Locale, PortfolioContent>;
