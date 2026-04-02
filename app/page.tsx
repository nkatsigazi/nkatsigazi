"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { Syne, Cormorant_Garamond, JetBrains_Mono, Inter } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { projects as allProjects } from "@/lib/projects";
import NavBar from "@/components/NavBar";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const syne      = Syne({ subsets: ["latin"], weight: ["400","700","800"], variable: "--font-syne" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","500","600"], style: ["normal","italic"], variable: "--font-cormorant" });
const jetmono   = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500","700"], variable: "--font-mono" });
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const AMBER = "#D4A843";
const CORAL = "#E05A38";
const CREAM = "#F0E9DC";
const INK   = "#08090F";

/**
 * 5 featured projects — deliberately diverse in tech & category
 * to show the full range of skills.
 */
const FEATURED_SLUGS = [
  "meanrank",            // AI / Django — unique fullstack work
  "price-and-king",      // Fintech / Next.js — modern frontend
  "schoolnet",           // Scale: 10 000+ students
  "into-africa-gallery", // E-Commerce / WooCommerce depth
  "into-africa-safaris", // SEO + WordPress craft
];

const featuredProjects = FEATURED_SLUGS
  .map((slug) => allProjects.find((p) => p.slug === slug))
  .filter((p): p is (typeof allProjects)[0] => Boolean(p));

const expItems = [
  {
    num: "01", role: "Senior Web\nDeveloper", company: "Alphasoft Limited",
    location: "Kampala, Uganda", period: "2018 – 2023",
    points: [
      "Delivered 200+ WordPress websites including WooCommerce solutions",
      "Optimized performance, page speed, and hosting configurations",
      "Worked directly with clients on requirements, deployment, and maintenance",
    ],
  },
  {
    num: "02", role: "Senior WordPress\nDeveloper", company: "Sadja WebSolutions",
    location: "India / Uganda / DRC", period: "2023 – 2025",
    points: [
      "Built and maintained multilingual, multi-currency WordPress platforms",
      "Developed custom plugins and integrated third-party APIs",
      "Collaborated with distributed teams across multiple regions",
    ],
  },
  {
    num: "03", role: "Fullstack\nDeveloper", company: "Independent",
    location: "Global Remote", period: "2024 – Present",
    points: [
      "Built full-stack applications using Django and Next.js",
      "Developed automation tools and data scraping systems",
      "Delivered client projects across multiple industries and regions",
    ],
  },
];

const skills = [
  ["CMS & E-Commerce", "WordPress", "WooCommerce", "Plugin Dev."],
  ["Full-Stack",  "Python / Django",    "Next.js", "React",        "Node.js", "Javascript", "PHP"],
  ["Infrastructure",            "Core Web Vitals",    "Linux/Ubuntu", "Git",         "Technical SEO"],
];

export default function Home() {
  const component = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = component.current!;
    const q  = <T extends Element>(s: string) => root.querySelector<T>(s);
    const qa = <T extends Element>(s: string) => gsap.utils.toArray<T>(s, root);

    /* Hero */
    const heroName = q<HTMLElement>(".hero-name");
    if (heroName) {
      const split = new SplitText(heroName, { type: "chars" });
      gsap.set(split.chars, { transformOrigin: "0% 50% -80px" });
      gsap.from(split.chars, { rotateX: -90, opacity: 0, stagger: 0.022, duration: 1.3, ease: "power4.out", delay: 0.15 });
    }
    gsap.from(".hero-desc",  { y: 25, opacity: 0, duration: 0.8, ease: "expo.out", delay: 1.25 });
    gsap.set(".hero-cta",    { y: 20, opacity: 0 });
    gsap.to(".hero-cta",     { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out", delay: 1.0 });
    gsap.from(".hero-stat",  { y: 15, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power2.out", delay: 1.55 });
    gsap.from(".hero-badge", { scale: 0.8, opacity: 0, duration: 0.7, ease: "back.out(1.4)", delay: 0.3 });

    /* Parallax */
    gsap.to(".hero-bg-text",  { y: -250, ease: "none", scrollTrigger: { trigger: ".hero-curtain-wrapper", start: "top top", end: "bottom top", scrub: 2 } });
    gsap.to(".hero-portrait", { scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero-curtain-wrapper", start: "top top", end: "bottom top", scrub: 1.5 } });

    /* Hero → About curtain */
    gsap.timeline({ scrollTrigger: { trigger: ".hero-curtain-wrapper", start: "top top", end: "+=150%", pin: true, scrub: 1, anticipatePin: 1 } })
      .to(".hero-content", { y: -120, opacity: 0, scale: 0.94, ease: "power1.inOut" }, 0)
      .fromTo(".about-curtain-panel", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" }, 0);

    /* About */
    const aboutBody = q<HTMLElement>(".about-body");
    if (aboutBody) {
      const lines = new SplitText(aboutBody, { type: "lines" });
      gsap.from(lines.lines, { y: 55, opacity: 0, stagger: 0.07, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-curtain-panel", start: "top 45%", toggleActions: "play none none reverse" } });
    }
    gsap.from(".about-stat", { y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".about-stats", start: "top 80%", toggleActions: "play none none reverse" } });

    /* Horizontal projects */
    const hSection = q<HTMLElement>(".projects-h-section");
    const hTrack   = q<HTMLElement>(".projects-h-track");
    if (hSection && hTrack) {
      const amt = () => -(hTrack.scrollWidth - hSection.clientWidth);
      const hTween = gsap.to(hTrack, {
        x: amt, ease: "none",
        scrollTrigger: {
          id: "projects-h", trigger: hSection, pin: true, anticipatePin: 1, scrub: 0.9,
          start: "top top", end: () => `+=${Math.abs(amt())}`, invalidateOnRefresh: true,
          onUpdate: (s) => { const bar = root.querySelector<HTMLElement>("#h-progress"); if (bar) bar.style.transform = `scaleX(${s.progress})`; },
        },
      });
      qa<HTMLElement>(".h-project-card").forEach((card) => {
        gsap.from(card, { opacity: 0, y: 90, scale: 0.88, duration: 1, ease: "power3.out", scrollTrigger: { trigger: card, containerAnimation: hTween, start: "left 88%", toggleActions: "play none none reverse" } });
      });
    }

    /* Experience stack */
    const expWrappers = qa<HTMLElement>(".exp-wrapper");
    expWrappers.forEach((wrapper, i) => {
      const card = wrapper.querySelector<HTMLElement>(".exp-overlap-card")!;
      const next = expWrappers[i + 1];
      ScrollTrigger.create({ trigger: wrapper, start: "top top", end: "bottom top", pin: true, pinSpacing: false });
      gsap.from(card, { y: 80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: wrapper, start: "top 80%", toggleActions: "play none none reverse" } });
      if (next) {
        ScrollTrigger.create({ trigger: next, start: "top center", end: "top top", scrub: 0.4, onUpdate: (s) => gsap.to(card, { scale: 1 - s.progress * 0.14, opacity: 1 - s.progress * 0.6, duration: 0.1, overwrite: true }) });
      } else {
        ScrollTrigger.create({ trigger: wrapper, start: "top center", end: "bottom top", scrub: 0.4, onUpdate: (s) => gsap.to(card, { scale: 1 - s.progress * 0.14, opacity: 1 - s.progress, duration: 0.1, overwrite: true }) });
      }
    });

    /* Skills */
    qa<HTMLElement>(".skill-group").forEach((el, i) => {
      gsap.from(el, { x: -30, opacity: 0, duration: 0.7, delay: i * 0.1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });

    /* Stat counters */
    qa<HTMLElement>(".stat-number").forEach((counter) => {
      const target = parseInt(counter.dataset.target ?? "0");
      ScrollTrigger.create({
        trigger: counter, start: "top 85%", once: true,
        onEnter: () => {
          let n = 0; const inc = target / 55;
          const tick = () => { n += inc; if (n < target) { counter.innerText = String(Math.ceil(n)); requestAnimationFrame(tick); } else counter.innerText = String(target); };
          tick();
        },
      });
    });

    /* Section wipes */
    qa<HTMLElement>(".section-wipe").forEach((el) => {
      gsap.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } });
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    gsap.delayedCall(0.15, () => ScrollTrigger.refresh());
    return () => window.removeEventListener("resize", onResize);
  }, { scope: component });

  return (
    <div ref={component} className={`${syne.variable} ${cormorant.variable} ${jetmono.variable} overflow-x-hidden`} style={{ background: INK, color: "#E8E2D6" }}>

      {/* Grain */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "150px" }} />

      <NavBar />

      {/* ══ HERO + ABOUT CURTAIN ══ */}
      <div className="hero-curtain-wrapper relative" style={{ height: "100vh" }}>

        {/* Hero */}
        <section className="hero-section absolute inset-0 flex items-end pb-16 px-6 md:px-14 overflow-hidden" style={{ background: INK }}>
          {/* Portrait */}
          <div className="absolute right-0 top-0 w-[52vw] h-full pointer-events-none select-none">
            <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(90deg, ${INK} 0%, transparent 30%, transparent 75%, ${INK} 100%)` }} />
            <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(180deg, ${INK} 0%, transparent 20%, transparent 65%, ${INK} 100%)` }} />
            <div className="absolute inset-0 z-20 mix-blend-color" style={{ background: `radial-gradient(ellipse at 60% 40%, ${AMBER}60 0%, transparent 70%)` }} />
            <img src="/norman.webp" className="hero-portrait w-full h-full object-cover object-top" style={{ filter: "grayscale(0.25) contrast(1.1) brightness(0.85)", opacity: 0.9 }} alt="Norman Katsigazi" />
          </div>

          {/* Grid bg */}
          <div className="absolute inset-0 pointer-events-none z-[2]" style={{ backgroundImage: `linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px)`, backgroundSize: "90px 90px" }} />

          {/* Watermark */}
          <div className="hero-bg-text absolute left-0 bottom-[-12%] select-none pointer-events-none leading-none" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "22vw", WebkitTextStroke: "1px rgba(212,168,67,0.06)", color: "transparent", letterSpacing: "-0.04em" }}>
            ENGINEER
          </div>

          <div className="hero-content relative z-20 w-full max-w-4xl will-change-transform">
            <div className="hero-badge inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full" style={{ border: `1px solid rgba(212,168,67,0.25)`, background: "rgba(212,168,67,0.06)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ADE80" }} />
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(212,168,67,0.85)" }}>Open to remote roles and relocation (UAE & international)</span>
            </div>

            <h1 className="hero-name leading-[0.82] uppercase" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(2rem, 10vw, 7rem)", letterSpacing: "-0.04em" }}>
              Norman<br /><span style={{ color: AMBER }}>Katsigazi</span>
            </h1>

            <p className="hero-desc mt-5 max-w-3xl leading-relaxed" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "1.15rem", color: "rgba(232,226,214,0.6)" }}>
              Software Engineer & WordPress Specialist based in Kampala, Uganda with 5+ years experience delivering 200+ projects across e-commerce, corporate platforms, and custom systems.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-5">
              <Link href="/work" className="hero-cta flex items-center gap-3 px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:gap-5" style={{ fontFamily: "var(--font-mono)", background: AMBER, color: INK, fontWeight: 700 }}>View Work →</Link>
              <Link href="/about" className="hero-cta flex items-center gap-3 px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300" style={{ fontFamily: "var(--font-mono)", border: "1px solid rgba(232,226,214,0.2)", color: "rgba(232,226,214,0.7)" }}>See Bio</Link>
            </div>

            <div className="flex gap-10 mt-5 pt-8 max-w-3xl" style={{ borderTop: "1px solid rgba(212,168,67,0.15)" }}>
              {[["5+","Years Building"],["200+","Projects"],["20+","Fullstack Apps"],["3","Continents"]].map(([n,l]) => (
                <div key={l} className="hero-stat">
                  <div className="text-2xl font-bold leading-none" style={{ fontFamily: "Inter", color: AMBER }}>{n}</div>
                  <div className="text-[9px] mt-1 uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.35)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${AMBER}40, transparent)` }} />
        </section>

        {/* About curtain */}
        <section id="about" className="about-curtain-panel absolute inset-0 z-30 flex items-center px-6 md:px-14 py-24 overflow-hidden" style={{ clipPath: "inset(100% 0% 0% 0%)", background: CREAM }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(212,168,67,0.06) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: `linear-gradient(0deg, ${CREAM} 0%, transparent 100%)` }} />

          <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-[1fr_1.7fr] gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.35)" }}>001 — Bio</span>
              <h2 className="mt-4 leading-[0.85] uppercase" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(3rem, 7vw, 6rem)", color: INK, letterSpacing: "-0.03em" }}>
                Who<br /><span style={{ color: AMBER }}>I Am.</span>
              </h2>
              <div className="about-stats mt-12 grid grid-cols-2 gap-8 pt-10" style={{ borderTop: `1px solid rgba(8,9,15,0.12)` }}>
                {[
                  { target: 5,   label: "Years Exp",      suffix: "+" },
                  { target: 200, label: "WP Projects",    suffix: "+" },
                  { target: 15,  label: "Fullstack Apps", suffix: "+" },
                  { target: 3,   label: "Continents",     suffix: ""  },
                ].map(({ target, label, suffix }) => (
                  <div key={label} className="about-stat">
                    <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                      <span className="stat-number text-5xl leading-none" data-target={target} style={{ fontFamily: "Inter", fontWeight: 800, color: INK }}>0</span>
                      {suffix && <span className="text-3xl" style={{ fontFamily: "Inter", fontWeight: 800, color: AMBER }}>{suffix}</span>}
                    </div>
                    <p className="text-[10px] mt-1 uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.4)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="about-body leading-relaxed" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "rgba(8,9,15,0.82)" }}>
                I'm <strong style={{ color: INK, fontWeight: 600 }}>Norman Katsigazi</strong>, a software engineer focused on building scalable, maintainable web systems. My core strength is WordPress architecture, extended with modern full-stack development using Django, Next.js, and API-driven systems.
                <br /><br />
                I've delivered 200+ projects ranging from high-traffic WooCommerce platforms to custom backend systems and data-driven applications.
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                {["WordPress/WooCommerce","Django/Python","React","Next.js"].map((s) => (
                  <span key={s} className="px-4 py-2 rounded-full text-[11px]" style={{ fontFamily: "var(--font-mono)", background: "rgba(8,9,15,0.07)", border: "1px solid rgba(8,9,15,0.15)", color: "rgba(8,9,15,0.65)" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══ FEATURED PROJECTS — horizontal scroll ══ */}
      <section id="work" className="projects-h-section relative w-full overflow-hidden" style={{ height: "100vh", background: INK }}>

        {/* Section heading — pinned above the scrolling track */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none px-6 md:px-14 pt-15 pb-8">
          <span className="block text-[10px] uppercase tracking-[0.3em] mb-4" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}80` }}>002 — Selected Work</span>
          <div className="flex items-end justify-between gap-10">
            <h2 className="leading-[0.85] uppercase" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(2.8rem, 6vw, 5.5rem)", letterSpacing: "-0.04em", color: "#E8E2D6" }}>
              Featured <span style={{ color: AMBER }}>Projects</span>
            </h2>
            {/* Progress / count — desktop only */}
            <div className="hidden md:flex flex-col items-end gap-2 pb-1">
              <p className="text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.2)" }}>Scroll right →</p>
              <div className="flex items-center gap-3">
                <div className="w-28 h-[1px] relative" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div id="h-progress" style={{ position: "absolute", inset: 0, transform: "scaleX(0)", transformOrigin: "left", background: `linear-gradient(90deg, ${AMBER}, ${CORAL})` }} />
                </div>
                <span className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}55` }}>{featuredProjects.length} / {allProjects.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling track — pushed below heading */}
        <div
          className="projects-h-track flex items-end gap-5 h-full will-change-transform"
          style={{
            paddingLeft: "clamp(1.5rem, 3.5vw, 3.5rem)",
            paddingRight: "5rem",
            paddingTop: "clamp(210px, 30vh, 270px)",
            paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)",
          }}
        >
          {featuredProjects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="h-project-card flex-shrink-0 relative rounded-2xl overflow-hidden group will-change-transform"
              style={{ width: "clamp(260px, 54vw, 700px)", height: "100%", border: "1px solid rgba(255,255,255,0.06)", display: "block" }}
            >
              <img src={p.heroImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" style={{ opacity: 0.8, filter: "saturate(1.1) contrast(1.05)" }} alt={p.title} loading={i === 0 ? "eager" : "lazy"} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,15,0.97) 0%, rgba(8,9,15,0.35) 50%, transparent 75%)" }} />
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

              {/* Top labels */}
              <div className="absolute top-8 left-8 right-8 flex items-start justify-between">
                <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", background: `${p.color}18`, border: `1px solid ${p.color}40`, color: p.color }}>{p.cat}</span>
                <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.25)" }}>{p.year}</span>
              </div>

              {/* Large watermark index */}
              <div className="absolute top-4 right-6 select-none pointer-events-none" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(5rem, 10vw, 9rem)", lineHeight: 1, color: `${p.color}08` }}>{p.idx}</div>

              {/* Bottom content */}
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <h3 className="leading-none uppercase" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(1.5rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", color: "#F0EAE0" }}>{p.title}</h3>

                <div className="flex gap-2 mt-5 flex-wrap">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-[9px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(232,226,214,0.55)" }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backdropFilter: "blur(4px)", background: "rgba(8,9,15,0.28)" }}>
                <span className="px-8 py-3 rounded-full text-[10px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", background: `${p.color}20`, border: `1px solid ${p.color}55`, color: p.color }}>View Case Study ↗</span>
              </div>
            </Link>
          ))}

          {/* End card — all projects CTA */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center gap-5" style={{ width: "clamp(200px, 22vw, 300px)", height: "100%" }}>
            <p className="text-[10px] uppercase tracking-[0.25em] text-center mb-1" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.22)" }}>
              {allProjects.length} total projects
            </p>
            <Link href="/work" className="px-8 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, background: AMBER, color: INK, boxShadow: `0 20px 60px rgba(212,168,67,0.25)` }}>
              View All →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section id="experience" className="py-24 px-6 md:px-14" style={{ background: "#0B0C14", borderTop: "1px solid rgba(212,168,67,0.1)" }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}70` }}>003 — Experience</span>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2 className="leading-[0.85] uppercase" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(2.8rem, 6vw, 5.5rem)", letterSpacing: "-0.03em" }}>
              Professional<br /><span style={{ color: AMBER }}>Journey</span>
            </h2>
            <p className="mb-2 text-[10px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.2)" }}>Scroll to stack</p>
          </div>

          <div className="relative mt-20">
            {expItems.map((item, idx) => (
              <div key={idx} className="exp-wrapper relative" style={{ height: "85vh", paddingTop: "14vh", marginBottom: "1.5rem" }}>
                <div className="exp-overlap-card relative w-full rounded-2xl will-change-transform overflow-hidden" style={{ height: "calc(100% - 2rem)", background: "#0E1019", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 40px 100px rgba(0,0,0,0.8)" }}>
                  <div className="absolute top-0 left-0 right-0" style={{ height: "2px", background: `linear-gradient(90deg, ${AMBER}CC, transparent 55%)` }} />
                  <div className="absolute top-0 left-0 w-96 h-64 pointer-events-none" style={{ background: `radial-gradient(ellipse at 0% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)` }} />
                  <div className="relative z-10 h-full grid md:grid-cols-[1fr_2fr]">
                    <div className="flex flex-col justify-between p-8 md:p-10" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                      <div>
                        <span className="block text-[5rem] md:text-[7rem] leading-none" style={{ fontFamily: "Inter", fontWeight: 800, color: AMBER, opacity: 0.9, letterSpacing: "-0.04em" }}>{item.num}</span>
                        <div className="mt-1 w-8 h-[2px]" style={{ background: `${AMBER}50` }} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] mb-1" style={{ fontFamily: "var(--font-mono)", color: AMBER, opacity: 0.7 }}>{item.company}</p>
                        <p className="text-[9px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.25)" }}>{item.location}</p>
                        <div className="inline-block mt-5 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.15em]" style={{ fontFamily: "var(--font-mono)", background: "rgba(212,168,67,0.08)", border: `1px solid rgba(212,168,67,0.2)`, color: `${AMBER}CC` }}>{item.period}</div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-12">
                      <h3 className="leading-[0.9] mb-8" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(2.2rem, 4.5vw, 4rem)", color: "#F0EAE0", letterSpacing: "-0.01em", whiteSpace: "pre-line" }}>{item.role}</h3>
                      <div className="mb-8 h-px" style={{ background: "linear-gradient(90deg, rgba(212,168,67,0.25), transparent)" }} />
                      <ul className="space-y-4">
                        {item.points.map((pt, pi) => (
                          <li key={pi} className="flex items-start gap-4 leading-relaxed" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "1.15rem", color: "rgba(232,226,214,0.7)" }}>
                            <span className="mt-[10px] flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: AMBER, boxShadow: `0 0 8px ${AMBER}60` }} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <div className="absolute bottom-4 right-8 select-none pointer-events-none" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(5rem, 12vw, 10rem)", color: "rgba(212,168,67,0.03)", lineHeight: 1 }}>{item.num}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills-section" className="section-wipe py-32 px-6 md:px-14" style={{ background: CREAM, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.35)" }}>004 — Skills & Education</span>
          <div className="mt-8 grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="leading-[0.85] uppercase mb-12" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: INK, letterSpacing: "-0.03em" }}>Core<br /><span style={{ color: AMBER }}>Stack</span></h2>
              <div className="space-y-8">
                {skills.map(([group, ...items], gi) => (
                  <div key={gi} className="skill-group pt-6" style={{ borderTop: "1px solid rgba(8,9,15,0.1)" }}>
                    <p className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}BB` }}>{group}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span key={skill} className="px-4 py-1.5 rounded-full text-sm transition-all duration-300 hover:scale-105 cursor-default"
                          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500, fontSize: "1.05rem", background: "rgba(8,9,15,0.07)", border: "1px solid rgba(8,9,15,0.12)", color: "rgba(8,9,15,0.7)" }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(212,168,67,0.12)"; el.style.borderColor = "rgba(212,168,67,0.4)"; el.style.color = INK; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(8,9,15,0.07)"; el.style.borderColor = "rgba(8,9,15,0.12)"; el.style.color = "rgba(8,9,15,0.7)"; }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="leading-[0.85] uppercase mb-12" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: INK, letterSpacing: "-0.03em" }}>Education<br /><span style={{ color: AMBER }}>& Work</span></h2>
              <div className="p-8 rounded-xl mb-12" style={{ background: "rgba(8,9,15,0.05)", border: "1px solid rgba(8,9,15,0.1)" }}>
                <p className="text-[9px] uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}AA` }}>BSc Degree</p>
                <h3 className="text-2xl mb-1" style={{ fontFamily: "Inter", fontWeight: 700, color: INK }}>Computer Science</h3>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(8,9,15,0.5)" }}>Cavendish University Uganda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="section-wipe relative py-48 px-6 md:px-14 overflow-hidden" style={{ background: INK, borderTop: "1px solid rgba(212,168,67,0.1)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 60%, rgba(212,168,67,0.07) 0%, transparent 70%)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(212,168,67,0.04) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <span className="block text-[10px] uppercase tracking-[0.4em] mb-6" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}60` }}>Get in touch</span>
          <h2 className="leading-[0.82] uppercase" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(4rem, 14vw, 13rem)", letterSpacing: "-0.04em", color: "#F0EAE0" }}>
            Let's<br /><span style={{ color: AMBER }}>Build.</span>
          </h2>
          <p className="mt-8 mb-12 text-xl max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, color: "rgba(232,226,214,0.45)" }}>Have a project in mind? I'd love to hear about it.</p>
          <a href="mailto:nkatsigazi@gmail.com" className="inline-flex items-center gap-4 px-12 py-5 rounded-full text-[11px] uppercase tracking-[0.25em] transition-all duration-500 hover:gap-8 hover:scale-105" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, background: AMBER, color: INK, boxShadow: `0 30px 80px rgba(212,168,67,0.2)` }}>
            nkatsigazi@gmail.com →
          </a>
          <p className="mt-14 text-[9px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.18)" }}>Kampala, Uganda · Dubai, UAE · Remote Worldwide</p>
        </div>
      </section>

      <footer className="py-8 px-6 md:px-14 flex flex-col md:flex-row justify-between items-center gap-4" style={{ background: "#06070C", borderTop: "1px solid rgba(255,255,255,0.04)", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(232,226,214,0.15)" }}>
        <span>© 2025 Norman Katsigazi</span>
        <span>Built with GSAP & Next.js · 200+ WordPress Projects</span>
        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}