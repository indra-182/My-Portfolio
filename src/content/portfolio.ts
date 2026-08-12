import type { PortfolioContent } from "./portfolio-schema";

const sharedProfile = {
  name: "Mahadi Indra Manurung",
  role: "Senior Frontend Engineer",
  location: "Bogor, Indonesia",
  imageSrc: "/images/mahadi-indra.webp",
};

const approvedTestimonials: PortfolioContent["testimonials"] = [
  {
    author: "Frisko Mayufid",
    role: "Senior Frontend Engineer",
    organization: "Indivara Group",
    quote:
      "Indra is a highly recommended engineer with strong technical skills and a collaborative mindset. He consistently delivers quality work across complex financial projects and is someone you can always rely on.",
    approved: true,
  },
  {
    author: "Wahyu Aziz",
    role: "Backend Engineer",
    organization: "Indivara Group",
    quote:
      "Working with Indra has been a great experience. He has deep frontend expertise and communicates well across the stack. Highly recommended as a teammate and engineer.",
    approved: true,
  },
  {
    author: "Rehan Zibran",
    role: "Computer Science Student",
    organization: "Indraprasta PGRI University",
    quote:
      "Indra helped me with my thesis project using Java. He explained everything clearly and made sure I understood the concepts. Great mentor and teacher.",
    approved: true,
  },
  {
    author: "Muhammad Abdurrafi",
    role: "Computer Science Student",
    organization: "Indraprasta PGRI University",
    quote:
      "Indra is a thoughtful mentor who makes technical concepts easier to understand. His guidance helped me approach my project with more confidence and structure.",
    approved: true,
  },
];

export const portfolioByLocale: Record<"id" | "en", PortfolioContent> = {
  id: {
    locale: "id",
    profile: {
      ...sharedProfile,
      headline: "Membangun antarmuka produk yang jelas, tangguh, dan siap dipakai.",
      valueProposition:
        "Saya membantu tim produk mengubah workflow yang kompleks menjadi pengalaman frontend yang mudah dipahami—dari dashboard korporat sampai alur transaksi finansial.",
      imageAlt: "Mahadi Indra Manurung, Senior Frontend Engineer",
    },
    about: {
      heading: "Frontend yang menghubungkan detail teknis dengan kebutuhan produk.",
      paragraphs: [
        "Saya bekerja di persimpangan antara UI yang rapi, state yang dapat diprediksi, dan kebutuhan bisnis yang nyata. Fokus saya adalah membuat alur penting terasa sederhana tanpa mengorbankan kualitas engineering.",
        "Dalam kolaborasi, saya senang memperjelas masalah lebih dulu, membangun batas data yang eksplisit, lalu memvalidasi hasil melalui testing dan feedback lintas fungsi.",
      ],
    },
    experiences: [
      {
        company: "Indivara Group",
        role: "Senior Frontend Engineer",
        period: "Agustus 2021 — Sekarang",
        responsibilities: [
          "Mengembangkan pengalaman frontend untuk produk finansial dan operasional dengan fokus pada maintainability.",
          "Berkolaborasi dengan product, design, backend, dan QA untuk menyelesaikan workflow end-to-end.",
        ],
        projects: [
          {
            title: "Petron Philippines Corporate Dashboard",
            summary:
              "Dashboard korporat untuk registrasi, autentikasi, dan perpindahan dana antar perusahaan.",
            problem:
              "Pengguna korporat membutuhkan satu alur yang konsisten untuk mengelola akses dan transaksi dengan beberapa langkah penting.",
            ownership:
              "Memimpin implementasi frontend untuk registrasi, PIN setup, authentication, inter-company transfer, serta upload transaksi bulk melalui CSV dan Excel.",
            delivery:
              "Memecah workflow menjadi state UI yang jelas dan menghubungkan validasi input dengan feedback yang dapat ditindaklanjuti.",
            outcome:
              "Workflow operasional tersusun sebagai pengalaman dashboard yang lebih terarah dan mudah diuji.",
            technologies: ["React", "Next.js", "TypeScript", "State management", "Data fetching"],
          },
          {
            title: "Maybank Unit Trust",
            summary: "Alur produk unit trust dengan coverage regresi berbasis browser.",
            problem:
              "Workflow investasi perlu konsisten di berbagai state dan tetap aman ketika mengalami perubahan fitur.",
            ownership:
              "Mengembangkan UI untuk alur unit trust dan menulis coverage regresi dengan Playwright.",
            delivery:
              "Menyusun komponen dan skenario pengujian yang mengikuti perjalanan pengguna dari input hingga konfirmasi.",
            outcome:
              "Perubahan pada alur utama dapat diverifikasi dengan lebih terstruktur sebelum dirilis.",
            technologies: ["React", "TypeScript", "Playwright", "Tailwind CSS"],
          },
          {
            title: "BCA Fixed Income",
            summary: "Pengalaman frontend untuk workflow produk fixed income.",
            problem:
              "Informasi dan langkah transaksi perlu disajikan secara bertahap agar pengguna dapat mengambil keputusan dengan konteks yang cukup.",
            ownership:
              "Mengerjakan bagian frontend dari workflow fixed-income dan menyelaraskan state antar tahap transaksi.",
            delivery:
              "Menerjemahkan kebutuhan produk menjadi layout dan interaksi yang konsisten dengan sistem desain yang digunakan tim.",
            outcome:
              "Workflow fixed-income memiliki struktur antarmuka yang lebih mudah dipahami dan dipelihara.",
            technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          },
          {
            title: "Pegadaian Asuransi",
            summary: "Pengajuan dan pelacakan klaim asuransi.",
            problem:
              "Pengguna membutuhkan visibilitas yang jelas terhadap pengajuan klaim dan tahap prosesnya.",
            ownership:
              "Mengimplementasikan tampilan pengajuan klaim dan tracking status untuk pengalaman asuransi.",
            delivery:
              "Menyusun form, status presentation, dan empty/error states agar setiap langkah memiliki feedback yang jelas.",
            outcome:
              "Pengguna dapat memahami posisi klaimnya tanpa harus menebak langkah berikutnya.",
            technologies: ["React", "TypeScript", "State management", "Data fetching"],
          },
          {
            title: "Bank Danamon Mutual Fund",
            summary: "Workflow subscription, redemption, dan switching reksa dana.",
            problem:
              "Beberapa jenis transaksi reksa dana perlu terasa sebagai satu pengalaman yang kohesif.",
            ownership:
              "Membangun UI untuk subscription, redemption, dan switching dengan perhatian pada state dan validasi.",
            delivery:
              "Menggunakan pola komponen dan data flow yang konsisten untuk membedakan kebutuhan setiap transaksi.",
            outcome:
              "Serangkaian workflow reksa dana disajikan dengan pola interaksi yang lebih konsisten.",
            technologies: ["React", "Next.js", "TypeScript", "shadcn/ui"],
          },
        ],
      },
    ],
    testimonials: approvedTestimonials,
  },
  en: {
    locale: "en",
    profile: {
      ...sharedProfile,
      headline: "Building product interfaces that are clear, resilient, and ready to use.",
      valueProposition:
        "I help product teams turn complex workflows into understandable frontend experiences—from corporate dashboards to financial transaction journeys.",
      imageAlt: "Mahadi Indra Manurung, Senior Frontend Engineer",
    },
    about: {
      heading: "Frontend work that connects technical detail with product needs.",
      paragraphs: [
        "I work at the intersection of thoughtful UI, predictable state, and real business needs. My focus is making important workflows feel simple without compromising engineering quality.",
        "In collaboration, I like to clarify the problem first, build explicit data boundaries, and validate the result through testing and cross-functional feedback.",
      ],
    },
    experiences: [
      {
        company: "Indivara Group",
        role: "Senior Frontend Engineer",
        period: "August 2021 — Present",
        responsibilities: [
          "Develop frontend experiences for financial and operational products with a focus on maintainability.",
          "Collaborate with product, design, backend, and QA to deliver end-to-end workflows.",
        ],
        projects: [
          {
            title: "Petron Philippines Corporate Dashboard",
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
            technologies: ["React", "Next.js", "TypeScript", "State management", "Data fetching"],
          },
          {
            title: "Maybank Unit Trust",
            summary: "Unit trust product flows with browser-based regression coverage.",
            problem:
              "Investment workflows needed to stay consistent across states and safe as features changed.",
            ownership:
              "Developed unit trust UI flows and added regression coverage with Playwright.",
            delivery:
              "Built components and test scenarios around the user journey from input through confirmation.",
            outcome: "Changes to core flows could be verified more systematically before release.",
            technologies: ["React", "TypeScript", "Playwright", "Tailwind CSS"],
          },
          {
            title: "BCA Fixed Income",
            summary: "Frontend experience for fixed-income product workflows.",
            problem:
              "Information and transaction steps needed to be presented progressively so users had enough context to decide.",
            ownership:
              "Worked on the frontend of fixed-income workflows and aligned state across transaction stages.",
            delivery:
              "Translated product requirements into layouts and interactions consistent with the team design system.",
            outcome: "The fixed-income workflow became easier to understand and maintain.",
            technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          },
          {
            title: "Pegadaian Asuransi",
            summary: "Insurance claim submission and tracking.",
            problem:
              "Users needed clear visibility into claim submission and its current processing stage.",
            ownership:
              "Implemented claim submission and status tracking views for the insurance experience.",
            delivery:
              "Built forms, status presentation, and empty/error states so every step provided clear feedback.",
            outcome:
              "Users could understand the position of a claim without guessing the next step.",
            technologies: ["React", "TypeScript", "State management", "Data fetching"],
          },
          {
            title: "Bank Danamon Mutual Fund",
            summary: "Mutual fund subscription, redemption, and switching workflows.",
            problem:
              "Several mutual fund transaction types needed to feel like one cohesive experience.",
            ownership:
              "Built UI for subscription, redemption, and switching with attention to state and validation.",
            delivery:
              "Applied consistent component and data-flow patterns while accounting for each transaction type.",
            outcome:
              "A set of mutual fund workflows was presented with a more consistent interaction model.",
            technologies: ["React", "Next.js", "TypeScript", "shadcn/ui"],
          },
        ],
      },
    ],
    testimonials: approvedTestimonials,
  },
};
