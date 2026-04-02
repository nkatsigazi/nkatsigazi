"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Syne, Cormorant_Garamond, JetBrains_Mono, Inter } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { projects } from "@/lib/projects";
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

export default function WorkPage() {
  const component = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heading = document.querySelector<HTMLElement>(".work-heading");
    if (heading) {
      const split = new SplitText(heading, { type: "chars" });
      gsap.from(split.chars, { y: 100, opacity: 0, rotateX: -70, stagger: 0.025, duration: 1.2, ease: "power4.out", delay: 0.2 });
    }
    gsap.from(".work-sub", { y: 30, opacity: 0, duration: 0.9, ease: "expo.out", delay: 1.0 });
    gsap.from(".project-row", { y: 50, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out", delay: 1.1, clearProps: "all" });
  }, { scope: component });

  return (
    <div ref={component} className={`${syne.variable} ${cormorant.variable} ${jetmono.variable} min-h-screen`} style={{ background: INK, color: "#E8E2D6" }}>

      {/* Grain */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "150px" }} />

      <NavBar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-14 overflow-hidden" style={{ background: INK }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(212,168,67,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.025) 1px, transparent 1px)`, backgroundSize: "90px 90px" }} />

        <div className="relative z-10">
          <span className="work-sub text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}70` }}>002 — Selected Projects</span>
          <h1 className="work-heading leading-[0.82] uppercase mt-4 mb-6" style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(2rem, 10vw, 7rem)", letterSpacing: "-0.04em", color: CREAM }}>
            Work
          </h1>
          <p className="work-sub max-w-2xl" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.2vw, 1.6rem)", color: "rgba(232,226,214,0.5)", lineHeight: 1.65 }}>
            A curated selection of client projects spanning AI engineering, e-commerce platforms, fintech dashboards, and enterprise CMS systems.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-10 mt-14 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[["10","Projects"],["5+","Years"],["3","Continents"],["200+","WP Sites"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "1.8rem", color: AMBER, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(232,226,214,0.3)", textTransform: "uppercase", marginTop: "0.25rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project list */}
      <section className="px-6 md:px-14 pb-32" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto">
          {projects.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="project-row group block">
              <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-8 md:gap-16 items-center py-10 transition-all duration-500" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

                {/* Hover sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" style={{ background: `${p.color}05` }} />
                {/* Left color bar on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full" style={{ background: p.color }} />

                {/* Number + thumbnail */}
                <div className="flex items-center gap-6 pl-4">
                  <span className="text-[10px] tracking-widest shrink-0 transition-colors duration-300 group-hover:opacity-100" style={{ fontFamily: "var(--font-mono)", color: `${p.color}60` }}>{p.idx}</span>
                  <div
                    className="relative overflow-hidden flex-shrink-0 rounded-lg transition-all duration-700"
                    style={{ width: 150, height: 100, border: `1px solid rgba(255,255,255,0.06)` }}
                  >
                    <img src={p.heroImg} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" alt={p.title} />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-500" />
                    {/* Project color overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: p.color }} />
                  </div>
                </div>

                {/* Title + meta */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-4 mb-2">
                    <h2 className="leading-none uppercase transition-colors duration-300" style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", color: "#E8E2D6" }}>
                      {p.title}
                    </h2>
                    <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest shrink-0" style={{ fontFamily: "var(--font-mono)", background: `${p.color}10`, border: `1px solid ${p.color}30`, color: `${p.color}CC` }}>{p.cat}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, fontSize: "1.05rem", color: "rgba(232,226,214,0.38)" }}>
                    {p.summary.slice(0, 88)}…
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-[9px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.2)" }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Year + arrow */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-[10px] tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.2)" }}>{p.year}</span>
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(232,226,214,0.3)", fontSize: "0.9rem" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = p.color; el.style.background = p.color; el.style.color = INK; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.background = "transparent"; el.style.color = "rgba(232,226,214,0.3)"; }}
                  >
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-14 text-center" style={{ background: CREAM, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <span className="text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.3)" }}>Next step</span>
        <h2 className="leading-[0.85] uppercase mt-4" style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.04em", color: INK }}>
          Have a<br /><span style={{ color: AMBER }}>Project?</span>
        </h2>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.3rem", color: "rgba(8,9,15,0.5)", marginTop: "1.5rem" }}>
          Let's talk scope, timeline and budget.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-4 mt-10 px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:gap-7 hover:scale-105" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, background: INK, color: CREAM, boxShadow: "0 20px 60px rgba(8,9,15,0.2)" }}>
          Start a conversation →
        </Link>
      </section>

      <footer className="py-8 px-6 md:px-14 flex justify-between items-center" style={{ background: "#06070C", borderTop: "1px solid rgba(255,255,255,0.04)", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(232,226,214,0.12)" }}>
        <span>© 2025 Norman Katsigazi</span>
        <Link href="/" className="hover:text-white transition-colors">← Back Home</Link>
      </footer>
    </div>
  );
}