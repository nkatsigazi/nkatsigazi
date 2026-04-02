export interface Project {
  slug: string;
  idx: string;
  title: string;
  cat: string;
  year: string;
  client: string;
  role: string;
  duration: string;
  url?: string;
  tags: string[];
  stack: string[];
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  features: string[];
  stats: { value: number; label: string }[];
  heroImg: string;
  galleryImgs: string[];
  color: string;
}

export const projects: Project[] = [
  {
    slug: "meanrank",
    idx: "01",
    title: "MeanRank",
    cat: "Data Platform / Django",
    year: "2025",
    client: "Personal Project",
    role: "Full-Stack Developer",
    duration: "Ongoing",
    url: "",
    tags: ["Django", "PostgreSQL", "Web Scraping"],
    stack: ["Python", "Django", "PostgreSQL", "REST APIs"],
    summary:
      "MeanRank is a movie aggregation platform that collects ratings from multiple sources and presents them in a clean, unified system. It focuses on simplifying discovery by giving users a single, consistent view of how movies are rated across platforms.",
    challenge:
      "Different platforms present ratings in inconsistent formats, making it difficult to combine them into a reliable dataset while maintaining performance and data accuracy.",
    solution:
      "Built a data collection pipeline to gather and normalize ratings from multiple sources, then structured the data using Django and PostgreSQL for efficient querying and updates.",
    outcome:
      "The platform successfully aggregates thousands of movies into a consistent format, providing a scalable base for future recommendation features and improved discovery.",
    features: [
      "Multi-source rating aggregation",
      "Automated data cleaning and standardization",
      "Structured and queryable dataset",
      "Scalable backend architecture",
    ],
    stats: [
      { value: 5000, label: "Movies indexed" },
      { value: 20, label: "Sources scraped" },
      { value: 10, label: "Seconds to update" },
      { value: 300, label: "P95 page load ms" },
    ],
    heroImg: "/mr-1.webp",
    galleryImgs: ["/mr-1.webp", "/mr-2.webp", "/mr-3.webp", "/mr-4.webp", "/mr-5.webp"],
    color: "#dfbd57",
  },
  {
    slug: "price-and-king",
    idx: "02",
    title: "Price & King",
    cat: "Fintech / Web App",
    year: "2024",
    client: "Price & King",
    role: "Frontend Developer",
    duration: "4 months",
    url: "https://priceandking.vercel.app",
    tags: ["Next.js", "React", "TypeScript"],
    stack: ["Next.js", "React", "TypeScript", "API Integration"],
    summary:
      "Price & King is a financial web application designed to provide users with dashboards for tracking financial data and managing workflows. The focus was on delivering a clean and responsive user experience for real-world accounting and finance tasks.",
    challenge:
      "Building a responsive and intuitive interface that could display complex financial data while remaining fast and maintainable for future feature expansion.",
    solution:
      "Developed a modular frontend using Next.js and TypeScript, focusing on reusable components, efficient data handling, and a clean UI structure.",
    outcome:
      "Delivered a scalable dashboard that allows users to interact with financial data efficiently, improving overall usability and readiness for future enhancements.",
    features: [
      "Responsive dashboard interface",
      "Reusable component architecture",
      "API-driven data visualization",
      "Clean and maintainable code structure",
    ],
    stats: [
      { value: 500, label: "Active users" },
      { value: 300, label: "Live tickers" },
      { value: 100, label: "Pages rendered" },
      { value: 99, label: "Percent uptime" },
    ],
    heroImg: "/pk-1.webp",
    galleryImgs: ["/pk-8.webp", "/pk-1.webp", "/pk-2.webp", "/pk-3.webp", "/pk-4.webp", "/pk-5.webp", "/pk-6.webp", "/pk-7.webp"],
    color: "#f01313",
  },
  {
    slug: "schoolnet",
    idx: "04",
    title: "SchoolNet East Africa",
    cat: "Education Platform",
    year: "2024",
    client: "SchoolNet",
    role: "WordPress Developer",
    duration: "4 months",
    url: "https://schoolnet.africa/ug/",
    tags: ["WordPress", "Custom Development"],
    stack: ["WordPress", "PHP", "Custom Forms", "WooCommerce"],
    summary:
      "SchoolNet East Africa is an education platform listing schools across regions. It includes modules for student enrollment, course management, events, and school-specific e-commerce features.",
    challenge:
      "Developing a flexible platform that supports different schools’ needs while avoiding heavy reliance on third-party plugins and maintaining high performance.",
    solution:
      "Created a WordPress multisite network with a custom plugin to manage users and roles. Developed bespoke forms, workflows, and reporting tools to fit each school’s requirements.",
    outcome:
      "The platform now unifies multiple schools under one system, reduces administrative work, and improves the overall experience for students, staff, and parents.",
    features: [
      "Multisite network connecting multiple campuses",
      "Custom forms and workflows for school operations",
      "Event management and school product shop",
    ],
    stats: [
      { value: 10000, label: "Students served" },
      { value: 3000, label: "Schools listed" },
      { value: 60, label: "Admin time saved %" },
      { value: 99, label: "Platform uptime %" },
    ],
    heroImg: "/sn-1.webp",
    galleryImgs: ["/sn-1.webp", "/sn-2.webp", "/sn-3.webp", "/sn-4.webp", "/sn-5.webp", "/sn-6.webp"],
    color: "#3cc6f0",
  },
  {
    slug: "into-africa-gallery",
    idx: "03",
    title: "Into Africa Gallery",
    cat: "E-Commerce",
    year: "2025",
    client: "Into Africa Gallery",
    role: "WordPress Developer",
    duration: "3 months",
    url: "https://intoafricagallery.com",
    tags: ["WooCommerce", "Polylang", "SEO"],
    stack: ["WordPress", "WooCommerce", "PHP", "Polylang"],
    summary:
      "Into Africa Gallery is a full-featured e-commerce platform selling African art, crafts, and safari experiences. The platform supports multiple languages, currencies, and shipping zones to serve international buyers effectively.",
    challenge:
      "Delivering a seamless shopping experience for users from different countries, each requiring correct currency, language, and tax handling, without compromising performance.",
    solution:
      "Built a custom WordPress theme with WooCommerce and Polylang for translations, implemented real-time currency conversion via APIs, and optimized SEO and caching to maintain fast performance.",
    outcome:
      "The platform now effectively supports global users, increases international sales, and maintains excellent performance across all pages.",
    features: [
      "Multi-language and multi-currency support",
      "Custom shipping and tax logic",
      "Integrated booking for safari experiences",
      "Custom Gutenberg blocks for flexible content",
    ],
    stats: [
      { value: 2000, label: "Products" },
      { value: 6, label: "Languages" },
      { value: 2, label: "Revenue growth" },
      { value: 90, label: "Core Web Vitals" },
    ],
    heroImg: "/ig-3.webp",
    galleryImgs: ["/ig-1.webp", "/ig-2.webp", "/ig-4.webp"],
    color: "#c8860b",
  },
  {
    slug: "srepubliq",
    idx: "05",
    title: "S-Republiq",
    cat: "E-Commerce",
    year: "2023",
    client: "S-Republiq",
    role: "WordPress Developer",
    duration: "2 months",
    url: "https://srepubliq.com",
    tags: ["WooCommerce", "Custom Logic"],
    stack: ["WordPress", "WooCommerce", "PHP"],
    summary:
      "S-Republiq is an e-commerce platform with a unique delivery workflow, connecting customer orders directly with riders to streamline local delivery processes.",
    challenge:
      "Standard WooCommerce workflows could not support the custom delivery process required by the business.",
    solution:
      "Extended WooCommerce with custom order handling and routing logic that links orders to available riders while keeping the process simple for the user.",
    outcome:
      "The platform now provides reliable and fast delivery coordination, improving customer satisfaction and operational efficiency.",
    features: [
      "Custom order delivery routing",
      "Multi-currency support",
      "Language translation support",
      "Optimized checkout flow",
    ],
    stats: [
      { value: 1000, label: "Orders processed" },
      { value: 3, label: "Delivery zones" },
      { value: 99, label: "Success rate %" },
      { value: 6, label: "Supported currencies" },
    ],
    heroImg: "/sr-3.webp",
    galleryImgs: ["/sr-1.webp", "/sr-2.webp", "/sr-3.webp", "/sr-4.webp", "/sr-5.webp"],
    color: "#0bedf5",
  },
  {
    slug: "medical-world",
    idx: "06",
    title: "Medical World Uganda",
    cat: "Health System",
    year: "2023",
    client: "Medical World Uganda",
    role: "WordPress Developer",
    duration: "2 months",
    url: "https://medicalworld.ug",
    tags: ["WordPress", "Custom Logic"],
    stack: ["WordPress", "PHP", "Custom Workflows"],
    summary:
      "Medical World Uganda is a hospital website providing vaccination verification and certificate generation features for patients and institutions.",
    challenge:
      "Creating a beautiful website with a system that could securely verify vaccination records while keeping the interface simple and user-friendly.",
    solution:
      "Developed a custom workflow inside WordPress that allows users to input verification details and receive certificates instantly. Designed for reliability and accessibility.",
    outcome:
      "The system now ensures fast, secure, and accurate verification for users, while reducing administrative burden.",
    features: [
      "Vaccination verification system",
      "Certificate generation",
      "User-friendly workflows",
      "Audit trail for validation",
    ],
    stats: [
      { value: 5000, label: "Records verified" },
      { value: 100, label: "Certificates generated per day" },
      { value: 99, label: "System uptime %" },
      { value: 1, label: "Avg response sec" },
    ],
    heroImg: "/mw-1.webp",
    galleryImgs: ["/mw-1.webp", "/mw-2.webp", "/mw-3.webp", "/mw-4.webp", "/mw-5.webp", "/mw-6.webp", "/mw-7.webp"],
    color: "#0c9eec",
  },
  {
    slug: "into-africa-safaris",
    idx: "07",
    title: "Into Africa Safaris",
    cat: "Travel Platform",
    year: "2023",
    client: "Into Africa Safaris",
    role: "WordPress Developer",
    duration: "3 months",
    url: "https://intoafricasafaris.net/",
    tags: ["WordPress", "Elementor", "SEO"],
    stack: ["WordPress", "Elementor", "Custom Widgets", "SEO"],
    summary:
      "Into Africa Safaris is a travel platform designed to showcase safari packages clearly and engagingly. The focus was on delivering a clean, modern layout while making complex travel options easy to browse and book for international users.",
    challenge:
      "The previous site had a cluttered presentation of safari packages, making it difficult for users to compare options and understand pricing and details quickly.",
    solution:
      "Redesigned the platform using custom Elementor widgets and structured layouts, improving navigation and readability. Implemented SEO improvements to boost visibility and optimized site performance across devices.",
    outcome:
      "The website now delivers a professional browsing experience, with improved engagement metrics, better clarity of travel options, and higher organic search rankings.",
    features: [
      "Structured safari listings with detailed information",
      "Custom Elementor components for flexible layouts",
      "Enhanced navigation and UX",
      "SEO improvements for better visibility"
    ],
    stats: [
      { value: 5, label: "Traffic growth ×" },
      { value: 25, label: "Pages optimized" },
      { value: 10, label: "Bookings per month" },
      { value: 85, label: "Performance score" },
    ],
    heroImg: "/is-1.webp",
    galleryImgs: ["/is-1.webp", "/is-2.webp", "/is-3.webp", "/is-4.webp", "/is-6.webp", "/is-5.webp"],
    color: "#ecb912",
  },

{
    slug: "millennium-infosys",
    idx: "08",
    title: "Millennium Infosys",
    cat: "E-Commerce",
    year: "2021",
    client: "Millennium Infosys",
    role: "WordPress Developer",
    duration: "3 months",
    url: "https://millenniuminfosys.com/",
    tags: ["WooCommerce", "Payments", "Bookings"],
    stack: ["WordPress", "WooCommerce", "Custom Payments", "Custom Booking Logic"],
    summary:
      "Millennium Infosys is an e-commerce platform that combines product sales with service bookings. The goal was to create a seamless, integrated experience for customers to purchase and schedule services on the same platform.",
    challenge:
      "Integrating multiple payment gateways with booking workflows without disrupting the user experience or site performance was challenging, as standard WooCommerce setups could not fully support the required workflows.",
    solution:
      "Built custom payment and booking workflows within WooCommerce. Optimized the frontend for usability and speed while implementing SEO improvements to attract and retain customers.",
    outcome:
      "Customers now enjoy smooth transactions and easy service bookings, while the platform runs efficiently with a reliable backend supporting multiple processes simultaneously.",
    features: [
      "Custom payment workflow integration",
      "Booking system for products and services",
      "SEO and performance optimizations",
      "User-friendly interface"
    ],
    stats: [
      { value: 100, label: "Monthly transactions" },
      { value: 300, label: "Bookings processed" },
      { value: 99, label: "System uptime %" },
      { value: 150, label: "Products/services managed" },
    ],
    heroImg: "/mi-3.webp",
    galleryImgs: ["/mi-1.webp", "/mi-2.webp", "/mi-3.webp", "/mi-4.webp", "/mi-5.webp"],
    color: "#d71212",
  },

{
    slug: "sti-uganda",
    idx: "09",
    title: "STI Uganda",
    cat: "Corporate Platform",
    year: "2023",
    client: "STI Uganda",
    role: "WordPress Developer",
    duration: "2 months",
    url: "https://sti.go.ug/",
    tags: ["WordPress", "Elementor", "Custom Design"],
    stack: ["WordPress", "Elementor", "Custom CSS", "Responsive Design"],
    summary:
      "STI Uganda is a corporate website designed to reflect a detailed and structured visual system. The focus was on implementing a pixel-accurate design across all devices while maintaining a clean, modern interface.",
    challenge:
      "Translating a complex, multi-section design into a responsive and functional website while preserving visual fidelity and ensuring smooth navigation across desktop and mobile devices.",
    solution:
      "Used Elementor with custom CSS adjustments to achieve precise layout implementation. Optimized all components for responsiveness and readability, ensuring consistent branding and high-quality user experience.",
    outcome:
      "The final website maintains complete design accuracy, delivers a professional and modern corporate presence, and provides a responsive experience for all users.",
    features: [
      "Pixel-perfect layout implementation",
      "Fully responsive design across devices",
      "Custom section layouts tailored to brand identity",
      "Optimized navigation and performance"
    ],
    stats: [
      { value: 100, label: "Design sections implemented" },
      { value: 4, label: "Devices tested" },
      { value: 95, label: "Performance score" },
      { value: 500, label: "Pages rendered" },
    ],
    heroImg: "/sti-2.webp",
    galleryImgs: ["/sti-1.webp", "/sti-2.webp", "/sti-3.webp", "/sti-4.webp", "/sti-5.webp"],
    color: "#0ee9e5",
  },

{
    slug: "accuchem",
    idx: "10",
    title: "Accuchem Innovate",
    cat: "Corporate Website",
    year: "2023",
    client: "Accuchem Innovate",
    role: "WordPress Developer",
    duration: "1 month",
    url: "https://accucheminnovate.com/",
    tags: ["WordPress", "Performance", "UI/UX"],
    stack: ["WordPress", "Custom Theme", "Performance Optimization", "UI/UX"],
    summary:
      "Accuchem Innovate is a corporate website redesigned to improve performance, modernize the user interface, and enhance overall user experience while preserving the original content and branding.",
    challenge:
      "The website suffered from slow loading times and an outdated layout, which negatively impacted user experience and engagement metrics.",
    solution:
      "Optimized assets, restructured content flow, and applied best practices for performance and UI/UX design. Implemented responsive and clean layouts for a more contemporary and efficient interface.",
    outcome:
      "The redesigned website now loads significantly faster, offers a modern, user-friendly interface, and improves overall engagement with content across devices.",
    features: [
      "Performance-focused redesign",
      "Modern UI updates",
      "Optimized asset management and layout structure",
      "Responsive and clean user interface"
    ],
    stats: [
      { value: 85, label: "Performance score" },
      { value: 50, label: "Pages optimized" },
      { value: 95, label: "Mobile usability %" },
      { value: 10, label: "Seconds to full load (avg)" },
    ],
    heroImg: "/accuchem-5.webp",
    galleryImgs: ["/accuchem-2.webp", "/accuchem-3.webp", "/accuchem-4.webp", "/accuchem-5.webp", "/accuchem-6.webp", "/accuchem-7.webp", "/accuchem-8.webp"],
    color: "#5ac0fb",
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}