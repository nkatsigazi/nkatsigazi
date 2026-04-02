// ── about/page.tsx ──────────────────────────────────────────────────────────
"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { Syne, Cormorant_Garamond, JetBrains_Mono, Inter } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
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
const CREAM = "#F0E9DC";
const INK   = "#08090F";

const timeline = [
  { year: "2018",  title: "Started in web development",    body: "Joined Alphasoft Limited as a WordPress developer. Delivered my first production site in the first month. Never looked back." },
  { year: "2020",  title: "Advanced WooCommerce systems",   body: "Built and managed large-scale e-commerce platforms with thousands of products and complex workflows." },
  { year: "2021",  title: "Transition to full-stack",       body: "Expanded into Django backends and Next.js frontends, combining modern frameworks with CMS expertise." },
  { year: "2023",  title: "Independent & AI systems",       body: "Built MeanRank, a data-driven aggregation platform, and began working independently with international clients." },
  { year: "2025 →",title: "Next Phase",                     body: "Focused on scalable data platforms, performance-driven systems, and enterprise-level web architecture." },
];

const values = [
  { n: "01", title: "Ship, don't theorise",     body: "I bias toward working code over perfect architecture. You can't iterate on a whiteboard. The best design decisions emerge from real constraints." },
  { n: "02", title: "Performance is a feature", body: "Speed, responsiveness, and SEO are core product requirements — not optional improvements." },
  { n: "03", title: "Client clarity first",     body: "I translate technical complexity into plain language. My clients understand what they're getting, why it costs what it costs, and how to use it." },
  { n: "04", title: "Context over frameworks",  body: "I choose technologies based on the problem — not trends. The goal is always efficiency and reliability." },
];

export default function AboutPage() {
  const component = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heading = document.querySelector<HTMLElement>(".about-heading");
    if (heading) {
      const split = new SplitText(heading, { type: "chars" });
      gsap.from(split.chars, { y: 110, opacity: 0, rotateX: -75, stagger: 0.022, duration: 1.25, ease: "power4.out", delay: 0.2 });
    }
    gsap.from(".about-hero-text",  { y: 30, opacity: 0, duration: 0.9, ease: "expo.out", delay: 1.05 });
    gsap.from(".about-hero-badge", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.4)", delay: 0.3 });
    gsap.from(".about-hero-stats .stat-col", { y: 25, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power2.out", delay: 1.2 });

    gsap.to(".portrait-img", { y: -60, ease: "none", scrollTrigger: { trigger: ".about-hero-section", start: "top top", end: "bottom top", scrub: 1.5 } });

    document.querySelectorAll<HTMLElement>(".tl-item").forEach((el, i) => {
      gsap.from(el, { y: 40, opacity: 0, duration: 0.7, delay: i * 0.07, ease: "power2.out", scrollTrigger: { trigger: ".timeline-section", start: "top 80%" } });
    });
    document.querySelectorAll<HTMLElement>(".value-card").forEach((el, i) => {
      gsap.from(el, { y: 50, opacity: 0, duration: 0.8, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: ".values-section", start: "top 80%" } });
    });
    document.querySelectorAll<HTMLElement>(".reveal-block").forEach((el) => {
      gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 84%" } });
    });

    gsap.delayedCall(0.15, () => ScrollTrigger.refresh());
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, { scope: component });

  return (
    <div ref={component} className={`${syne.variable} ${cormorant.variable} ${jetmono.variable}`} style={{ background: INK, color: "#E8E2D6" }}>

      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "150px" }} />

      <NavBar />

      {/* Hero */}
      <section className="about-hero-section relative min-h-screen flex items-end pb-20 px-6 md:px-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px)`, backgroundSize: "90px 90px" }} />
        <div className="absolute right-0 top-0 w-[48vw] h-full pointer-events-none overflow-hidden">
          <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(90deg, ${INK} 0%, transparent 35%)` }} />
          <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(0deg, ${INK} 0%, transparent 25%)` }} />
          <div className="absolute inset-0 z-20 mix-blend-color" style={{ background: `radial-gradient(ellipse at 60% 35%, ${AMBER}50 0%, transparent 65%)` }} />
          <img src="/norman.webp" className="portrait-img absolute top-0 left-0 w-full h-[115%] object-cover object-top will-change-transform" style={{ filter: "grayscale(0.2) contrast(1.1)", opacity: 0.88 }} alt="Norman Katsigazi" />
        </div>

        <div className="relative z-20 max-w-4xl">
          <div className="about-hero-badge inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full" style={{ border: `1px solid rgba(212,168,67,0.22)`, background: "rgba(212,168,67,0.05)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ADE80" }} />
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}85` }}>Open to remote roles and relocation (UAE & international)</span>
          </div>
          <h1 className="about-heading leading-[0.82] uppercase" style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(2rem, 10vw, 7rem)", letterSpacing: "-0.04em" }}>
            Norman<br /><span style={{ color: AMBER }}>Katsigazi</span>
          </h1>
          <p className="about-hero-text mt-6" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.2rem, 1.8vw, 2rem)", color: "rgba(232,226,214,0.55)", lineHeight: 1.5 }}>
            Software Engineer & WordPress Specialist based in Kampala, Uganda —<br />
            building scalable web systems for clients across Africa, the Middle East, and Europe.
          </p>
          <div className="about-hero-stats flex flex-wrap gap-10 md:gap-12 mt-12 pt-10" style={{ borderTop: `1px solid rgba(212,168,67,0.15)` }}>
            {[["5+","Years building"],["200+","Projects"],["20+","Fullstack apps"],["3","Continents"]].map(([n,l]) => (
              <div key={l} className="stat-col">
                <div className="text-2xl leading-none mb-1" style={{ fontFamily: "'Inter'", fontWeight: 800, color: AMBER }}>{n}</div>
                <div className="text-[9px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.3)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${AMBER}30, transparent)` }} />
      </section>

      {/* Full Bio */}
      <section className="py-28 px-6 md:px-14" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.8fr] gap-20 items-start">
          <div className="reveal-block">
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.3)" }}>001 — Who I Am</span>
            <h2 className="mt-4 leading-[0.85] uppercase" style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: INK, letterSpacing: "-0.03em" }}>
              The Full<br /><span style={{ color: AMBER }}>Story.</span>
            </h2>
            <div className="mt-10 space-y-3">
              {[["Location","Kampala, Uganda · Open to UAE"],["Timezone","EAT (UTC+3)"],["Availability","Open to full-time and contract roles"],["Languages","English"]].map(([k, v]) => (
                <div key={k} className="flex items-start gap-3">
                  <span className="text-[9px] uppercase tracking-widest w-24 shrink-0 pt-0.5" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}80` }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "rgba(8,9,15,0.6)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-block space-y-8">
            {[
              "I started as a WordPress developer because I needed to ship real things for real people, fast. Five years later that instinct still drives me but the stack has grown considerably.",
              "I work at the intersection of product thinking and engineering execution. My WordPress foundation gives me a strong understanding of content systems, e-commerce workflows, and real-world client needs — something many purely framework-trained developers lack.",
              "Today, I focus on building scalable, high-performance platforms that balance clean architecture with practical delivery. Outside of development, I mentor junior developers in Kampala and continuously refine my approach through real-world projects.",
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "clamp(1.15rem, 2vw, 1.55rem)", color: "rgba(8,9,15,0.75)", lineHeight: 1.75 }}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section py-28 px-6 md:px-14" style={{ background: INK, borderTop: `1px solid rgba(212,168,67,0.1)` }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}60` }}>002 — Timeline</span>
          <h2 className="mt-3 mb-16 leading-[0.85] uppercase" style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
            Career<br /><span style={{ color: AMBER }}>Milestones</span>
          </h2>
          <div className="relative">
            <div className="absolute left-[4.5rem] top-0 bottom-0 w-px hidden md:block" style={{ background: `linear-gradient(180deg, ${AMBER}40, transparent)` }} />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="tl-item grid md:grid-cols-[9rem_1fr] gap-8 items-start py-10" style={{ borderBottom: i < timeline.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="flex items-center gap-4">
                    <span style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "1.1rem", color: AMBER }}>{item.year}</span>
                    <div className="hidden md:flex w-3 h-3 rounded-full border-2 flex-shrink-0 ml-auto" style={{ borderColor: AMBER, background: INK }} />
                  </div>
                  <div className="md:pl-6">
                    <h3 className="mb-2 leading-none" style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: "1.4rem", color: "#E8E2D6" }}>{item.title}</h3>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "1.15rem", color: "rgba(232,226,214,0.5)", lineHeight: 1.7 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section py-28 px-6 md:px-14" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.3)" }}>003 — Principles</span>
          <h2 className="mt-3 mb-16 leading-[0.85] uppercase" style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: INK, letterSpacing: "-0.03em" }}>
            How I<br /><span style={{ color: AMBER }}>Work.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(8,9,15,0.1)" }}>
            {values.map((v) => (
              <div key={v.n} className="value-card group p-10 transition-all duration-500 cursor-default" style={{ background: CREAM }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,168,67,0.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = CREAM)}>
                <span style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "3.5rem", color: `${AMBER}25`, lineHeight: 1 }}>{v.n}</span>
                <h3 className="mt-4 mb-3 leading-none" style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: "1.5rem", color: INK }}>{v.title}</h3>
                <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "1.15rem", color: "rgba(8,9,15,0.6)", lineHeight: 1.75 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-28 px-6 md:px-14" style={{ background: "#0B0C14", borderTop: `1px solid rgba(212,168,67,0.08)` }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}60` }}>004 — Capabilities</span>
          <h2 className="mt-3 mb-16 leading-[0.85] uppercase" style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
            The Full<br /><span style={{ color: AMBER }}>Stack.</span>
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { area: "CMS & E-Commerce", items: ["WordPress","WooCommerce","Plugin dev","ACF Pro","Multisite"] },
              { area: "Languages",        items: ["JavaScript","TypeScript","Python","PHP","SQL","HTML5","CSS3"] },
              { area: "Backend",          items: ["Django","Node.js","PostgreSQL","Redis","Docker","REST APIs"] },
              { area: "Frontend",         items: ["React","Next.js","GSAP","Tailwind CSS"] },
              { area: "Infrastructure",   items: ["Linux/Ubuntu","Git","Nginx","Cloudflare","Vercel","CI/CD","Core Web Vitals","Technical SEO"] },
            ].map(({ area, items }) => (
              <div key={area} className="reveal-block">
                <p className="text-[9px] uppercase tracking-[0.3em] mb-5" style={{ fontFamily: "var(--font-mono)", color: AMBER }}>{area}</p>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: `${AMBER}50` }} />
                      <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "1.05rem", color: "rgba(232,226,214,0.6)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-14 text-center" style={{ background: INK, borderTop: `1px solid rgba(212,168,67,0.1)` }}>
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 60%, rgba(212,168,67,0.07) 0%, transparent 70%)` }} />
          <div className="relative z-10">
            <span className="text-[9px] uppercase tracking-[0.4em]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}50` }}>Ready to work together?</span>
            <h2 className="leading-[0.82] uppercase mt-4" style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.04em" }}>Let's talk.</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:gap-6 hover:scale-105" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, background: AMBER, color: INK, boxShadow: `0 20px 60px rgba(212,168,67,0.2)` }}>Get in touch →</Link>
              <Link href="/work" className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300" style={{ fontFamily: "var(--font-mono)", border: "1px solid rgba(232,226,214,0.15)", color: "rgba(232,226,214,0.6)" }}>View Work</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 md:px-14 flex justify-between items-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(232,226,214,0.12)" }}>
        <span>© 2025 Norman Katsigazi</span>
        <Link href="/" className="hover:text-white transition-colors">← Back Home</Link>
      </footer>
    </div>
  );
}