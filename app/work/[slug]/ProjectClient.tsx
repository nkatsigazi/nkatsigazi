"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Syne, Cormorant_Garamond, JetBrains_Mono, Inter } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const syne      = Syne({ subsets: ["latin"], weight: ["400","700","800"], variable: "--font-syne" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","500","600"], style: ["normal","italic"], variable: "--font-cormorant" });
const jetmono   = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500","700"], variable: "--font-mono" });
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const INK   = "#08090F";
const CREAM = "#F0E9DC";

interface Props {
  project: Project;
  nextProject: Project;
}

/* ─────────────────────────────────────────────
   Lightbox
───────────────────────────────────────────── */
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  onJump,
  color,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
  color: string;
}) {
  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev, onClose]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const thumbRef = useRef<HTMLDivElement>(null);

  /* scroll active thumb into view */
  useEffect(() => {
    const el = thumbRef.current?.querySelector<HTMLElement>(`[data-idx="${index}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: "rgba(4,5,10,0.97)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: `${color}70`,
            textTransform: "uppercase",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(232,226,214,0.6)",
            fontSize: "1.1rem",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* ── Main image ── */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden px-4 py-6 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          onClick={onPrev}
          className="absolute left-3 md:left-6 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${color}30`,
            color: color,
            fontSize: "1.1rem",
          }}
          aria-label="Previous"
        >
          ←
        </button>

        {/* Image */}
        <div className="max-w-5xl w-full max-h-full flex items-center justify-center">
          <img
            key={index}
            src={images[index]}
            alt={`Image ${index + 1}`}
            className="max-w-full max-h-full rounded-xl"
            style={{
              objectFit: "contain",
              maxHeight: "calc(100vh - 220px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: `0 0 80px ${color}18, 0 40px 80px rgba(0,0,0,0.6)`,
              filter: "saturate(1.05)",
              animation: "lb-fade 0.22s ease",
            }}
          />
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          className="absolute right-3 md:right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${color}30`,
            color: color,
            fontSize: "1.1rem",
          }}
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* ── Thumbnails ── */}
      <div
        ref={thumbRef}
        className="flex-shrink-0 flex items-center justify-start gap-2 overflow-x-auto px-6 md:px-10 py-4 scrollbar-hide"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={i}
            data-idx={i}
            onClick={() => onJump(i)}
            className="flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden"
            style={{
              width: 68,
              height: 48,
              border: i === index
                ? `2px solid ${color}`
                : "2px solid rgba(255,255,255,0.08)",
              opacity: i === index ? 1 : 0.45,
              transform: i === index ? "scale(1.06)" : "scale(1)",
              boxShadow: i === index ? `0 0 14px ${color}50` : "none",
            }}
            aria-label={`Go to image ${i + 1}`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </button>
        ))}
      </div>

      {/* keyframe */}
      <style>{`
        @keyframes lb-fade { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function ProjectClient({ project, nextProject }: Props) {
  const AMBER = project.color;
  const component = useRef<HTMLDivElement>(null);

  /* lightbox state */
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const total = project.galleryImgs.length;

  const openLb  = useCallback((i: number) => setLbIdx(i), []);
  const closeLb  = useCallback(() => setLbIdx(null), []);
  const prevImg  = useCallback(() => setLbIdx((i) => i === null ? null : (i - 1 + total) % total), [total]);
  const nextImg  = useCallback(() => setLbIdx((i) => i === null ? null : (i + 1) % total), [total]);
  const jumpImg  = useCallback((i: number) => setLbIdx(i), []);

  useGSAP(() => {
    /* Hero heading */
    const title = document.querySelector<HTMLElement>(".proj-title");
    if (title) {
      const split = new SplitText(title, { type: "chars" });
      gsap.from(split.chars, {
        y: 120, opacity: 0, rotateX: -80, stagger: 0.02,
        duration: 1.3, ease: "power4.out", delay: 0.15,
      });
    }
    gsap.from(".proj-meta-item", { y: 30, opacity: 0, stagger: 0.07, duration: 0.8, ease: "power3.out", delay: 0.9 });
    gsap.from(".proj-summary",   { y: 30, opacity: 0, duration: 0.9, ease: "expo.out", delay: 1.15 });

    /* Hero image parallax */
    gsap.to(".hero-img-inner", {
      y: -80, ease: "none",
      scrollTrigger: { trigger: ".proj-hero", start: "top top", end: "bottom top", scrub: 1.5 },
    });

    /* Stats */
    document.querySelectorAll<HTMLElement>(".stat-box").forEach((el, i) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.7, delay: i * 0.08, ease: "power2.out",
        scrollTrigger: { trigger: ".stats-row", start: "top 85%" },
      });
    });

    /* Case study blocks */
    document.querySelectorAll<HTMLElement>(".content-block").forEach((el) => {
      gsap.from(el, {
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    });

    /* Gallery */
    document.querySelectorAll<HTMLElement>(".gallery-img").forEach((el, i) => {
      gsap.from(el, {
        scale: 0.92, opacity: 0, duration: 1, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    /* Feature list */
    document.querySelectorAll<HTMLElement>(".feature-item").forEach((el, i) => {
      gsap.from(el, {
        x: -30, opacity: 0, duration: 0.6, delay: i * 0.07, ease: "power2.out",
        scrollTrigger: { trigger: ".features-list", start: "top 82%" },
      });
    });

    /* Next project */
    gsap.from(".next-proj-content", {
      y: 60, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".next-section", start: "top 75%" },
    });

    gsap.delayedCall(0.15, () => ScrollTrigger.refresh());
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, { scope: component });

  return (
    <div
      ref={component}
      className={`${syne.variable} ${cormorant.variable} ${jetmono.variable}`}
      style={{ background: INK, color: "#E8E2D6" }}
    >
      {/* Grain */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "150px",
      }} />

      {/* Nav */}
      <nav
        className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 md:px-14 py-5"
        style={{ background: "linear-gradient(180deg, rgba(8,9,15,0.95) 0%, transparent 100%)", backdropFilter: "blur(12px)" }}
      >
        <Link href="/work" className="flex items-center gap-3 group">
          <span
            className="text-[10px] uppercase tracking-[0.2em] transition-all duration-300 group-hover:tracking-[0.35em]"
            style={{ fontFamily: "var(--font-mono)", color: `${AMBER}80` }}
          >
            ← All Work
          </span>
        </Link>
        <span
          className="hidden md:block text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.18)" }}
        >
          {project.idx} / 04
        </span>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "var(--font-mono)",
              background: `${AMBER}15`,
              border: `1px solid ${AMBER}35`,
              color: AMBER,
            }}
          >
            Live Site ↗
          </a>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section className="proj-hero relative h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <span></span>
          <img
            src={project.heroImg}
            className="hero-img-inner absolute inset-0 w-full h-[120%] object-cover"
            style={{ filter: "saturate(1.1) contrast(1.05)", opacity: 0.7, top: "-10%" }}
            alt={project.title}
          />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,15,1) 0%, rgba(8,9,15,0.9) 40%, rgba(8,9,15,0.6) 100%)" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${AMBER}12 0%, transparent 60%)` }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${AMBER}, transparent)` }} />

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-16 z-10">
          <div className="mb-6">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)", background: `${AMBER}15`, border: `1px solid ${AMBER}35`, color: AMBER }}
            >
              {project.cat}
            </span>
          </div>

          <h1
            className="proj-title leading-[0.82] uppercase mb-8"
            style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(2rem, 10vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-8 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {([
              ["Client",   project.client],
              ["Role",     project.role],
              ["Year",     project.year],
              ["Duration", project.duration],
            ] as const).map(([label, val]) => (
              <div key={label} className="proj-meta-item">
                <p className="text-[12px] uppercase tracking-[0.25em] mb-1" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}90` }}>{label}</p>
                <p className="text-sm" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.7)" }}>{val}</p>
              </div>
            ))}
          </div>

          <p
            className="proj-summary max-w-2xl mt-6 leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2vw, 1.5rem)", color: "rgba(232,226,214,0.6)" }}
          >
            {project.summary}
          </p>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <section className="stats-row py-14 px-6 md:px-14" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(8,9,15,0.08)" }}>
          {project.stats.map((s, i) => (
            <div key={i} className="stat-box px-8 py-8 text-center" style={{ background: CREAM }}>
              <div className="text-4xl md:text-5xl leading-none mb-2" style={{ fontFamily: "'Inter'", fontWeight: 800, color: INK }}>{s.value}</div>
              <div className="text-[12px] uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}99` }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CASE STUDY ══ */}
      <section className="py-24 px-6 md:px-14" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_2fr] gap-20">
          {/* Sticky left sidebar */}
          <div className="hidden md:block">
            <div className="sticky top-32">
              <span className="text-[12px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}90` }}>Case Study</span>
              <div className="mt-6 space-y-5">
                {["Challenge", "Solution", "Outcome", "Features"].map((s) => (
                  <div key={s} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-5 h-px transition-all duration-300 group-hover:w-10" style={{ background: `${AMBER}50` }} />
                    <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.75)" }}>{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-14">
                <p className="text-[12px] uppercase tracking-[0.3em] mb-4" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}90` }}>Stack</p>
                <div className="space-y-2">
                  {project.stack.map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full" style={{ background: `${AMBER}60` }} />
                      <span className="text-[11px]" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.75)" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div className="space-y-20">
            {[
              { num: "01", label: "The Challenge", body: project.challenge },
              { num: "02", label: "The Solution",  body: project.solution  },
              { num: "03", label: "The Outcome",   body: project.outcome   },
            ].map(({ num, label, body }) => (
              <div key={num} className="content-block">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[12px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: AMBER }}>{num} — {label}</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "clamp(1.2rem, 2.2vw, 1.65rem)", color: "rgba(232,226,214,0.8)", lineHeight: 1.75 }}>
                  {body}
                </p>
              </div>
            ))}

            <div className="content-block">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: AMBER }}>04 — Key Features</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>
              <ul className="features-list space-y-4">
                {project.features.map((f, fi) => (
                  <li key={fi} className="feature-item flex items-start gap-5">
                    <span className="mt-[10px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: AMBER, boxShadow: `0 0 8px ${AMBER}60` }} />
                    <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "1.2rem", color: "rgba(232,226,214,0.7)", lineHeight: 1.6 }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section className="py-10 px-6 md:px-14 pb-24" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[9px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}60` }}>Gallery</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-[9px] uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.18)" }}>
              {project.galleryImgs.length} images
            </span>
          </div>

          {/*
            Masonry via CSS columns.
            - Same width per column (equal column widths from `columns-*`)
            - Each image renders at its natural height — no forced aspect ratio
            - `break-inside-avoid` prevents an image being split across columns
          */}
          <div
            style={{
              columns: "3",
              columnGap: "1rem",
              /* fallback for Safari / older browsers */
            }}
            className="[columns:1] sm:[columns:2] md:[columns:3]"
          >
            {project.galleryImgs.map((img, gi) => (
              <div
                key={gi}
                className="gallery-img group relative overflow-hidden rounded-xl cursor-zoom-in"
                style={{
                  breakInside: "avoid",
                  marginBottom: "1rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "inline-block", /* required for CSS columns to respect height */
                  width: "100%",
                }}
                onClick={() => openLb(gi)}
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] z-10"
                  style={{ background: `linear-gradient(90deg, ${AMBER}60, transparent)` }}
                />

                <img
                  src={img}
                  className="w-full h-auto block transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
                  style={{ filter: "saturate(1.05)", opacity: 0.85 }}
                  alt={`${project.title} screenshot ${gi + 1}`}
                />

                {/* Hover overlay with expand icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${AMBER}18, rgba(0,0,0,0.45))` }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(8,9,15,0.7)",
                      border: `1px solid ${AMBER}50`,
                      color: AMBER,
                      fontSize: "1rem",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    ⤢
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEXT PROJECT ══ */}
      <section className="next-section relative overflow-hidden" style={{ background: "#0B0C14", borderTop: `1px solid rgba(212,168,67,0.1)` }}>
        <Link href={`/work/${nextProject.slug}`} className="block group">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={nextProject.heroImg}
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              style={{ opacity: 0.2, filter: "grayscale(0.4)", objectPosition: "center 30%" }}
              alt=""
            />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,12,20,0.98) 0%, rgba(11,12,20,0.7) 100%)" }} />
          <div className="next-proj-content relative z-10 px-6 md:px-14 py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div>
              <p className="text-[9px] uppercase tracking-[0.35em] mb-4" style={{ fontFamily: "var(--font-mono)", color: "rgba(232,226,214,0.25)" }}>Next Project</p>
              <h2
                className="leading-[0.85] uppercase transition-colors duration-500 group-hover:text-amber-300"
                style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.04em", color: "#E8E2D6" }}
              >
                {nextProject.title}
              </h2>
              <p className="mt-3" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, fontSize: "1.1rem", color: "rgba(232,226,214,0.4)" }}>
                {nextProject.cat} · {nextProject.year}
              </p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center border text-2xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-45 flex-shrink-0"
              style={{ border: `1px solid ${nextProject.color}40`, color: nextProject.color }}
            >
              →
            </div>
          </div>
        </Link>
      </section>

      <footer
        className="py-8 px-6 md:px-14 flex justify-between items-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(232,226,214,0.12)" }}
      >
        <span>© 2025 Norman Katsigazi</span>
        <Link href="/work" className="hover:text-white transition-colors">← All Work</Link>
      </footer>

      {/* ══ LIGHTBOX ══ */}
      {lbIdx !== null && (
        <Lightbox
          images={project.galleryImgs}
          index={lbIdx}
          onClose={closeLb}
          onPrev={prevImg}
          onNext={nextImg}
          onJump={jumpImg}
          color={AMBER}
        />
      )}
    </div>
  );
}